'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

export interface PalletSpecs {
    length: number;
    width: number;
    palletType: string;
    woodType: string;
    topDeckCount: number;
    bottomDeckCount: number;
    stringerCount: number;
    stringerWidth: number;
    stringerHeight: number;
    deckboardWidth: number;
    deckboardThickness: number;
    customBoardSize: string;
    topWidths: number[];
    bottomWidths: number[];
    topThicknesses: number[];
    bottomThicknesses: number[];
    ht: string;
    weightLbs: number;
    nailCount: number;
    overallHeight: number;
    truckQty: number;
    leadWidth: number;
    leadThickness: number;
}

export interface BuilderRef {
    capturePDFDataUrl: () => Promise<string | null>;
    getSpecs: () => PalletSpecs;
}

interface Props {
    onChange?: (specs: PalletSpecs) => void;
}

const TRUCK = { length: 630, width: 98 };
const WEIGHT_PER_BF: Record<string, number> = { New: 2.7, Recycled: 2.45 };
const TOP_NAILS_PER_INTERSECTION = 2;
const BOTTOM_NAILS_PER_INTERSECTION = 2;
const BRAND_COLOR = '#004d3d'; // A3 Pallet Deep Green

function clamp(value: number, min: number, max: number, fallback: number) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
}

function getBoardWidths(count: number, standardWidth: number, leadWidth: number) {
    if (count <= 2) return new Array(count).fill(leadWidth);
    const arr = new Array(count).fill(standardWidth);
    arr[0] = leadWidth;
    arr[count - 1] = leadWidth;
    return arr;
}
function getBoardThicknesses(count: number, standardThickness: number, leadThickness: number) {
    if (count <= 2) return new Array(count).fill(leadThickness);
    const arr = new Array(count).fill(standardThickness);
    arr[0] = leadThickness;
    arr[count - 1] = leadThickness;
    return arr;
}
function computeTruckCount(width: number, length: number) {
    const a = Math.floor(TRUCK.length / length) * Math.floor(TRUCK.width / width);
    const b = Math.floor(TRUCK.length / width) * Math.floor(TRUCK.width / length);
    return Math.max(a, b);
}
function trim0(v: number | string) { return parseFloat(Number(v).toFixed(3)); }
function getStringerPositions(count: number, palletWidth: number, stringerWidth: number) {
    if (count <= 1) return [0.5];
    const startP = (stringerWidth / 2) / palletWidth;
    const endP = 1 - (stringerWidth / 2) / palletWidth;
    const positions = [];
    for (let i = 0; i < count; i++) {
        positions.push(startP + (endP - startP) * (i / (count - 1)));
    }
    return positions;
}

function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, label: string, horizontal = true) {
    ctx.save();
    ctx.strokeStyle = BRAND_COLOR;
    ctx.fillStyle = BRAND_COLOR;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const head = (x: number, y: number, angle: number) => {
        const size = 5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - size * Math.cos(angle - Math.PI / 6), y - size * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x - size * Math.cos(angle + Math.PI / 6), y - size * Math.sin(angle + Math.PI / 6));
        ctx.closePath(); ctx.fill();
    };
    const angle = Math.atan2(y2 - y1, x2 - x1);
    head(x1, y1, angle + Math.PI); head(x2, y2, angle);
    ctx.font = 'bold 13px Inter, Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (horizontal) { ctx.fillText(label, (x1 + x2) / 2, y1 - 12); }
    else {
        ctx.save(); ctx.translate(x1 - 12, (y1 + y2) / 2); ctx.rotate(-Math.PI / 2);
        ctx.fillText(label, 0, 0); ctx.restore();
    }
    ctx.restore();
}
function resizeCanvas(canvas: HTMLCanvasElement) {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { width: rect.width, height: rect.height };
}

