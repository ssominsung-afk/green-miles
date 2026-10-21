import { jsPDF } from 'jspdf';

export interface PalletPdfSpecs {
    length: number;
    width: number;
    palletType: string;
    woodType: string;
    topDeckCount: number;
    bottomDeckCount: number;
    stringerCount: number;
    stringerWidth: number;
    stringerHeight: number;
    topDeckWidth: number;
    topDeckThickness: number;
    bottomDeckWidth: number;
    bottomDeckThickness: number;
    topWidths: number[];
    bottomWidths: number[];
    topThicknesses: number[];
    bottomThicknesses: number[];
    topLeadWidth: number;
    topLeadThickness: number;
    bottomLeadWidth: number;
    bottomLeadThickness: number;
    ht: string;
    weightLbs: number;
    overallHeight: number;
    dynamicLoadLbs: number;
    staticLoadLbs: number;
}

export interface DryVanCapacity {
    estimatedTotal: number;
    standardReference: number;
    standardVolume: number;
    customVolume: number;
    volumeRatio: number;
}

export interface PalletSpecPdfOptions {
    documentId?: string;
    generatedDate?: Date;
    logoUrl?: string;
}

type RGB = [number, number, number];
type Point = [number, number];

const GREEN: RGB = [0, 77, 61];
const GREEN_LIGHT: RGB = [229, 241, 236];
const GREEN_PALE: RGB = [245, 250, 248];
const CHARCOAL: RGB = [30, 41, 59];
const SLATE: RGB = [71, 85, 105];
const MUTED: RGB = [100, 116, 139];
const RULE: RGB = [203, 213, 225];
const SOFT_RULE: RGB = [226, 232, 240];
const WHITE: RGB = [255, 255, 255];
const WOOD: RGB = [229, 199, 151];
const WOOD_MID: RGB = [205, 164, 108];
const WOOD_DARK: RGB = [177, 132, 77];

const LETTER_WIDTH = 612;
const MARGIN = 30;
const STANDARD_PALLET_REFERENCE = 616;
const STANDARD_PALLET_VOLUME = 48 * 40 * 5;

function setFill(doc: jsPDF, color: RGB) {
    doc.setFillColor(color[0], color[1], color[2]);
}

function setDraw(doc: jsPDF, color: RGB) {
    doc.setDrawColor(color[0], color[1], color[2]);
}

function setText(doc: jsPDF, color: RGB) {
    doc.setTextColor(color[0], color[1], color[2]);
}

function fmt(value: number, decimals = 3) {
    return Number(value.toFixed(decimals)).toString();
}

function formatNumber(value: number) {
    return Math.round(value).toLocaleString('en-US');
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
}

function makeDocumentId() {
    return String(Math.floor(10000 + Math.random() * 90000));
}

export function calculateDryVanCapacity(
    length: number,
    width: number,
    palletHeight: number,
): DryVanCapacity {
    const customVolume = length * width * palletHeight;
    const volumeRatio = customVolume > 0 ? STANDARD_PALLET_VOLUME / customVolume : 0;
    const estimatedTotal = Math.max(0, Math.floor(STANDARD_PALLET_REFERENCE * volumeRatio));

    return {
        estimatedTotal,
        standardReference: STANDARD_PALLET_REFERENCE,
        standardVolume: STANDARD_PALLET_VOLUME,
        customVolume,
        volumeRatio,
    };
}

function boardPlacements(widths: number[], totalLength: number) {
    const used = widths.reduce((sum, value) => sum + value, 0);
    const gap = widths.length > 1 ? Math.max(0, totalLength - used) / (widths.length - 1) : 0;
    let cursor = 0;
    return widths.map((boardWidth, index) => {
        const start = cursor;
        cursor += boardWidth + (index < widths.length - 1 ? gap : 0);
        return { start, width: boardWidth };
    });
}

function supportPositions(count: number, totalWidth: number, supportWidth: number) {
    if (count <= 1) return [(totalWidth - supportWidth) / 2];
    const last = Math.max(0, totalWidth - supportWidth);
    return Array.from({ length: count }, (_, index) => (last * index) / (count - 1));
}

