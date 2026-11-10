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

// Frequently-used specs from the A3 Pallet spec sheet. Offered as dropdown
// suggestions (datalist comboboxes) on the numeric inputs below - users can
// still type any custom number; presets never clamp or restrict input.
const PRESET_LENGTHS = [48];
const PRESET_WIDTHS = [40, 50];
const PRESET_BOARD_WIDTHS = [4, 6];
const PRESET_BOARD_THICKNESSES: { value: number; label: string }[] = [
    { value: 0.5, label: '1/2"' },
    { value: 0.6875, label: '11/16"' },
];

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