export const InteractivePalletBuilder = forwardRef<BuilderRef, Props>(({ onChange }, ref) => {
    const [length, setLength] = useState(48);
    const [width, setWidth] = useState(40);
    const [palletType, setPalletType] = useState('2-way');
    const [woodType, setWoodType] = useState('New');
    const [stringerCount, setStringerCount] = useState(3);
    const [topDeckCount, setTopDeckCount] = useState(6);
    const [bottomDeckCount, setBottomDeckCount] = useState(3);
    const [deckWidth, setDeckWidth] = useState(5.5);
    const [deckThickness, setDeckThickness] = useState(0.75);
    const [leadWidth, setLeadWidth] = useState(5.5);
    const [leadThickness, setLeadThickness] = useState(0.75);
    const [customBoardSize, setCustomBoardSize] = useState('');
    const [ht, setHt] = useState('No');

    const [leadSDirty, setLeadSDirty] = useState(false);
    const [leadTDirty, setLeadTDirty] = useState(false);

    const threeContainerRef = useRef<HTMLDivElement>(null);
    const topCanvasRef = useRef<HTMLCanvasElement>(null);
    const bottomCanvasRef = useRef<HTMLCanvasElement>(null);
    const sideCanvasRef = useRef<HTMLCanvasElement>(null);
    
    // For PDF extraction explicitly defined layout off-screen 
    const pdfTemplateRef = useRef<HTMLDivElement>(null);

    const threeRef = useRef<{ scene?: THREE.Scene, camera?: THREE.PerspectiveCamera, renderer?: THREE.WebGLRenderer, group?: THREE.Group, reqId?: number }>({});

    const computeSpecs = (): PalletSpecs => {
        const l = clamp(length, 24, 120, 48);
        const w = clamp(width, 24, 96, 40);
        const tdc = clamp(topDeckCount, 3, 20, 6);
        const bdc = clamp(bottomDeckCount, 2, 14, 3);
        const sc = clamp(stringerCount, 2, 6, 3);
        const sW = 1.5; const sH = 3.5;
        const dw = clamp(deckWidth, 3, 8, 5.5);
        const dt = clamp(deckThickness, 0.5, 2, 0.75);
        const lw = clamp(leadWidth, 3, 8, dw);
        const lt = clamp(leadThickness, 0.5, 2, dt);
        
        const topWidths = getBoardWidths(tdc, dw, lw);
        const bottomWidths = getBoardWidths(bdc, dw, lw);
        const topThicknesses = getBoardThicknesses(tdc, dt, lt);
        const bottomThicknesses = getBoardThicknesses(bdc, dt, lt);

        const topBF = topWidths.reduce((sum, bw, i) => sum + (topThicknesses[i] * bw * w) / 144, 0);
        const bottomBF = bottomWidths.reduce((sum, bw, i) => sum + (bottomThicknesses[i] * bw * w) / 144, 0);
        const stringerBF = sc * ((sW * sH * l) / 144);
        const totalBF = topBF + bottomBF + stringerBF;
        const weightLbs = totalBF * WEIGHT_PER_BF[woodType];
        const nailCount = (tdc * sc * TOP_NAILS_PER_INTERSECTION) + (bdc * sc * BOTTOM_NAILS_PER_INTERSECTION);
        const overallHeight = dt + sH + dt;
        const truckQty = computeTruckCount(w, l);

        return {
            length: l, width: w, palletType, woodType, topDeckCount: tdc, bottomDeckCount: bdc, stringerCount: sc,
            stringerWidth: sW, stringerHeight: sH, deckboardWidth: dw, deckboardThickness: dt, customBoardSize,
            topWidths, bottomWidths, topThicknesses, bottomThicknesses, ht, weightLbs, nailCount, overallHeight,
            truckQty, leadWidth: lw, leadThickness: lt
        };
    };

    const currentSpecs = computeSpecs();

    useImperativeHandle(ref, () => ({
        getSpecs: () => currentSpecs,
        capturePDFDataUrl: async () => {
             if (!pdfTemplateRef.current) return null;
             
             // Sync 2D Canvas drawings into the hidden PDF template images
             if (topCanvasRef.current) {
                 const img = document.getElementById('pdf-top-img') as HTMLImageElement;
                 if (img) img.src = topCanvasRef.current.toDataURL('image/png', 1.0);
             }
             if (bottomCanvasRef.current) {
                 const img = document.getElementById('pdf-bot-img') as HTMLImageElement;
                 if (img) img.src = bottomCanvasRef.current.toDataURL('image/png', 1.0);
             }
             if (sideCanvasRef.current) {
                 const img = document.getElementById('pdf-side-img') as HTMLImageElement;
                 if (img) img.src = sideCanvasRef.current.toDataURL('image/png', 1.0);
             }
             
             // Sync 3D Canvas
             const threeCanvas = threeContainerRef.current?.querySelector('canvas');
             if (threeCanvas) {
                 const img = document.getElementById('pdf-3d-img') as HTMLImageElement;
                 if (img) img.src = threeCanvas.toDataURL('image/png', 1.0); // PNG preserves transparency
             }

             // Give the browser DOM a tiny moment to flush and paint the new image sources
             await new Promise(r => setTimeout(r, 150));

             try {
                 // Extract natively via HTML-to-Image (bypasses html2canvas css-parser errors like the 'lab' color bug)
                 const imgData = await toJpeg(pdfTemplateRef.current, { quality: 0.85, pixelRatio: 2 });

                 // Create pure PDF using jsPDF (Letter: 8.5 x 11 inch = 612 x 792 pt. In mm: 215.9 x 279.4)
                 const pdf = new jsPDF('p', 'pt', 'letter');
                 const pdfWidth = pdf.internal.pageSize.getWidth();
                 const pdfHeight = (pdfTemplateRef.current.offsetHeight * pdfWidth) / pdfTemplateRef.current.offsetWidth;
                 
                 // Add image safely inside boundaries
                 pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                 
                 return pdf.output('datauristring'); // Base64 'application/pdf'
             } catch (error: any) {
                 console.error("PDF Generation failed", error);
                 alert("PDF Generation Error: " + (error.message || String(error)));
                 return null;
             }
        }
    }));

    useEffect(() => {
        if (onChange) onChange(currentSpecs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length, width, palletType, woodType, stringerCount, topDeckCount, bottomDeckCount, deckWidth, deckThickness, leadWidth, leadThickness, customBoardSize, ht]);

    useEffect(() => { if (!leadSDirty) setLeadWidth(deckWidth); }, [deckWidth, leadSDirty]);
    useEffect(() => { if (!leadTDirty) setLeadThickness(deckThickness); }, [deckThickness, leadTDirty]);

    // Initialize WebGL
    useEffect(() => {
        if (!threeContainerRef.current) return;
        const container = threeContainerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
        camera.position.set(55, 45, 55);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        while(container.firstChild) container.removeChild(container.firstChild);
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(50, 100, 50);
        scene.add(dirLight);

        const group = new THREE.Group();
        scene.add(group);

        threeRef.current = { scene, camera, renderer, group };

        const renderLoop = () => {
            threeRef.current.reqId = requestAnimationFrame(renderLoop);
            controls.update();
            renderer.render(scene, camera);
        };
        renderLoop();

        const handleResize = () => {
             if (!container || !camera || !renderer) return;
             camera.aspect = container.clientWidth / container.clientHeight;
             camera.updateProjectionMatrix();
             renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
             window.removeEventListener('resize', handleResize);
             if (threeRef.current.reqId) cancelAnimationFrame(threeRef.current.reqId);
             renderer.dispose();
             if (container && renderer.domElement && container.contains(renderer.domElement)) {
                 container.removeChild(renderer.domElement);
             }
        };
    }, []);

    // Draw Updates (3D + 2D)
    useEffect(() => {
        const specs = currentSpecs;

        // 1. Update 3D
        if (threeRef.current.group) {
            const group = threeRef.current.group;
            while (group.children.length > 0) {
                const child = group.children[0] as any;
                group.remove(child);
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
                if (child.children) child.children.forEach((c: any) => {
                    if (c.geometry) c.geometry.dispose();
                    if (c.material) c.material.dispose();
                });
            }

            const mat = new THREE.MeshLambertMaterial({ color: specs.woodType === 'New' ? '#dfc097' : '#c4aa8b' });
            const edgeMat = new THREE.LineBasicMaterial({ color: '#7a5a35', opacity: 0.3, transparent: true });

            const w = specs.width, l = specs.length, sH = specs.stringerHeight, sW = specs.stringerWidth;
            const ox = -l / 2, oz = -w / 2;

            const addBox = (dx: number, dy: number, dz: number, px: number, py: number, pz: number) => {
                const geo = new THREE.BoxGeometry(dx, dy, dz);
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(px, py, pz);
                mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat));
                group.add(mesh);
            };

            const maxTopT = Math.max(...specs.topThicknesses);
            const maxBotT = Math.max(...specs.bottomThicknesses);
            const stringerY = maxBotT + sH / 2;

            let cursor = ox;
            const gapBot = specs.bottomWidths.length > 1 ? Math.max(0, l - specs.bottomWidths.reduce((a, b) => a + b, 0)) / (specs.bottomWidths.length - 1) : 0;
            specs.bottomWidths.forEach((bw, idx) => {
                const bt = specs.bottomThicknesses[idx];
                addBox(bw, bt, w, cursor + bw / 2, maxBotT - bt / 2, 0);
                cursor += bw + gapBot;
            });

            getStringerPositions(specs.stringerCount, specs.width, specs.stringerWidth).forEach(p => {
                const pz = oz + w * p;
                if (specs.palletType === '2-way') addBox(l, sH, sW, 0, stringerY, pz);
                else if (specs.palletType === '4-way') {
                    addBox(l, sH * 0.5, sW, 0, stringerY + sH * 0.25, pz);
                    addBox(l * 0.15, sH * 0.5, sW, -l / 2 + l * 0.075, stringerY - sH * 0.25, pz);
                    addBox(l * 0.15, sH * 0.5, sW, l / 2 - l * 0.075, stringerY - sH * 0.25, pz);
                    addBox(l * 0.4, sH * 0.5, sW, 0, stringerY - sH * 0.25, pz);
                } else if (specs.palletType === 'Block Pallet') {
                    const runnerT = 0.75; const blockH = sH - runnerT;
                    addBox(l, runnerT, sW, 0, stringerY + sH / 2 - runnerT / 2, pz);
                    const bLx = 5;
                    addBox(bLx, blockH, sW, -l / 2 + bLx / 2, stringerY - runnerT / 2, pz);
                    addBox(bLx, blockH, sW, 0, stringerY - runnerT / 2, pz);
                    addBox(bLx, blockH, sW, l / 2 - bLx / 2, stringerY - runnerT / 2, pz);
                }
            });

            cursor = ox;
            const topY = maxBotT + sH;
            const gapTop = specs.topWidths.length > 1 ? Math.max(0, l - specs.topWidths.reduce((a, b) => a + b, 0)) / (specs.topWidths.length - 1) : 0;
            specs.topWidths.forEach((bw, idx) => {
                const bt = specs.topThicknesses[idx];
                addBox(bw, bt, w, cursor + bw / 2, topY + bt / 2, 0);
                cursor += bw + gapTop;
            });
            group.position.y = -(maxBotT + sH + maxTopT) / 2;
        }

        // 2. Clean 2D Draws (No Text inside canvas)
        const drawPlanView = (canvas: HTMLCanvasElement | null, boards: number[], type: 'Top' | 'Bottom') => {
            if(!canvas) return; const ctx = canvas.getContext('2d'); if(!ctx) return;
            const { width: cw, height: ch } = resizeCanvas(canvas);
            ctx.clearRect(0,0,cw,ch); ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,cw,ch);

            const marginX = 35; const marginY = 30; 
            const drawAreaW = cw - marginX * 2; const drawAreaH = ch - marginY * 2;
            const scale = Math.min(drawAreaW / specs.width, drawAreaH / specs.length);
            const palletW = specs.width * scale; const palletH = specs.length * scale;
            const x = (cw - palletW) / 2; const y = (ch - palletH) / 2;

            ctx.strokeStyle = BRAND_COLOR; ctx.lineWidth = 2.5; ctx.strokeRect(x, y, palletW, palletH);
            
            const sumWidths = boards.reduce((a, b) => a + b, 0);
            const gapInches = Math.max(0, specs.length - sumWidths) / Math.max(1, boards.length - 1);
            let cursor = y;
            
            boards.forEach((bw, idx) => {
                const bwPx = Math.max(4, bw * scale);
                ctx.fillStyle = type === 'Top' ? 'transparent' : 'rgba(0,0,0,0.03)';
                ctx.strokeStyle = BRAND_COLOR; ctx.lineWidth = 1;
                ctx.fillRect(x + 2, cursor, palletW - 4, bwPx);
                ctx.strokeRect(x + 2, cursor, palletW - 4, bwPx);
                cursor += bwPx + (idx < boards.length - 1 ? gapInches * scale : 0);
            });

            // Draw underlying stringers subtly
            getStringerPositions(specs.stringerCount, specs.width, specs.stringerWidth).forEach((p) => {
                const sx = x + palletW * p - (specs.stringerWidth * scale) / 2;
                const sw = Math.max(4, specs.stringerWidth * scale);
                ctx.fillStyle = `rgba(0, 77, 61, ${type === 'Top' ? '0.1' : '0.2'})`;
                ctx.fillRect(sx, y, sw, palletH);
            });

            // Write board dimensions directly inside the slats
            ctx.fillStyle = BRAND_COLOR;
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let tCursor = y;
            const thicknesses = type === 'Top' ? specs.topThicknesses : specs.bottomThicknesses;
            boards.forEach((bw, idx) => {
                const bwPx = Math.max(4, bw * scale);
                if (bwPx >= 14) { // Only render if board is wide enough to fit text cleanly
                    ctx.fillText(`${trim0(thicknesses[idx])}"T x ${trim0(bw)}"W`, x + palletW / 2, tCursor + bwPx / 2);
                }
                tCursor += bwPx + (idx < boards.length - 1 ? gapInches * scale : 0);
            });

            drawArrow(ctx, x, y - 16, x + palletW, y - 16, `${trim0(specs.width)}" W`, true);
            drawArrow(ctx, x - 16, y, x - 16, y + palletH, `${trim0(specs.length)}" L`, false);
        };

        drawPlanView(topCanvasRef.current, specs.topWidths, 'Top');
        drawPlanView(bottomCanvasRef.current, specs.bottomWidths, 'Bottom');

        const drawSideView = () => {
             const canvas = sideCanvasRef.current; if(!canvas) return;
             const ctx = canvas.getContext('2d'); if(!ctx) return;
             const { width: cw, height: ch } = resizeCanvas(canvas);
             ctx.clearRect(0,0,cw,ch); ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,cw,ch);

             const scaleX = (cw - 60) / specs.length;
             const scaleY = Math.min((ch - 40) / specs.overallHeight, scaleX * 5);
             const drawW = specs.length * scaleX; const drawH = specs.overallHeight * scaleY;
             const x = (cw - drawW) / 2; const y = (ch - drawH) / 2;

             const maxTopT = Math.max(...specs.topThicknesses) * scaleY;
             const stringerH = specs.stringerHeight * scaleY;
             const stringerY = y + maxTopT; const bottomY = stringerY + stringerH;

             ctx.fillStyle = BRAND_COLOR;
             if (specs.palletType === 'Block Pallet') {
                 const runnerT = 0.75 * scaleY; const blockH = stringerH - runnerT;
                 ctx.fillRect(x, stringerY, drawW, runnerT);
                 const bLx = 5 * scaleX;
                 ctx.fillRect(x, stringerY + runnerT, bLx, blockH);
                 ctx.fillRect(x + drawW / 2 - bLx / 2, stringerY + runnerT, bLx, blockH);
                 ctx.fillRect(x + drawW - bLx, stringerY + runnerT, bLx, blockH);
             } else {
                 ctx.fillRect(x, stringerY, drawW, stringerH);
                 if (specs.palletType === '4-way') {
                     const notchW = 9 * scaleX; const notchH = stringerH * (1.5 / specs.stringerHeight);
                     const notch1X = x + drawW * 0.15; const notch2X = x + drawW * 0.85 - notchW;
                     const notchY = stringerY + stringerH - notchH;
                     ctx.clearRect(notch1X, notchY, notchW, notchH); ctx.clearRect(notch2X, notchY, notchW, notchH);
                     ctx.strokeStyle = BRAND_COLOR; ctx.strokeRect(notch1X, notchY, notchW, notchH); ctx.strokeRect(notch2X, notchY, notchW, notchH);
                 }
             }

             // Deckboards (white to contrast)
             ctx.fillStyle = '#ffffff'; ctx.strokeStyle = BRAND_COLOR; ctx.lineWidth = 1;
             let cursor = x;
             specs.topWidths.forEach((bw, idx) => {
                 const bwPx = bw * scaleX; const bt = specs.topThicknesses[idx] * scaleY;
                 ctx.fillRect(cursor, stringerY - bt, bwPx, bt); ctx.strokeRect(cursor, stringerY - bt, bwPx, bt);
                 cursor += bwPx + (specs.topWidths.length>1 ? Math.max(0, specs.length - specs.topWidths.reduce((a,b)=>a+b,0))/(specs.topWidths.length-1)*scaleX : 0);
             });
             cursor = x;
             specs.bottomWidths.forEach((bw, idx) => {
                 const bwPx = bw * scaleX; const bt = specs.bottomThicknesses[idx] * scaleY;
                 ctx.fillRect(cursor, bottomY, bwPx, bt); ctx.strokeRect(cursor, bottomY, bwPx, bt);
                 cursor += bwPx + (specs.bottomWidths.length>1 ? Math.max(0, specs.length - specs.bottomWidths.reduce((a,b)=>a+b,0))/(specs.bottomWidths.length-1)*scaleX : 0);
             });

             // --- Dimension Labels for Side View ---
             
             // Stringer Label (White text inside the stringer block)
             ctx.fillStyle = '#ffffff';
             ctx.font = 'bold 11px Inter, sans-serif';
             ctx.textAlign = 'center';
             ctx.textBaseline = 'middle';
             if (specs.palletType === 'Block Pallet') {
                ctx.fillText(`Blocks: ${trim0(specs.stringerHeight)}"H`, x + drawW/2, stringerY + stringerH/2);
             } else {
                ctx.fillText(`Stringer: ${trim0(specs.stringerHeight)}"H x ${trim0(specs.stringerWidth)}"W`, x + drawW/2, stringerY + stringerH/2);
             }

             // Deckboard Labels (Printed just above/below the respective boards)
             ctx.fillStyle = BRAND_COLOR;
             ctx.font = 'bold 10px Inter, sans-serif';
             cursor = x;
             specs.topWidths.forEach((bw, idx) => {
                 const bwPx = bw * scaleX; const bt = specs.topThicknesses[idx] * scaleY;
                 // Prevent text overlapping if boards are super tiny, but usually ok
                 if (bwPx > 15) {
                     ctx.fillText(`${trim0(specs.topThicknesses[idx])}"T`, cursor + bwPx/2, stringerY - bt - 8);
                 }
                 cursor += bwPx + (specs.topWidths.length>1 ? Math.max(0, specs.length - specs.topWidths.reduce((a,b)=>a+b,0))/(specs.topWidths.length-1)*scaleX : 0);
             });
             
             cursor = x;
             specs.bottomWidths.forEach((bw, idx) => {
                 const bwPx = bw * scaleX; const bt = specs.bottomThicknesses[idx] * scaleY;
                 if (bwPx > 15) {
                     ctx.fillText(`${trim0(specs.bottomThicknesses[idx])}"T`, cursor + bwPx/2, bottomY + bt + 8);
                 }
                 cursor += bwPx + (specs.bottomWidths.length>1 ? Math.max(0, specs.length - specs.bottomWidths.reduce((a,b)=>a+b,0))/(specs.bottomWidths.length-1)*scaleX : 0);
             });

             // Simple bounded box
             ctx.strokeStyle = BRAND_COLOR; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, drawW, drawH);
             drawArrow(ctx, x - 16, y, x - 16, y + drawH, `${trim0(specs.overallHeight)}" H`, false);
        };
        drawSideView();

    }, [currentSpecs]);

    const InputSection = () => (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-xl bg-white text-sm">
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Length (in)</label>
                <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Width (in)</label>
                <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Pallet Type</label>
                <select value={palletType} onChange={e => setPalletType(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]">
                    <option value="2-way">2-way</option>
                    <option value="4-way">4-way</option>
                    <option value="Block Pallet">Block Pallet</option>
                </select>
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Wood Type</label>
                <select value={woodType} onChange={e => setWoodType(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]">
                    <option value="New">New</option>
                    <option value="Recycled">Recycled</option>
                </select>
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Top Decks</label>
                <input type="number" value={topDeckCount} onChange={e => setTopDeckCount(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Bottom Decks</label>
                <input type="number" value={bottomDeckCount} onChange={e => setBottomDeckCount(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Stringers</label>
                <input type="number" value={stringerCount} onChange={e => setStringerCount(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                 <label className="font-semibold text-slate-800">Heat Treated</label>
                 <select value={ht} onChange={e => setHt(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]">
                    <option value="Yes">Yes (ISPM-15)</option>
                    <option value="No">No</option>
                 </select>
            </div>
            <div className="col-span-2 space-y-1 border-t pt-2 mt-2">
                <label className="font-semibold text-slate-800">Standard Boards W/T (in)</label>
                <div className="grid grid-cols-2 gap-2">
                    <input type="number" step="0.25" value={deckWidth} onChange={e => setDeckWidth(Number(e.target.value))} className="p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" placeholder="Width" />
                    <input type="number" step="0.125" value={deckThickness} onChange={e => setDeckThickness(Number(e.target.value))} className="p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" placeholder="Thickness" />
                </div>
            </div>
            <div className="col-span-2 space-y-1 border-t pt-2 mt-2">
                <label className="font-semibold text-slate-800">Lead Boards W/T (in)</label>
                <div className="grid grid-cols-2 gap-2">
                    <input type="number" step="0.25" value={leadWidth} onChange={e => {setLeadWidth(Number(e.target.value)); setLeadSDirty(true);}} className="p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" placeholder="Width" />
                    <input type="number" step="0.125" value={leadThickness} onChange={e => {setLeadThickness(Number(e.target.value)); setLeadTDirty(true);}} className="p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" placeholder="Thickness" />
                </div>
            </div>
        </div>
    );

    const SpecsTable = () => (
        <div className="bg-white border border-[#004d3d]/20 rounded-xl overflow-hidden shadow-sm">
             <div className="bg-[#004d3d] text-white px-4 py-2 font-bold text-sm tracking-wide flex justify-between">
                  <span>Pallet Dimension Specifications</span>
                  <span>{currentSpecs.length}" L x {currentSpecs.width}" W x {trim0(currentSpecs.overallHeight)}" H</span>
             </div>
             <table className="w-full text-sm text-left">
                 <tbody>
                     <tr className="border-b">
                         <th className="px-4 py-3 bg-slate-50 font-semibold w-1/3 text-slate-600">Top Deckboards</th>
                         <td className="px-4 py-3 text-slate-800">
                             <div className="font-medium text-[#004d3d] mb-1">{currentSpecs.topDeckCount} Boards Total</div>
                             <div>{trim0(currentSpecs.leadThickness)}"T x {trim0(currentSpecs.leadWidth)}"W (Leads)</div>
                             <div>{trim0(currentSpecs.deckboardThickness)}"T x {trim0(currentSpecs.deckboardWidth)}"W (Interior)</div>
                         </td>
                     </tr>
                     <tr className="border-b">
                         <th className="px-4 py-3 bg-slate-50 font-semibold text-slate-600">Bottom Deckboards</th>
                         <td className="px-4 py-3 text-slate-800">
                             <div className="font-medium text-[#004d3d] mb-1">{currentSpecs.bottomDeckCount} Boards Total</div>
                             <div>{trim0(currentSpecs.leadThickness)}"T x {trim0(currentSpecs.leadWidth)}"W (Leads)</div>
                             <div>{trim0(currentSpecs.deckboardThickness)}"T x {trim0(currentSpecs.deckboardWidth)}"W (Interior)</div>
                         </td>
                     </tr>
                     <tr className="border-b">
                         <th className="px-4 py-3 bg-slate-50 font-semibold text-slate-600">Stringers / Blocks</th>
                         <td className="px-4 py-3 text-slate-800">
                             <div className="font-medium text-[#004d3d] mb-1">{currentSpecs.stringerCount} Stringers ({currentSpecs.palletType})</div>
                             <div>{trim0(currentSpecs.stringerHeight)}"H x {trim0(currentSpecs.stringerWidth)}"W</div>
                         </td>
                     </tr>
                     <tr>
                         <th className="px-4 py-3 bg-slate-50 font-semibold text-slate-600">Logistics Data</th>
                         <td className="px-4 py-3 text-slate-800 font-medium">
                             Weight: ~{currentSpecs.weightLbs.toFixed(1)} lbs | Truck (53'): {currentSpecs.truckQty} Stacks
                         </td>
                     </tr>
                 </tbody>
             </table>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 relative">
            
            {/* --- OFFFSCREEN LETTER STYLE PDF TEMPLATE (Strictly 8.5 x 11 aspect ratio ratio for html2canvas) --- */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '1px', overflow: 'hidden', pointerEvents: 'none', zIndex: -50 }}>
                <div ref={pdfTemplateRef} style={{ width: '816px', height: '1056px', backgroundColor: 'white', padding: '40px', boxSizing: 'border-box', position: 'relative' }}>
                    
                    {/* Header */}
                    <div style={{ borderBottom: `4px solid ${BRAND_COLOR}`, paddingBottom: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                              <img src="/logo-a3-pallet.png" alt="A3 Pallet Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
                              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                   <p style={{ margin: '0 0 4px 0', color: '#475569', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Pallet Spec Sheet</p>
                                   <p style={{ margin: 0, color: BRAND_COLOR, fontSize: '12px', fontWeight: '600' }}>www.a3pallet.com</p>
                              </div>
                         </div>
                         <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <p style={{ margin: '0 0 4px 0', color: '#334155', fontSize: '11px', fontWeight: '700' }}>DOCUMENT ID: #{Math.floor(Math.random() * 100000)}</p>
                              <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '11px' }}>Generated: {new Date().toLocaleDateString()}</p>
                              <p style={{ margin: 0, fontSize: '11px', color: '#475569', fontWeight: '600' }}>Heat Treated: <span style={{ color: currentSpecs.ht === 'Yes' ? BRAND_COLOR : '#64748b' }}>{currentSpecs.ht}</span></p>
                         </div>
                    </div>

                    {/* Spec Table Native DOM for PDF */}
                    <div style={{ marginBottom: '16px' }}>
                         <div style={{ backgroundColor: BRAND_COLOR, color: 'white', padding: '6px 16px', fontWeight: 'bold', borderRadius: '6px 6px 0 0', fontSize: '12px' }}>
                             {currentSpecs.length}" L x {currentSpecs.width}" W x {trim0(currentSpecs.overallHeight)}" H — {currentSpecs.palletType}
                         </div>
                         <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', borderTop: 'none' }}>
                             <tbody>
                                  <tr>
                                     <td style={{ padding: '6px 16px', borderBottom: '1px solid #e2e8f0', width: '25%', backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '11px', color: '#334155' }}>Top Deck</td>
                                     <td style={{ padding: '6px 16px', borderBottom: '1px solid #e2e8f0', fontSize: '11px', color: '#475569' }}>{currentSpecs.topDeckCount} Boards / {trim0(currentSpecs.leadThickness)}"x{trim0(currentSpecs.leadWidth)}" Leads / {trim0(currentSpecs.deckboardThickness)}"x{trim0(currentSpecs.deckboardWidth)}" Inner</td>
                                  </tr>
                                  <tr>
                                     <td style={{ padding: '6px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '11px', color: '#334155' }}>Bottom Deck</td>
                                     <td style={{ padding: '6px 16px', borderBottom: '1px solid #e2e8f0', fontSize: '11px', color: '#475569' }}>{currentSpecs.bottomDeckCount} Boards / {trim0(currentSpecs.leadThickness)}"x{trim0(currentSpecs.leadWidth)}" Leads / {trim0(currentSpecs.deckboardThickness)}"x{trim0(currentSpecs.deckboardWidth)}" Inner</td>
                                  </tr>
                                  <tr>
                                     <td style={{ padding: '6px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '11px', color: '#334155' }}>Stringers/Blocks</td>
                                     <td style={{ padding: '6px 16px', borderBottom: '1px solid #e2e8f0', fontSize: '11px', color: '#475569' }}>{currentSpecs.stringerCount} Stringers / {trim0(currentSpecs.stringerHeight)}"H x {trim0(currentSpecs.stringerWidth)}"W</td>
                                  </tr>
                                  <tr>
                                     <td style={{ padding: '6px 16px', backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '11px', color: '#334155' }}>Logistics</td>
                                     <td style={{ padding: '6px 16px', fontSize: '11px', color: '#475569' }}>Est. Weight: {currentSpecs.weightLbs.toFixed(1)} lbs | Truck Capacity: {currentSpecs.truckQty}</td>
                                  </tr>
                             </tbody>
                         </table>
                    </div>

                    {/* 3D Visualization Map */}
                    <div style={{ marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', textAlign: 'center', backgroundColor: '#ffffff' }}>
                         <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: BRAND_COLOR, fontWeight: '800', letterSpacing: '0.5px' }}>3D INTERACTIVE RENDER</h4>
                         <img id="pdf-3d-img" style={{ height: '230px', width: 'auto', margin: '0 auto', display: 'block', objectFit: 'contain' }} alt="3D View" />
                    </div>

                    {/* 2D Grid Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                         <div style={{ border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
                             <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: BRAND_COLOR, fontWeight: '700' }}>TOP VIEW</h4>
                             <img id="pdf-top-img" style={{ width: '100%', height: '190px', objectFit: 'contain' }} alt="Top" />
                         </div>
                         <div style={{ border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
                             <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: BRAND_COLOR, fontWeight: '700' }}>BOTTOM VIEW</h4>
                             <img id="pdf-bot-img" style={{ width: '100%', height: '190px', objectFit: 'contain' }} alt="Bottom" />
                         </div>
                         <div style={{ gridColumn: 'span 2', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                             <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: BRAND_COLOR, fontWeight: '700', textAlign: 'left' }}>SIDE PROFILE VIEW</h4>
                             <img id="pdf-side-img" style={{ width: '60%', height: '110px', objectFit: 'contain', margin: '0 auto', display: 'block' }} alt="Side" />
                         </div>
                    </div>
                </div>
            </div>

            {/* --- VISUAL UI PORTION --- */}
            <InputSection />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 3D Viewer */}
                <div className="border border-slate-200 shadow-sm rounded-xl overflow-hidden relative bg-[#f8fafc] flex flex-col">
                     <div className="absolute top-4 left-4 pointer-events-none z-10 drop-shadow-sm bg-white/60 px-3 py-1 rounded backdrop-blur">
                          <h3 className="font-extrabold text-[#004d3d] text-sm uppercase tracking-wide">3D Visualization</h3>
                     </div>
                     <div ref={threeContainerRef} className="w-full h-64 hover:cursor-grab active:cursor-grabbing" />
                </div>

                {/* Specs Table Output */}
                <SpecsTable />
            </div>

            {/* Cleaned 2D Blueprints */}
            <div className="grid grid-cols-1 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200 mt-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                         <h4 className="font-bold text-sm text-[#004d3d] mb-2 font-mono uppercase">Top Drawing</h4>
                         <canvas ref={topCanvasRef} className="w-full h-64 rounded-lg bg-white shadow-sm ring-1 ring-slate-900/5" />
                     </div>
                     <div>
                         <h4 className="font-bold text-sm text-[#004d3d] mb-2 font-mono uppercase">Bottom Drawing</h4>
                         <canvas ref={bottomCanvasRef} className="w-full h-64 rounded-lg bg-white shadow-sm ring-1 ring-slate-900/5" />
                     </div>
                 </div>
                 <div>
                     <h4 className="font-bold text-sm text-[#004d3d] mb-2 font-mono uppercase">Side View Profile</h4>
                     <canvas ref={sideCanvasRef} className="w-full h-48 rounded-lg bg-white shadow-sm ring-1 ring-slate-900/5" />
                 </div>
            </div>
            
        </div>
    );
});
InteractivePalletBuilder.displayName = 'InteractivePalletBuilder';