function roundedPanel(doc: jsPDF, x: number, y: number, width: number, height: number, fillColor: RGB = WHITE) {
    setFill(doc, fillColor);
    setDraw(doc, RULE);
    doc.setLineWidth(0.65);
    doc.roundedRect(x, y, width, height, 4, 4, 'FD');
}

function polygon(doc: jsPDF, points: Point[], fillColor: RGB, strokeColor: RGB = GREEN, lineWidth = 0.55) {
    if (points.length < 3) return;
    setFill(doc, fillColor);
    setDraw(doc, strokeColor);
    doc.setLineWidth(lineWidth);
    const segments = points.slice(1).map((point, index) => [
        point[0] - points[index][0],
        point[1] - points[index][1],
    ] as [number, number]);
    doc.lines(segments, points[0][0], points[0][1], [1, 1], 'FD', true);
}

function drawOpenArrow(doc: jsPDF, point: Point, angle: number, size = 4) {
    const [x, y] = point;
    doc.line(x, y, x + Math.cos(angle + 0.48) * size, y + Math.sin(angle + 0.48) * size);
    doc.line(x, y, x + Math.cos(angle - 0.48) * size, y + Math.sin(angle - 0.48) * size);
}

function drawLineDimension(
    doc: jsPDF,
    start: Point,
    end: Point,
    label: string,
    labelOffset: Point = [0, -5],
) {
    setDraw(doc, GREEN);
    setText(doc, GREEN);
    doc.setLineWidth(0.55);
    doc.line(start[0], start[1], end[0], end[1]);
    const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
    drawOpenArrow(doc, start, angle, 3.8);
    drawOpenArrow(doc, end, angle + Math.PI, 3.8);
    const midX = (start[0] + end[0]) / 2 + labelOffset[0];
    const midY = (start[1] + end[1]) / 2 + labelOffset[1];
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    const textWidth = doc.getTextWidth(label);
    setFill(doc, WHITE);
    doc.rect(midX - textWidth / 2 - 2, midY - 5.5, textWidth + 4, 7.5, 'F');
    setText(doc, GREEN);
    doc.text(label, midX, midY, { align: 'center' });
}

function drawHorizontalDimension(
    doc: jsPDF,
    x1: number,
    x2: number,
    objectY: number,
    dimensionY: number,
    label: string,
) {
    setDraw(doc, MUTED);
    doc.setLineWidth(0.45);
    doc.line(x1, objectY, x1, dimensionY);
    doc.line(x2, objectY, x2, dimensionY);
    drawLineDimension(doc, [x1, dimensionY], [x2, dimensionY], label, [0, -3.5]);
}

function drawVerticalDimension(
    doc: jsPDF,
    y1: number,
    y2: number,
    objectX: number,
    dimensionX: number,
    label: string,
) {
    setDraw(doc, MUTED);
    doc.setLineWidth(0.45);
    doc.line(objectX, y1, dimensionX, y1);
    doc.line(objectX, y2, dimensionX, y2);
    drawLineDimension(doc, [dimensionX, y1], [dimensionX, y2], label, [-8, 2]);
}

function drawSectionTitle(doc: jsPDF, x: number, y: number, title: string, width?: number) {
    setText(doc, GREEN);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(title.toUpperCase(), x, y);
    if (width) {
        setDraw(doc, SOFT_RULE);
        doc.setLineWidth(0.5);
        doc.line(x, y + 4, x + width, y + 4);
    }
}

function drawIsoPrism(
    doc: jsPDF,
    project: (x: number, y: number, z: number) => Point,
    x: number,
    y: number,
    z: number,
    dx: number,
    dy: number,
    dz: number,
    top: RGB,
    sideA: RGB,
    sideB: RGB,
) {
    const p100 = project(x + dx, y, z);
    const p110 = project(x + dx, y + dy, z);
    const p010 = project(x, y + dy, z);
    const p001 = project(x, y, z + dz);
    const p101 = project(x + dx, y, z + dz);
    const p111 = project(x + dx, y + dy, z + dz);
    const p011 = project(x, y + dy, z + dz);

    polygon(doc, [p100, p110, p111, p101], sideA);
    polygon(doc, [p010, p110, p111, p011], sideB);
    polygon(doc, [p001, p101, p111, p011], top);
}

