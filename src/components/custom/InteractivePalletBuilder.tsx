'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { calculateDryVanCapacity, generatePalletSpecPdfDataUrl } from '@/lib/palletSpecPdf';

export interface PalletSpecs {
    length: number;
    width: number;
    palletType: string;
    woodType: string;
    // Normalized material for weight / load math: Grade A and Grade B are
    // recycled-pallet grades, so they map to Recycled; New Premium (HT/KD)
    // maps to New. woodType above keeps the display grade (e.g. "Grade A").
    woodMaterial: 'New' | 'Recycled';
    topDeckCount: number;
    bottomDeckCount: number;
    stringerCount: number;
    stringerWidth: number;
    stringerHeight: number;
    topDeckWidth: number;
    topDeckThickness: number;
    bottomDeckWidth: number;
    bottomDeckThickness: number;
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
    topLeadWidth: number;
    topLeadThickness: number;
    bottomLeadWidth: number;
    bottomLeadThickness: number;
    dynamicLoadLbs: number;
    staticLoadLbs: number;
}

export interface BuilderRef {
    capturePDFDataUrl: () => Promise<string | null>;
    getSpecs: () => PalletSpecs;
}

interface Props {
    onChange?: (specs: PalletSpecs) => void;
}

const WEIGHT_PER_BF: Record<string, number> = { New: 2.7, Recycled: 2.45 };

// Frequently-used specs from the A3 Pallet spec sheet. Each numeric field
// has a real preset dropdown plus a free-form text input, so presets work
// consistently across Chrome, Safari, and mobile browsers.
const PRESET_LENGTHS = [48];
const PRESET_WIDTHS = [40, 50];
const PRESET_BOARD_WIDTHS = [4, 6];
const PRESET_BOARD_THICKNESSES: { value: number; label: string }[] = [
    { value: 0.5, label: '1/2"' },
    { value: 0.6875, label: '11/16"' },
];
const PRESET_TOP_DECK_COUNTS = [3, 4, 5, 6, 7, 8];
const PRESET_BOTTOM_DECK_COUNTS = [3, 4, 5, 6];
const PRESET_STRINGER_COUNTS = [2, 3, 4, 5];

const PRESET_LENGTH_OPTIONS = PRESET_LENGTHS.map(value => ({ value, label: `${value}"` }));
const PRESET_WIDTH_OPTIONS = PRESET_WIDTHS.map(value => ({ value, label: `${value}"` }));
const PRESET_BOARD_WIDTH_OPTIONS = PRESET_BOARD_WIDTHS.map(value => ({ value, label: `${value}" wide` }));
const PRESET_THICKNESS_OPTIONS = PRESET_BOARD_THICKNESSES;
const PRESET_TOP_DECK_OPTIONS = PRESET_TOP_DECK_COUNTS.map(value => ({ value, label: `${value} boards` }));
const PRESET_BOTTOM_DECK_OPTIONS = PRESET_BOTTOM_DECK_COUNTS.map(value => ({ value, label: `${value} boards` }));
const PRESET_STRINGER_OPTIONS = PRESET_STRINGER_COUNTS.map(value => ({ value, label: `${value} stringers` }));

// Grades from the spec sheet. Grade A / Grade B are recycled-pallet grades,
// so they use the recycled material factor; New Premium (HT/KD) is new lumber
// and also implies heat treatment (applied in handleWoodTypeChange).
const NEW_MATERIAL_GRADES = ['New', 'New Premium (HT/KD)'];