function drawIsometricView(doc: jsPDF, specs: PalletPdfSpecs, x: number, y: number, width: number, height: number) {
    roundedPanel(doc, x, y, width, height, WHITE);
    drawSectionTitle(doc, x + 12, y + 17, 'Isometric construction view', width - 24);

    const plot = { x: x + 22, y: y + 29, width: width - 44, height: height - 48 };
    const isoCos = Math.cos(Math.PI / 6);
    const totalHeight = specs.overallHeight;
    const rawMinX = -specs.width * isoCos;
    const rawMaxX = specs.length * isoCos;
    const rawMinY = -totalHeight;
    const rawMaxY = (specs.length + specs.width) * 0.5;
    const scale = Math.min(
        plot.width / Math.max(1, rawMaxX - rawMinX),
        plot.height / Math.max(1, rawMaxY - rawMinY),
    ) * 0.88;
    const rawCenterX = (rawMinX + rawMaxX) / 2;
    const rawCenterY = (rawMinY + rawMaxY) / 2;
    const originX = plot.x + plot.width / 2 - rawCenterX * scale;
    const originY = plot.y + plot.height / 2 - rawCenterY * scale + 2;
    const project = (px: number, py: number, pz: number): Point => [
        originX + (px - py) * isoCos * scale,
        originY + (px + py) * 0.5 * scale - pz * scale,
    ];

    const maxBottomThickness = Math.max(...specs.bottomThicknesses, specs.bottomDeckThickness);
    const supportZ = maxBottomThickness;
    const topZ = supportZ + specs.stringerHeight;

    boardPlacements(specs.bottomWidths, specs.length).forEach((board, index) => {
        drawIsoPrism(
            doc,
            project,
            board.start,
            0,
            0,
            board.width,
            specs.width,
            specs.bottomThicknesses[index] ?? specs.bottomDeckThickness,
            WOOD,
            WOOD_DARK,
            WOOD_MID,
        );
    });

    supportPositions(specs.stringerCount, specs.width, specs.stringerWidth).forEach((supportY) => {
        if (specs.palletType === 'Block Pallet') {
            const runnerThickness = Math.min(0.75, specs.stringerHeight * 0.3);
            drawIsoPrism(
                doc,
                project,
                0,
                supportY,
                supportZ + specs.stringerHeight - runnerThickness,
                specs.length,
                specs.stringerWidth,
                runnerThickness,
                WOOD,
                WOOD_DARK,
                WOOD_MID,
            );
            const blockLength = Math.min(5, specs.length / 4);
            [0, (specs.length - blockLength) / 2, specs.length - blockLength].forEach((blockX) => {
                drawIsoPrism(
                    doc,
                    project,
                    blockX,
                    supportY,
                    supportZ,
                    blockLength,
                    specs.stringerWidth,
                    specs.stringerHeight - runnerThickness,
                    WOOD,
                    WOOD_DARK,
                    WOOD_MID,
                );
            });
        } else {
            drawIsoPrism(
                doc,
                project,
                0,
                supportY,
                supportZ,
                specs.length,
                specs.stringerWidth,
                specs.stringerHeight,
                WOOD_MID,
                WOOD_DARK,
                WOOD_DARK,
            );
        }
    });

    boardPlacements(specs.topWidths, specs.length).forEach((board, index) => {
        drawIsoPrism(
            doc,
            project,
            board.start,
            0,
            topZ,
            board.width,
            specs.width,
            specs.topThicknesses[index] ?? specs.topDeckThickness,
            WOOD,
            WOOD_DARK,
            WOOD_MID,
        );
    });

    const lengthStart = project(0, 0, -0.9);
    const lengthEnd = project(specs.length, 0, -0.9);
    drawLineDimension(doc, lengthStart, lengthEnd, `${fmt(specs.length)}\" L`, [3, 5]);
    const widthStart = project(0, 0, -0.9);
    const widthEnd = project(0, specs.width, -0.9);
    drawLineDimension(doc, widthStart, widthEnd, `${fmt(specs.width)}\" W`, [-3, 5]);
    const heightStart = project(specs.length, specs.width, 0);
    const heightEnd = project(specs.length, specs.width, totalHeight);
    drawLineDimension(doc, heightStart, heightEnd, `${fmt(totalHeight)}\" H`, [14, 2]);
}

function drawPlanView(
    doc: jsPDF,
    specs: PalletPdfSpecs,
    x: number,
    y: number,
    width: number,
    height: number,
    variant: 'top' | 'bottom',
) {
    roundedPanel(doc, x, y, width, height, WHITE);
    drawSectionTitle(doc, x + 9, y + 14, `${variant} view`);

    const boardWidths = variant === 'top' ? specs.topWidths : specs.bottomWidths;
    const plotX = x + 24;
    const plotY = y + 29;
    const plotWidth = width - 40;
    const plotHeight = height - 48;
    const scale = Math.min(plotWidth / specs.length, plotHeight / specs.width);
    const palletWidth = specs.length * scale;
    const palletHeight = specs.width * scale;
    const startX = plotX + (plotWidth - palletWidth) / 2;
    const startY = plotY + (plotHeight - palletHeight) / 2;

    setFill(doc, GREEN_LIGHT);
    setDraw(doc, GREEN);
    doc.setLineWidth(0.45);
    supportPositions(specs.stringerCount, specs.width, specs.stringerWidth).forEach((supportY) => {
        doc.rect(
            startX,
            startY + supportY * scale,
            palletWidth,
            Math.max(1.4, specs.stringerWidth * scale),
            'FD',
        );
    });

    boardPlacements(boardWidths, specs.length).forEach((board, index) => {
        setFill(doc, variant === 'top' ? WOOD : WOOD_MID);
        setDraw(doc, GREEN);
        doc.setLineWidth(index === 0 || index === boardWidths.length - 1 ? 0.75 : 0.5);
        doc.rect(startX + board.start * scale, startY, Math.max(1.5, board.width * scale), palletHeight, 'FD');
    });

    setDraw(doc, GREEN);
    doc.setLineWidth(0.8);
    doc.rect(startX, startY, palletWidth, palletHeight, 'S');
    drawHorizontalDimension(doc, startX, startX + palletWidth, startY, startY - 7, `${fmt(specs.length)}\" L`);
    drawVerticalDimension(doc, startY, startY + palletHeight, startX, startX - 7, `${fmt(specs.width)}\" W`);
}

function drawSideView(doc: jsPDF, specs: PalletPdfSpecs, x: number, y: number, width: number, height: number) {
    roundedPanel(doc, x, y, width, height, WHITE);
    drawSectionTitle(doc, x + 9, y + 14, 'Side elevation');

    const plotX = x + 23;
    const plotY = y + 29;
    const plotWidth = width - 38;
    const plotHeight = height - 46;
    const scaleX = plotWidth / specs.length;
    const scaleY = Math.min(plotHeight / specs.overallHeight, scaleX * 5.2);
    const palletWidth = specs.length * scaleX;
    const palletHeight = specs.overallHeight * scaleY;
    const startX = plotX + (plotWidth - palletWidth) / 2;
    const startY = plotY + (plotHeight - palletHeight) / 2;
    const topThickness = Math.max(...specs.topThicknesses, specs.topDeckThickness) * scaleY;
    const supportY = startY + topThickness;
    const supportHeight = specs.stringerHeight * scaleY;

    setFill(doc, WOOD_MID);
    setDraw(doc, GREEN);
    doc.setLineWidth(0.65);
    if (specs.palletType === 'Block Pallet') {
        const runnerHeight = Math.min(0.75 * scaleY, supportHeight * 0.3);
        doc.rect(startX, supportY, palletWidth, runnerHeight, 'FD');
        const blockWidth = Math.min(5 * scaleX, palletWidth / 4);
        [startX, startX + palletWidth / 2 - blockWidth / 2, startX + palletWidth - blockWidth].forEach((blockX) => {
            doc.rect(blockX, supportY + runnerHeight, blockWidth, supportHeight - runnerHeight, 'FD');
        });
    } else {
        doc.rect(startX, supportY, palletWidth, supportHeight, 'FD');
        if (specs.palletType === '4-way') {
            const notchWidth = Math.min(9 * scaleX, palletWidth * 0.2);
            const notchHeight = Math.min(1.5 * scaleY, supportHeight * 0.55);
            [startX + palletWidth * 0.16, startX + palletWidth * 0.84 - notchWidth].forEach((notchX) => {
                setFill(doc, WHITE);
                doc.rect(notchX, supportY + supportHeight - notchHeight, notchWidth, notchHeight, 'FD');
            });
        }
    }

    boardPlacements(specs.topWidths, specs.length).forEach((board, index) => {
        const boardHeight = (specs.topThicknesses[index] ?? specs.topDeckThickness) * scaleY;
        setFill(doc, WOOD);
        setDraw(doc, GREEN);
        doc.rect(startX + board.start * scaleX, supportY - boardHeight, Math.max(1, board.width * scaleX), boardHeight, 'FD');
    });
    boardPlacements(specs.bottomWidths, specs.length).forEach((board, index) => {
        const boardHeight = (specs.bottomThicknesses[index] ?? specs.bottomDeckThickness) * scaleY;
        setFill(doc, WOOD);
        setDraw(doc, GREEN);
        doc.rect(
            startX + board.start * scaleX,
            supportY + supportHeight,
            Math.max(1, board.width * scaleX),
            boardHeight,
            'FD',
        );
    });

    setDraw(doc, GREEN);
    doc.setLineWidth(0.8);
    doc.rect(startX, startY, palletWidth, palletHeight, 'S');
    drawHorizontalDimension(doc, startX, startX + palletWidth, startY + palletHeight, startY + palletHeight + 7, `${fmt(specs.length)}\" L`);
    drawVerticalDimension(doc, startY, startY + palletHeight, startX, startX - 7, `${fmt(specs.overallHeight)}\" H`);
}