function woodMaterial(woodType: string): 'New' | 'Recycled' {
    return NEW_MATERIAL_GRADES.includes(woodType) ? 'New' : 'Recycled';
}
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
function computeLoadCapacity(
    length: number,
    width: number,
    palletType: string,
    woodType: string,
    topWidths: number[],
    topThicknesses: number[],
    bottomWidths: number[],
    stringerCount: number,
    stringerWidth: number,
    stringerHeight: number
) {
    // 1. Top Deck Strength
    const topDeckWidthTotal = topWidths.reduce((a, b) => a + b, 0);
    const topDeckAvgThickness = topWidths.reduce((sum, w, i) => sum + w * (topThicknesses[i] || 0.75), 0) / (topDeckWidthTotal || 1);
    const deckSpan = Math.max(8, (width - stringerCount * stringerWidth) / Math.max(1, stringerCount - 1));
    const spanFactor = Math.pow(17.75 / deckSpan, 0.75);
    const thicknessFactor = Math.pow(topDeckAvgThickness / 0.55, 1.8);
    const coverageFactor = topDeckWidthTotal / 28.5;
    const fDeck = coverageFactor * thicknessFactor * spanFactor;

    // 2. Stringer / Block Support Strength
    const stringerCountFactor = stringerCount / 3;
    const lengthSpanFactor = Math.pow(48 / length, 0.9);
    const stringerDimFactor = (stringerWidth * Math.pow(stringerHeight, 2)) / (1.5 * 12.25);
    const typeFactor = palletType === '4-way' ? 0.85 : palletType === 'Block Pallet' ? 1.15 : 1.0;
    const fStringer = stringerCountFactor * lengthSpanFactor * stringerDimFactor * typeFactor;

    // 3. Wood Material Factor
    const woodFactor = woodType === 'Recycled' ? 0.82 : 1.0;

    // 4. Dynamic (Working / Forklift) Load Capacity
    // Standard GMA 48x40 #1 benchmark is 2,500 lbs
    const fDynamic = 0.55 * fStringer + 0.45 * fDeck;
    const fDeckFloor = fDeck * 1.35;
    const fDynamicEffective = Math.min(fDynamic, fDeckFloor) * woodFactor;
    let dynamicLoadLbs = Math.round((2500 * fDynamicEffective) / 50) * 50;
    dynamicLoadLbs = Math.max(1000, Math.min(6500, dynamicLoadLbs));

    // 5. Static (Floor / Stationary Stack) Load Capacity
    const botDeckWidthTotal = bottomWidths.reduce((a, b) => a + b, 0);
    const fBottom = 0.85 + 0.15 * (botDeckWidthTotal / 16.5);
    let staticLoadLbs = Math.round((dynamicLoadLbs * 2.3 * fBottom) / 100) * 100;
    staticLoadLbs = Math.max(2000, Math.min(15000, staticLoadLbs));

    return { dynamicLoadLbs, staticLoadLbs };
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

// Text-backed numeric input: keeps the raw typed text (e.g. "5.", "0.7") so
// decimals can be typed character by character. The numeric state updates
// whenever the text parses to a finite number; on blur the text is
// normalized to the numeric value. External numeric changes (datalist preset,
// Split Top/Bottom sync) overwrite the text. Defined at module level so its
// identity (and its text state / focus) survives parent re-renders.
type PresetOption = { value: number; label: string };

// Text-backed numeric input with a browser-independent preset selector.
// Users can always type arbitrary numbers, including in-progress decimals.
function DecimalInput({ value, onChange, step, className, placeholder, presets }: {
    value: number;
    onChange: (n: number) => void;
    step?: string;
    className?: string;
    placeholder?: string;
    presets?: PresetOption[];
}) {
    const [text, setText] = useState(() => String(value));

    useEffect(() => {
        const parsed = Number(text);
        if (!Number.isFinite(parsed) || parsed !== value) {
            if (String(value) !== text) setText(String(value));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const inputClassName = [
        presets?.length ? 'min-w-0 flex-1' : '',
        className?.replace(/\bw-full\b/g, ''),
    ].filter(Boolean).join(' ');

    const input = (
        <input
            type="text"
            inputMode="decimal"
            step={step}
            value={text}
            onChange={e => {
                const raw = e.target.value;
                setText(raw);
                if (raw.trim() === '') { onChange(0); return; }
                const n = Number(raw);
                if (Number.isFinite(n)) onChange(n);
            }}
            onBlur={() => { if (Number.isFinite(value)) setText(String(value)); }}
            className={inputClassName}
            placeholder={placeholder}
        />
    );

    if (!presets?.length) return input;

    return (
        <div className="flex w-full min-w-0 items-stretch gap-1">
            {input}
            <select
                aria-label="Common presets"
                defaultValue=""
                onChange={e => {
                    const option = presets.find(p => String(p.value) === e.target.value);
                    if (option) {
                        setText(String(option.value));
                        onChange(option.value);
                    }
                    e.currentTarget.value = '';
                }}
                className="w-20 shrink-0 rounded border border-slate-300 bg-white px-1 text-[10px] text-slate-700 focus:border-[#004d3d] focus:ring-[#004d3d]"
            >
                <option value="">Presets</option>
                {presets.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export const InteractivePalletBuilder = forwardRef<BuilderRef, Props>(({ onChange }, ref) => {
    const [length, setLength] = useState(48);
    const [width, setWidth] = useState(40);
    const [palletType, setPalletType] = useState('2-way');
    const [woodType, setWoodType] = useState('New');
    const [stringerCount, setStringerCount] = useState(3);
    const [topDeckCount, setTopDeckCount] = useState(6);
    const [bottomDeckCount, setBottomDeckCount] = useState(3);
    const [topDeckWidth, setTopDeckWidth] = useState(5.5);
    const [topDeckThickness, setTopDeckThickness] = useState(0.75);
    const [bottomDeckWidth, setBottomDeckWidth] = useState(5.5);
    const [bottomDeckThickness, setBottomDeckThickness] = useState(0.75);
    const [topLeadWidth, setTopLeadWidth] = useState(5.5);
    const [topLeadThickness, setTopLeadThickness] = useState(0.75);
    const [bottomLeadWidth, setBottomLeadWidth] = useState(5.5);
    const [bottomLeadThickness, setBottomLeadThickness] = useState(0.75);
    const [customBoardSize, setCustomBoardSize] = useState('');
    const [ht, setHt] = useState('No');

    const [topLeadSDirty, setTopLeadSDirty] = useState(false);
    const [topLeadTDirty, setTopLeadTDirty] = useState(false);
    const [bottomLeadSDirty, setBottomLeadSDirty] = useState(false);
    const [bottomLeadTDirty, setBottomLeadTDirty] = useState(false);
    
    const [showSplitStd, setShowSplitStd] = useState(false);
    const [showSplitLead, setShowSplitLead] = useState(false);

    const threeContainerRef = useRef<HTMLDivElement>(null);
    const topCanvasRef = useRef<HTMLCanvasElement>(null);
    const bottomCanvasRef = useRef<HTMLCanvasElement>(null);
    const sideCanvasRef = useRef<HTMLCanvasElement>(null);
    const pdfMetadataRef = useRef<{ documentId: string; generatedDate: Date } | null>(null);
    if (!pdfMetadataRef.current) {
        pdfMetadataRef.current = {
            documentId: String(Math.floor(10000 + Math.random() * 90000)),
            generatedDate: new Date(),
        };
    }

    const threeRef = useRef<{ scene?: THREE.Scene, camera?: THREE.PerspectiveCamera, renderer?: THREE.WebGLRenderer, group?: THREE.Group, reqId?: number }>({});

    const computeSpecs = (): PalletSpecs => {
        const l = clamp(length, 24, 120, 48);
        const w = clamp(width, 24, 96, 40);
        const tdc = clamp(topDeckCount, 3, 20, 6);
        const bdc = clamp(bottomDeckCount, 2, 14, 3);
        const sc = clamp(stringerCount, 2, 6, 3);
        const sW = 1.5; const sH = 3.5;
        const tW = clamp(topDeckWidth, 1, 12, 5.5);
        const tT = clamp(topDeckThickness, 0.125, 4, 0.75);
        const bW = clamp(bottomDeckWidth, 1, 12, 5.5);
        const bT = clamp(bottomDeckThickness, 0.125, 4, 0.75);
        
        const tlw = clamp(topLeadWidth, 1, 12, tW);
        const tlt = clamp(topLeadThickness, 0.125, 4, tT);
        const blw = clamp(bottomLeadWidth, 1, 12, bW);
        const blt = clamp(bottomLeadThickness, 0.125, 4, bT);
        
        const topWidths = getBoardWidths(tdc, tW, tlw);
        const bottomWidths = getBoardWidths(bdc, bW, blw);
        const topThicknesses = getBoardThicknesses(tdc, tT, tlt);
        const bottomThicknesses = getBoardThicknesses(bdc, bT, blt);

        const topBF = topWidths.reduce((sum, bw, i) => sum + (topThicknesses[i] * bw * w) / 144, 0);
        const bottomBF = bottomWidths.reduce((sum, bw, i) => sum + (bottomThicknesses[i] * bw * w) / 144, 0);
        const stringerBF = sc * ((sW * sH * l) / 144);
        const totalBF = topBF + bottomBF + stringerBF;
        const material = woodMaterial(woodType);
        const weightLbs = totalBF * WEIGHT_PER_BF[material];
        const nailCount = (tdc * sc * TOP_NAILS_PER_INTERSECTION) + (bdc * sc * BOTTOM_NAILS_PER_INTERSECTION);
        const overallHeight = tT + sH + bT; // Sum of stringer and both deck thicknesses
        const truckQty = calculateDryVanCapacity(l, w, overallHeight).estimatedTotal;
        const { dynamicLoadLbs, staticLoadLbs } = computeLoadCapacity(
            l, w, palletType, material, topWidths, topThicknesses, bottomWidths, sc, sW, sH
        );

        return {
            length: l, width: w, palletType, woodType, woodMaterial: material, topDeckCount: tdc, bottomDeckCount: bdc, stringerCount: sc,
            stringerWidth: sW, stringerHeight: sH, 
            topDeckWidth: tW, topDeckThickness: tT, bottomDeckWidth: bW, bottomDeckThickness: bT,
            customBoardSize,
            topWidths, bottomWidths, topThicknesses, bottomThicknesses, ht, weightLbs, nailCount, overallHeight,
            truckQty, topLeadWidth: tlw, topLeadThickness: tlt, bottomLeadWidth: blw, bottomLeadThickness: blt,
            dynamicLoadLbs, staticLoadLbs
        };
    };

    const syncStdWidth = (val: number) => {
        setTopDeckWidth(val);
        if (!showSplitStd) setBottomDeckWidth(val);
    };
    const syncStdThickness = (val: number) => {
        setTopDeckThickness(val);
        if (!showSplitStd) setBottomDeckThickness(val);
    };
    const syncLeadWidth = (val: number) => {
        setTopLeadWidth(val);
        setTopLeadSDirty(true);
        if (!showSplitLead) {
            setBottomLeadWidth(val);
            setBottomLeadSDirty(true);
        }
    };
    const syncLeadThickness = (val: number) => {
        setTopLeadThickness(val);
        setTopLeadTDirty(true);
        if (!showSplitLead) {
            setBottomLeadThickness(val);
            setBottomLeadTDirty(true);
        }
    };

    const handleWoodTypeChange = (value: string) => {
        setWoodType(value);
        // New Premium (HT/KD) is heat-treated / kiln-dried by definition.
        if (value === 'New Premium (HT/KD)') setHt('Yes');
    };

    const currentSpecs = computeSpecs();

    useImperativeHandle(ref, () => ({
        getSpecs: () => currentSpecs,
        capturePDFDataUrl: async () => generatePalletSpecPdfDataUrl(
            currentSpecs,
            pdfMetadataRef.current ?? undefined,
        ),
    }));

    useEffect(() => {
        if (onChange) onChange(currentSpecs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length, width, palletType, woodType, stringerCount, topDeckCount, bottomDeckCount, topDeckWidth, topDeckThickness, bottomDeckWidth, bottomDeckThickness, topLeadWidth, topLeadThickness, bottomLeadWidth, bottomLeadThickness, customBoardSize, ht]);

    useEffect(() => { if (!topLeadSDirty) setTopLeadWidth(topDeckWidth); }, [topDeckWidth, topLeadSDirty]);
    useEffect(() => { if (!topLeadTDirty) setTopLeadThickness(topDeckThickness); }, [topDeckThickness, topLeadTDirty]);
    useEffect(() => { if (!bottomLeadSDirty) setBottomLeadWidth(bottomDeckWidth); }, [bottomDeckWidth, bottomLeadSDirty]);
    useEffect(() => { if (!bottomLeadTDirty) setBottomLeadThickness(bottomDeckThickness); }, [bottomDeckThickness, bottomLeadTDirty]);

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

            const mat = new THREE.MeshLambertMaterial({ color: specs.woodMaterial === 'New' ? '#dfc097' : '#c4aa8b' });
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

            const marginX = 38; const marginY = 38; 
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
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let tCursor = y;
            const thicknesses = type === 'Top' ? specs.topThicknesses : specs.bottomThicknesses;
            boards.forEach((bw, idx) => {
                const bwPx = Math.max(4, bw * scale);
                if (bwPx >= 6) { // Lowered threshold from 14 to 6
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

             const scaleX = (cw - 100) / specs.length;
             const scaleY = Math.min((ch - 60) / specs.overallHeight, scaleX * 5);
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
                     ctx.fillText(`${trim0(specs.topThicknesses[idx])}"T`, cursor + bwPx/2, Math.max(y + 12, stringerY - bt - 8));
                 }
                 cursor += bwPx + (specs.topWidths.length>1 ? Math.max(0, specs.length - specs.topWidths.reduce((a,b)=>a+b,0))/(specs.topWidths.length-1)*scaleX : 0);
             });
             
             cursor = x;
             specs.bottomWidths.forEach((bw, idx) => {
                 const bwPx = bw * scaleX; const bt = specs.bottomThicknesses[idx] * scaleY;
                 if (bwPx > 15) {
                     ctx.fillText(`${trim0(specs.bottomThicknesses[idx])}"T`, cursor + bwPx/2, Math.min(y + drawH - 12, bottomY + bt + 8));
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
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 p-4 border rounded-xl bg-white text-sm">

            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Length (in)</label>
                <DecimalInput value={length} onChange={setLength} presets={PRESET_LENGTH_OPTIONS} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Width (in)</label>
                <DecimalInput value={width} onChange={setWidth} presets={PRESET_WIDTH_OPTIONS} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
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
                <select value={woodType} onChange={e => handleWoodTypeChange(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]">
                    <option value="New">New</option>
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Recycled">Recycled</option>
                    <option value="New Premium (HT/KD)">New Premium (HT/KD)</option>
                </select>
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Top Decks</label>
                <DecimalInput value={topDeckCount} onChange={setTopDeckCount} presets={PRESET_TOP_DECK_OPTIONS} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Bottom Decks</label>
                <DecimalInput value={bottomDeckCount} onChange={setBottomDeckCount} presets={PRESET_BOTTOM_DECK_OPTIONS} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                <label className="font-semibold text-slate-800">Stringers</label>
                <DecimalInput value={stringerCount} onChange={setStringerCount} presets={PRESET_STRINGER_OPTIONS} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]" />
            </div>
            <div className="space-y-1">
                 <label className="font-semibold text-slate-800">Heat Treated</label>
                 <select value={ht} onChange={e => setHt(e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d]">
                    <option value="Yes">Yes (ISPM-15)</option>
                    <option value="No">No</option>
                 </select>
            </div>
            {/* Standard Boards Section */}
            <div className="md:col-span-2 space-y-2 p-3 border border-slate-100 rounded-lg bg-slate-50/50">
                <div className="flex items-center justify-between">
                    <label className="font-bold text-[#004d3d] uppercase text-xs tracking-wider">Standard Boards (in)</label>
                    <button 
                        onClick={() => setShowSplitStd(!showSplitStd)}
                        className="text-[10px] text-slate-500 hover:text-[#004d3d] underline flex items-center gap-1"
                    >
                        {showSplitStd ? 'Collapse' : 'Split Top/Bottom'}
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <DecimalInput
                        step="0.25" presets={PRESET_BOARD_WIDTH_OPTIONS}
                        value={topDeckWidth}
                        onChange={syncStdWidth}
                        className="p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d] bg-white"
                        placeholder="Width"
                    />
                    <DecimalInput
                        step="0.125" presets={PRESET_THICKNESS_OPTIONS}
                        value={topDeckThickness}
                        onChange={syncStdThickness}
                        className="p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d] bg-white"
                        placeholder="Thickness"
                    />
                </div>
                {showSplitStd && (
                    <div className="pt-2 mt-2 border-t border-slate-200 grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="grid grid-cols-4 items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Top</span>
                            <DecimalInput step="0.25" presets={PRESET_BOARD_WIDTH_OPTIONS} value={topDeckWidth} onChange={setTopDeckWidth} className="col-span-1.5 p-1 text-xs border border-slate-200 rounded" />
                            <DecimalInput step="0.125" presets={PRESET_THICKNESS_OPTIONS} value={topDeckThickness} onChange={setTopDeckThickness} className="col-span-1.5 p-1 text-xs border border-slate-200 rounded" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Bot</span>
                            <DecimalInput step="0.25" presets={PRESET_BOARD_WIDTH_OPTIONS} value={bottomDeckWidth} onChange={setBottomDeckWidth} className="col-span-1.5 p-1 text-xs border border-slate-200 rounded" />
                            <DecimalInput step="0.125" presets={PRESET_THICKNESS_OPTIONS} value={bottomDeckThickness} onChange={setBottomDeckThickness} className="col-span-1.5 p-1 text-xs border border-slate-200 rounded" />
                        </div>
                    </div>
                )}
            </div>

            {/* Lead Boards Section */}
            <div className="md:col-span-2 space-y-2 p-3 border border-slate-100 rounded-lg bg-slate-50/50">
                <div className="flex items-center justify-between">
                    <label className="font-bold text-[#004d3d] uppercase text-xs tracking-wider">Lead Boards (in)</label>
                    <button 
                        onClick={() => setShowSplitLead(!showSplitLead)}
                        className="text-[10px] text-slate-500 hover:text-[#004d3d] underline flex items-center gap-1"
                    >
                        {showSplitLead ? 'Collapse' : 'Split Top/Bottom'}
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <DecimalInput
                        step="0.25" presets={PRESET_BOARD_WIDTH_OPTIONS}
                        value={topLeadWidth}
                        onChange={syncLeadWidth}
                        className="p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d] bg-white italic"
                        placeholder="Width"
                    />
                    <DecimalInput
                        step="0.125" presets={PRESET_THICKNESS_OPTIONS}
                        value={topLeadThickness}
                        onChange={syncLeadThickness}
                        className="p-2 border border-slate-300 rounded focus:ring-[#004d3d] focus:border-[#004d3d] bg-white italic"
                        placeholder="Thickness"
                    />
                </div>
                {showSplitLead && (
                    <div className="pt-2 mt-2 border-t border-slate-200 grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="grid grid-cols-4 items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Top</span>
                            <DecimalInput step="0.25" presets={PRESET_BOARD_WIDTH_OPTIONS} value={topLeadWidth} onChange={n => { setTopLeadWidth(n); setTopLeadSDirty(true); }} className="col-span-1.5 p-1 text-xs border border-slate-200 rounded italic" />
                            <DecimalInput step="0.125" presets={PRESET_THICKNESS_OPTIONS} value={topLeadThickness} onChange={n => { setTopLeadThickness(n); setTopLeadTDirty(true); }} className="col-span-1.5 p-1 text-xs border border-slate-200 rounded italic" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Bot</span>
                            <DecimalInput step="0.25" presets={PRESET_BOARD_WIDTH_OPTIONS} value={bottomLeadWidth} onChange={n => { setBottomLeadWidth(n); setBottomLeadSDirty(true); }} className="col-span-1.5 p-1 text-xs border border-slate-200 rounded italic" />
                            <DecimalInput step="0.125" presets={PRESET_THICKNESS_OPTIONS} value={bottomLeadThickness} onChange={n => { setBottomLeadThickness(n); setBottomLeadTDirty(true); }} className="col-span-1.5 p-1 text-xs border border-slate-200 rounded italic" />
                        </div>
                    </div>
                )}
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
                             <div>{trim0(currentSpecs.topLeadThickness)}"T x {trim0(currentSpecs.topLeadWidth)}"W (Leads)</div>
                             <div>{trim0(currentSpecs.topDeckThickness)}"T x {trim0(currentSpecs.topDeckWidth)}"W (Interior)</div>
                         </td>
                     </tr>
                     <tr className="border-b">
                         <th className="px-4 py-3 bg-slate-50 font-semibold text-slate-600">Bottom Deckboards</th>
                         <td className="px-4 py-3 text-slate-800">
                             <div className="font-medium text-[#004d3d] mb-1">{currentSpecs.bottomDeckCount} Boards Total</div>
                             <div>{trim0(currentSpecs.bottomLeadThickness)}"T x {trim0(currentSpecs.bottomLeadWidth)}"W (Leads)</div>
                             <div>{trim0(currentSpecs.bottomDeckThickness)}"T x {trim0(currentSpecs.bottomDeckWidth)}"W (Interior)</div>
                         </td>
                     </tr>
                     <tr className="border-b">
                         <th className="px-4 py-3 bg-slate-50 font-semibold text-slate-600">Stringers / Blocks</th>
                         <td className="px-4 py-3 text-slate-800">
                             <div className="font-medium text-[#004d3d] mb-1">{currentSpecs.stringerCount} Stringers ({currentSpecs.palletType})</div>
                             <div>{trim0(currentSpecs.stringerHeight)}"H x {trim0(currentSpecs.stringerWidth)}"W</div>
                         </td>
                     </tr>
                     <tr className="border-b">
                         <th className="px-4 py-3 bg-slate-50 font-semibold text-slate-600">Estimated Load Capacity</th>
                         <td className="px-4 py-3 text-slate-800">
                             <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                 <div><span className="font-semibold text-[#004d3d]">Dynamic:</span> ~{currentSpecs.dynamicLoadLbs.toLocaleString()} lbs</div>
                                 <div className="text-slate-300 hidden sm:inline">|</div>
                                 <div><span className="font-semibold text-[#004d3d]">Static:</span> ~{currentSpecs.staticLoadLbs.toLocaleString()} lbs</div>
                             </div>
                             <div className="text-[11px] text-slate-500 mt-0.5">Forklift moving vs. floor storage (uniformly distributed load)</div>
                         </td>
                     </tr>
                     <tr>
                         <th className="px-4 py-3 bg-slate-50 font-semibold text-slate-600">Logistics Data</th>
                         <td className="px-4 py-3 text-slate-800 font-medium">
                             Weight: ~{currentSpecs.weightLbs.toFixed(1)} lbs | 53&apos; Dry Van est.: {currentSpecs.truckQty.toLocaleString()} empty pallets (616-baseline volume ratio)
                         </td>
                     </tr>
                 </tbody>
             </table>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 relative">

            {/* --- VISUAL UI PORTION --- */}
            {/* InputSection is called as a plain function (not <InputSection />):
                it is defined inside this component, so rendering it as JSX would
                remount all inputs on every keystroke and drop focus/text. */}
            {InputSection()}

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