function drawSidebar(
    doc: jsPDF,
    specs: PalletPdfSpecs,
    capacity: DryVanCapacity,
    x: number,
    y: number,
    width: number,
    height: number,
) {
    roundedPanel(doc, x, y, width, height, WHITE);
    setFill(doc, GREEN);
    doc.roundedRect(x, y, width, 28, 4, 4, 'F');
    doc.rect(x, y + 20, width, 8, 'F');
    setText(doc, WHITE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('KEY SPECIFICATIONS', x + 11, y + 18);

    const rows: Array<{ label: string; lines: string[]; height: number }> = [
        {
            label: 'CONSTRUCTION',
            lines: [`${specs.palletType} / ${specs.woodType} wood`, `Heat treated: ${specs.ht}`],
            height: 34,
        },
        {
            label: 'TOP DECK',
            lines: [
                `${specs.topDeckCount} boards`,
                `Lead ${fmt(specs.topLeadThickness)} x ${fmt(specs.topLeadWidth)} in`,
                `Inner ${fmt(specs.topDeckThickness)} x ${fmt(specs.topDeckWidth)} in`,
            ],
            height: 42,
        },
        {
            label: 'BOTTOM DECK',
            lines: [
                `${specs.bottomDeckCount} boards`,
                `Lead ${fmt(specs.bottomLeadThickness)} x ${fmt(specs.bottomLeadWidth)} in`,
                `Inner ${fmt(specs.bottomDeckThickness)} x ${fmt(specs.bottomDeckWidth)} in`,
            ],
            height: 42,
        },
        {
            label: specs.palletType === 'Block Pallet' ? 'BLOCK SUPPORT' : 'STRINGERS',
            lines: [
                `${specs.stringerCount} total`,
                `${fmt(specs.stringerHeight)} H x ${fmt(specs.stringerWidth)} W in`,
            ],
            height: 34,
        },
    ];

    let rowY = y + 28;
    rows.forEach((row, index) => {
        if (index % 2 === 0) {
            setFill(doc, GREEN_PALE);
            doc.rect(x + 0.5, rowY, width - 1, row.height, 'F');
        }
        setText(doc, GREEN);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.text(row.label, x + 10, rowY + 10);
        setText(doc, CHARCOAL);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.2);
        row.lines.forEach((line, lineIndex) => doc.text(line, x + 10, rowY + 20 + lineIndex * 9));
        rowY += row.height;
        setDraw(doc, SOFT_RULE);
        doc.setLineWidth(0.4);
        doc.line(x, rowY, x + width, rowY);
    });

    const performanceY = rowY + 9;
    setText(doc, GREEN);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.text('ESTIMATED PERFORMANCE', x + 10, performanceY);
    setText(doc, CHARCOAL);
    doc.setFontSize(7.8);
    doc.text(`Dynamic  ~${formatNumber(specs.dynamicLoadLbs)} lb`, x + 10, performanceY + 13);
    doc.text(`Static     ~${formatNumber(specs.staticLoadLbs)} lb UDL`, x + 10, performanceY + 25);

    const logisticsY = y + height - 51;
    setFill(doc, GREEN_LIGHT);
    setDraw(doc, GREEN);
    doc.roundedRect(x + 8, logisticsY, width - 16, 43, 3, 3, 'FD');
    setText(doc, GREEN);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text('EST. 53-FT DRY-VAN CAPACITY', x + 16, logisticsY + 11);
    doc.setFontSize(12);
    doc.text(`${capacity.estimatedTotal} PALLETS`, x + 16, logisticsY + 27);
    setText(doc, SLATE);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.text(`~${specs.weightLbs.toFixed(1)} lb each | volume-ratio estimate*`, x + 16, logisticsY + 38);
}

function drawComponentSchedule(doc: jsPDF, specs: PalletPdfSpecs, x: number, y: number, width: number, height: number) {
    roundedPanel(doc, x, y, width, height, WHITE);
    drawSectionTitle(doc, x + 10, y + 15, 'Component schedule', width - 20);
    const tableY = y + 23;
    const columns = [x + 10, x + 124, x + 165, x + width - 10];
    const rowHeight = 21;

    setFill(doc, GREEN_PALE);
    doc.rect(x + 1, tableY, width - 2, 16, 'F');
    setText(doc, MUTED);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.text('COMPONENT', columns[0], tableY + 11);
    doc.text('QTY', columns[1], tableY + 11);
    doc.text('NOMINAL SIZE', columns[2], tableY + 11);

    const supportName = specs.palletType === 'Block Pallet' ? 'Blocks / runners' : 'Stringers';
    const rows = [
        [
            'Top deckboards',
            String(specs.topDeckCount),
            `${fmt(specs.topLeadThickness)} x ${fmt(specs.topLeadWidth)} lead; ${fmt(specs.topDeckThickness)} x ${fmt(specs.topDeckWidth)} inner`,
        ],
        [
            'Bottom deckboards',
            String(specs.bottomDeckCount),
            `${fmt(specs.bottomLeadThickness)} x ${fmt(specs.bottomLeadWidth)} lead; ${fmt(specs.bottomDeckThickness)} x ${fmt(specs.bottomDeckWidth)} inner`,
        ],
        [
            supportName,
            String(specs.stringerCount),
            `${fmt(specs.stringerHeight)} H x ${fmt(specs.stringerWidth)} W x ${fmt(specs.length)} L`,
        ],
    ];

    rows.forEach((row, index) => {
        const rowY = tableY + 16 + index * rowHeight;
        setDraw(doc, SOFT_RULE);
        doc.setLineWidth(0.4);
        doc.line(x, rowY, x + width, rowY);
        setText(doc, CHARCOAL);
        doc.setFont('helvetica', index === 2 ? 'bold' : 'normal');
        doc.setFontSize(7.7);
        doc.text(row[0], columns[0], rowY + 14);
        doc.setFont('helvetica', 'normal');
        doc.text(row[1], columns[1], rowY + 14);
        doc.text(row[2], columns[2], rowY + 14);
    });
}

async function loadLogoDataUrl(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const blob = await response.blob();
        return await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });
    } catch {
        return null;
    }
}

function drawHeader(
    doc: jsPDF,
    specs: PalletPdfSpecs,
    documentId: string,
    generatedDate: Date,
    logoDataUrl: string | null,
) {
    const top = 28;
    if (logoDataUrl) {
        const image = doc.getImageProperties(logoDataUrl);
        const logoWidth = 118;
        const logoHeight = Math.min(34, (logoWidth * image.height) / image.width);
        doc.addImage(logoDataUrl, 'PNG', MARGIN, top + (34 - logoHeight) / 2, logoWidth, logoHeight, undefined, 'FAST');
    } else {
        setText(doc, GREEN);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('A3 PALLET', MARGIN, top + 22);
    }

    setText(doc, CHARCOAL);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13.5);
    doc.text('CUSTOM PALLET SPECIFICATION', 165, top + 14);
    setText(doc, MUTED);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Dimensioned construction summary | www.a3pallet.com', 165, top + 29);

    const metaX = LETTER_WIDTH - MARGIN;
    setText(doc, CHARCOAL);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(`DOCUMENT #${documentId}`, metaX, top + 7, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    setText(doc, MUTED);
    doc.text(`Generated ${formatDate(generatedDate)}`, metaX, top + 19, { align: 'right' });
    doc.text(`Heat treated: ${specs.ht}`, metaX, top + 31, { align: 'right' });

    setDraw(doc, GREEN);
    doc.setLineWidth(2.2);
    doc.line(MARGIN, top + 44, LETTER_WIDTH - MARGIN, top + 44);
}

function drawSummaryBand(doc: jsPDF, specs: PalletPdfSpecs, y: number) {
    setFill(doc, GREEN);
    doc.roundedRect(MARGIN, y, LETTER_WIDTH - MARGIN * 2, 39, 4, 4, 'F');
    setText(doc, WHITE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text(
        `${fmt(specs.length)}\" L  x  ${fmt(specs.width)}\" W  x  ${fmt(specs.overallHeight)}\" H`,
        MARGIN + 14,
        y + 18,
    );
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`${specs.palletType} pallet`, MARGIN + 14, y + 31);
    doc.text(`${specs.woodType} lumber`, MARGIN + 178, y + 31);
    doc.text('All dimensions in inches', LETTER_WIDTH - MARGIN - 14, y + 31, { align: 'right' });
}

function drawFooter(doc: jsPDF) {
    const y = 754;
    setDraw(doc, RULE);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y, LETTER_WIDTH - MARGIN, y);
    setText(doc, MUTED);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.25);
    const note = '*Volume-ratio estimate based on 48 x 40 x 5 in standard pallet = 616. Actual capacity varies by trailer, loading pattern, securement, carrier, and axle/payload limits.';
    const lines = doc.splitTextToSize(note, 475) as string[];
    doc.text(lines, MARGIN, y + 11, { lineHeightFactor: 1.2 });
    setText(doc, GREEN);
    doc.setFont('helvetica', 'bold');
    doc.text('A3 PALLET', LETTER_WIDTH - MARGIN, y + 11, { align: 'right' });
    setText(doc, MUTED);
    doc.setFont('helvetica', 'normal');
    doc.text('Specification estimates require engineering validation.', LETTER_WIDTH - MARGIN, y + 21, { align: 'right' });
}

export async function generatePalletSpecPdfDataUrl(
    specs: PalletPdfSpecs,
    options: PalletSpecPdfOptions = {},
): Promise<string> {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
    const generatedDate = options.generatedDate ?? new Date();
    const documentId = options.documentId ?? makeDocumentId();
    const capacity = calculateDryVanCapacity(specs.length, specs.width, specs.overallHeight);
    const logoDataUrl = await loadLogoDataUrl(options.logoUrl ?? '/logo-a3-pallet.png');

    doc.setProperties({
        title: `A3 Pallet Custom Specification #${documentId}`,
        subject: `${fmt(specs.length)} x ${fmt(specs.width)} x ${fmt(specs.overallHeight)} pallet specification`,
        author: 'A3 Pallet',
        creator: 'A3 Pallet Custom Spec Builder',
        keywords: 'pallet, specification, drawing, logistics',
    });
    doc.setLineCap('round');
    doc.setLineJoin('round');

    drawHeader(doc, specs, documentId, generatedDate, logoDataUrl);
    drawSummaryBand(doc, specs, 82);
    drawIsometricView(doc, specs, MARGIN, 132, 364, 274);
    drawSidebar(doc, specs, capacity, 404, 132, 178, 274);

    const viewY = 418;
    const viewGap = 8;
    const viewWidth = (LETTER_WIDTH - MARGIN * 2 - viewGap * 2) / 3;
    drawPlanView(doc, specs, MARGIN, viewY, viewWidth, 151, 'top');
    drawPlanView(doc, specs, MARGIN + viewWidth + viewGap, viewY, viewWidth, 151, 'bottom');
    drawSideView(doc, specs, MARGIN + (viewWidth + viewGap) * 2, viewY, viewWidth, 151);

    drawComponentSchedule(doc, specs, MARGIN, 581, LETTER_WIDTH - MARGIN * 2, 154);
    drawFooter(doc);

    return doc.output('datauristring');
}
