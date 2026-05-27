const els = {
  viewer: document.querySelector("#viewerCanvas"),
  hist: document.querySelector("#histogramCanvas"),
  languageSelect: document.querySelector("#languageSelect"),
  fileInput: document.querySelector("#fileInput"),
  openFileButton: document.querySelector("#openFileButton"),
  demoButton: document.querySelector("#demoButton"),
  undoButton: document.querySelector("#undoButton"),
  exportExcelButton: document.querySelector("#exportExcelButton"),
  exportBandsOption: document.querySelector("#exportBandsOption"),
  exportRoisOption: document.querySelector("#exportRoisOption"),
  exportHistogramOption: document.querySelector("#exportHistogramOption"),
  exportMeasurementsOption: document.querySelector("#exportMeasurementsOption"),
  imageMeta: document.querySelector("#imageMeta"),
  emptyState: document.querySelector("#emptyState"),
  imageList: document.querySelector("#imageList"),
  toolButtons: [...document.querySelectorAll(".tool-button")],
  bandButtons: [...document.querySelectorAll(".segment")],
  bandLegend: document.querySelector("#bandLegend"),
  bandBars: document.querySelector("#bandBars"),
  roiList: document.querySelector("#roiList"),
  measureList: document.querySelector("#measureList"),
  deleteRoiButton: document.querySelector("#deleteRoiButton"),
  deleteMeasureButton: document.querySelector("#deleteMeasureButton"),
  circleRadius: document.querySelector("#circleRadius"),
  fixedCircle: document.querySelector("#fixedCircle"),
  pixelSpacing: document.querySelector("#pixelSpacing"),
  measureUnit: document.querySelector("#measureUnit"),
  metricImages: document.querySelector("#metricImages"),
  metricTotalRois: document.querySelector("#metricTotalRois"),
  metricPatientMean: document.querySelector("#metricPatientMean"),
  metricPatientPixels: document.querySelector("#metricPatientPixels"),
  metricRoi: document.querySelector("#metricRoi"),
  metricPixels: document.querySelector("#metricPixels"),
  metricMean: document.querySelector("#metricMean"),
  metricMedian: document.querySelector("#metricMedian"),
  metricSd: document.querySelector("#metricSd"),
  metricRange: document.querySelector("#metricRange"),
};

const ctx = els.viewer.getContext("2d", { willReadFrequently: false });
const histCtx = els.hist.getContext("2d");

const roiColors = ["#0f766e", "#d97706", "#2563eb", "#9333ea", "#be123c", "#4d7c0f"];
const measureColors = ["#2563eb", "#d97706", "#9333ea", "#be123c", "#4d7c0f", "#0f766e"];
const bandColors = ["#144b5a", "#0f766e", "#d97706", "#c2410c", "#7f1d1d", "#4338ca", "#7c3aed", "#be185d", "#475569", "#111827", "#0891b2"];

const i18n = {
  pt: {
    openImage: "Abrir imagem",
    undo: "Desfazer",
    selectEdit: "Selecionar, mover e editar",
    exportExcel: "Excel",
    exportOptions: "Exportar",
    exportBands: "Bandas EI",
    exportRois: "ROIs",
    exportHistogram: "Histograma 0-255",
    exportMeasurements: "Medidas",
    images: "Imagens",
    noImages: "Sem imagens",
    navigation: "Navegação",
    roiTools: "Ferramentas de ROI",
    measureTools: "Ferramentas de medida",
    radiusPx: "Raio px",
    fixedCircle: "Círculo com raio fixo",
    scale: "Escala mm/px",
    unit: "Unidade",
    eiBands: "Bandas EI",
    noRois: "Sem ROIs",
    deleteRoi: "Excluir ROI",
    measurements: "Medidas",
    noMeasurements: "Sem medidas",
    deleteMeasure: "Excluir medida",
    emptyTitle: "Abra uma imagem de ultrassom",
    emptySubtitle: "PNG, JPEG, WebP, BMP ou DICOM não comprimido.",
    patient: "Paciente",
    meanEi: "EI média",
    result: "Resultado",
    median: "Mediana",
    sd: "DP",
    histogram: "Histograma",
    percentages: "Percentuais",
    noSelectedRoi: "Sem ROI selecionada",
    noImageLoaded: "Nenhuma imagem carregada",
    imageLoadError: "Alguns arquivos não abriram",
    fileReadFail: "falha ao ler arquivo",
    unsupportedImage: "formato de imagem não suportado pelo navegador",
    roi: "ROI",
    measurement: "Medida",
    distance: "distância",
    rectArea: "área retangular",
    circleArea: "área circular",
    ellipseArea: "área elipsoide",
    freeArea: "área livre",
    angle: "ângulo",
  },
  en: {
    openImage: "Open image",
    undo: "Undo",
    selectEdit: "Select, move, and edit",
    exportExcel: "Excel",
    exportOptions: "Export",
    exportBands: "EI bands",
    exportRois: "ROIs",
    exportHistogram: "Histogram 0-255",
    exportMeasurements: "Measurements",
    images: "Images",
    noImages: "No images",
    navigation: "Navigation",
    roiTools: "ROI tools",
    measureTools: "Measurement tools",
    radiusPx: "Radius px",
    fixedCircle: "Fixed-radius circle",
    scale: "Scale mm/px",
    unit: "Unit",
    eiBands: "EI bands",
    noRois: "No ROIs",
    deleteRoi: "Delete ROI",
    measurements: "Measurements",
    noMeasurements: "No measurements",
    deleteMeasure: "Delete measurement",
    emptyTitle: "Open an ultrasound image",
    emptySubtitle: "PNG, JPEG, WebP, BMP or uncompressed DICOM.",
    patient: "Patient",
    meanEi: "Mean EI",
    result: "Result",
    median: "Median",
    sd: "SD",
    histogram: "Histogram",
    percentages: "Percentages",
    noSelectedRoi: "No ROI selected",
    noImageLoaded: "No image loaded",
    imageLoadError: "Some files could not be opened",
    fileReadFail: "failed to read file",
    unsupportedImage: "image format not supported by the browser",
    roi: "ROI",
    measurement: "Measurement",
    distance: "distance",
    rectArea: "rectangular area",
    circleArea: "circular area",
    ellipseArea: "ellipsoid area",
    freeArea: "free area",
    angle: "angle",
  },
  es: {
    openImage: "Abrir imagen",
    undo: "Deshacer",
    selectEdit: "Seleccionar, mover y editar",
    exportExcel: "Excel",
    exportOptions: "Exportar",
    exportBands: "Bandas EI",
    exportRois: "ROIs",
    exportHistogram: "Histograma 0-255",
    exportMeasurements: "Medidas",
    images: "Imágenes",
    noImages: "Sin imágenes",
    navigation: "Navegación",
    roiTools: "Herramientas ROI",
    measureTools: "Herramientas de medida",
    radiusPx: "Radio px",
    fixedCircle: "Círculo con radio fijo",
    scale: "Escala mm/px",
    unit: "Unidad",
    eiBands: "Bandas EI",
    noRois: "Sin ROIs",
    deleteRoi: "Eliminar ROI",
    measurements: "Medidas",
    noMeasurements: "Sin medidas",
    deleteMeasure: "Eliminar medida",
    emptyTitle: "Abra una imagen de ultrasonido",
    emptySubtitle: "PNG, JPEG, WebP, BMP o DICOM no comprimido.",
    patient: "Paciente",
    meanEi: "EI media",
    result: "Resultado",
    median: "Mediana",
    sd: "DE",
    histogram: "Histograma",
    percentages: "Porcentajes",
    noSelectedRoi: "Sin ROI seleccionada",
    noImageLoaded: "Ninguna imagen cargada",
    imageLoadError: "Algunos archivos no se pudieron abrir",
    fileReadFail: "fallo al leer archivo",
    unsupportedImage: "formato de imagen no soportado por el navegador",
    roi: "ROI",
    measurement: "Medida",
    distance: "distancia",
    rectArea: "área rectangular",
    circleArea: "área circular",
    ellipseArea: "área elipsoide",
    freeArea: "área libre",
    angle: "ángulo",
  },
};

const state = {
  images: [],
  activeImageId: null,
  image: null,
  gray: null,
  rois: [],
  measurements: [],
  selectedId: null,
  selectedMeasureId: null,
  activeTool: "pan",
  language: "pt",
  measureUnit: "px",
  pixelSpacingMm: 1,
  bandMode: 50,
  view: { scale: 1, x: 0, y: 0 },
  drawing: null,
  angleDraft: null,
  editing: null,
  undoStack: [],
  pointer: null,
};

function t(key) {
  return i18n[state.language]?.[key] || i18n.pt[key] || key;
}

function bandsForMode(mode) {
  const step = Number(mode);
  if (step === 50) {
    return [
      { start: 0, end: 50 },
      { start: 51, end: 100 },
      { start: 101, end: 150 },
      { start: 151, end: 200 },
      { start: 201, end: 255 },
    ];
  }

  const bands = [];
  let start = 0;
  while (start <= 255) {
    const end = Math.min(255, start === 0 ? step : start + step - 1);
    bands.push({ start, end });
    start = end + 1;
  }
  return bands;
}

function formatNumber(value, digits = 1) {
  if (!Number.isFinite(value)) return "-";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatInteger(value) {
  if (!Number.isFinite(value)) return "-";
  return Math.round(value).toLocaleString("pt-BR");
}

function syncActiveImage() {
  const image = state.images.find((item) => item.id === state.activeImageId) || null;
  state.image = image;
  state.gray = image?.gray || null;
  state.rois = image?.rois || [];
  state.measurements = image?.measurements || [];
  state.selectedId = image?.selectedId || null;
  state.selectedMeasureId = image?.selectedMeasureId || null;
}

function setActiveImage(id, shouldFit = true) {
  if (state.image) state.image.selectedId = state.selectedId;
  if (state.image) state.image.selectedMeasureId = state.selectedMeasureId;
  state.activeImageId = id;
  syncActiveImage();
  state.drawing = null;
  state.angleDraft = null;
  state.pointer = null;
  if (shouldFit) fitImage();
  updateUi();
  draw();
}

function applyTranslations() {
  document.documentElement.lang = state.language === "pt" ? "pt-BR" : state.language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.title = t(node.dataset.i18nTitle);
  });
}

function allMeasurements() {
  return state.images.flatMap((image) =>
    image.measurements.map((measurement) => ({
      image,
      measurement,
    })),
  );
}

function allRois() {
  return state.images.flatMap((image) =>
    image.rois.map((roi) => ({
      image,
      roi,
    })),
  );
}

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value));
}

function snapshotState() {
  return {
    activeImageId: state.activeImageId,
    selectedId: state.selectedId,
    selectedMeasureId: state.selectedMeasureId,
    images: state.images.map((image) => ({
      id: image.id,
      rois: clonePlain(image.rois),
      measurements: clonePlain(image.measurements),
      selectedId: image.selectedId,
      selectedMeasureId: image.selectedMeasureId,
    })),
  };
}

function pushUndo() {
  state.undoStack.push(snapshotState());
  if (state.undoStack.length > 80) state.undoStack.shift();
  updateUndoButton();
}

function restoreSnapshot(snapshot) {
  const snapshotIds = new Set(snapshot.images.map((image) => image.id));
  state.images = state.images.filter((image) => snapshotIds.has(image.id));
  snapshot.images.forEach((saved) => {
    const image = state.images.find((item) => item.id === saved.id);
    if (!image) return;
    image.rois = clonePlain(saved.rois);
    image.measurements = clonePlain(saved.measurements);
    image.selectedId = saved.selectedId;
    image.selectedMeasureId = saved.selectedMeasureId;
  });
  state.activeImageId = snapshot.activeImageId;
  syncActiveImage();
  state.selectedId = snapshot.selectedId;
  state.selectedMeasureId = snapshot.selectedMeasureId;
  if (state.image) {
    state.image.selectedId = state.selectedId;
    state.image.selectedMeasureId = state.selectedMeasureId;
  }
  state.drawing = null;
  state.editing = null;
  state.angleDraft = null;
  updateUi();
  draw();
}

function undoLast() {
  const snapshot = state.undoStack.pop();
  if (!snapshot) return;
  restoreSnapshot(snapshot);
  updateUndoButton();
}

function updateUndoButton() {
  if (els.undoButton) els.undoButton.disabled = state.undoStack.length === 0;
}

function resizeViewer() {
  const rect = els.viewer.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  els.viewer.width = Math.max(1, Math.floor(rect.width * dpr));
  els.viewer.height = Math.max(1, Math.floor(rect.height * dpr));
  els.viewer.style.width = `${rect.width}px`;
  els.viewer.style.height = `${rect.height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw();
}

function fitImage() {
  if (!state.image) return;
  const rect = els.viewer.getBoundingClientRect();
  const scale = Math.min(rect.width / state.image.width, rect.height / state.image.height) * 0.92;
  state.view.scale = Math.max(0.05, scale);
  state.view.x = (rect.width - state.image.width * state.view.scale) / 2;
  state.view.y = (rect.height - state.image.height * state.view.scale) / 2;
}

function screenToImage(point) {
  return {
    x: (point.x - state.view.x) / state.view.scale,
    y: (point.y - state.view.y) / state.view.scale,
  };
}

function imageToScreen(point) {
  return {
    x: point.x * state.view.scale + state.view.x,
    y: point.y * state.view.scale + state.view.y,
  };
}

function pointerPoint(event) {
  const rect = els.viewer.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function draw() {
  const rect = els.viewer.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);

  if (!state.image) return;

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.translate(state.view.x, state.view.y);
  ctx.scale(state.view.scale, state.view.scale);
  ctx.drawImage(state.image.canvas, 0, 0);
  state.rois.filter((roi) => roi.id !== state.selectedId).forEach((roi) => drawRoi(roi));
  state.measurements.forEach((measurement) => {
    const selected = measurement.id === state.selectedMeasureId;
    drawMeasurement(measurement, selected);
    if (selected && isEditableShape("measurement", measurement)) drawSelectionHandles("measurement", measurement);
  });
  const roi = selectedRoi();
  if (roi) {
    drawRoi(roi, true);
    if (isEditableShape("roi", roi)) drawSelectionHandles("roi", roi);
  }
  if (state.drawing && state.drawing.roi) drawRoi(state.drawing.roi, true, true);
  if (state.drawing && state.drawing.measurement) drawMeasurement(state.drawing.measurement, true, true);
  if (state.angleDraft) drawAngleDraft();
  ctx.restore();
}

function drawSelectionHandles(kind, shape) {
  const handles = shapeHandles(kind, shape);
  const size = Math.max(5 / state.view.scale, 2.5);
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 1.5 / state.view.scale;
  handles.forEach((handle) => {
    ctx.beginPath();
    ctx.rect(handle.x - size, handle.y - size, size * 2, size * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
}

function drawRoi(roi, selected = false, draft = false) {
  ctx.save();
  ctx.lineWidth = (draft ? 1 : selected ? 3 : 2) / state.view.scale;
  ctx.strokeStyle = roi.color;
  ctx.fillStyle = `${roi.color}${draft ? "18" : "00"}`;
  ctx.setLineDash(draft ? [3 / state.view.scale, 3 / state.view.scale] : []);

  ctx.beginPath();
  if (roi.type === "rect") {
    const x = Math.min(roi.x, roi.x + roi.w);
    const y = Math.min(roi.y, roi.y + roi.h);
    ctx.rect(x, y, Math.abs(roi.w), Math.abs(roi.h));
  } else if (roi.type === "circle") {
    ctx.arc(roi.cx, roi.cy, Math.max(0, roi.r), 0, Math.PI * 2);
  } else if (roi.type === "ellipse") {
    const cx = roi.x + roi.w / 2;
    const cy = roi.y + roi.h / 2;
    ctx.ellipse(cx, cy, Math.abs(roi.w / 2), Math.abs(roi.h / 2), 0, 0, Math.PI * 2);
  } else if (roi.type === "freehand" && roi.points.length > 1) {
    ctx.moveTo(roi.points[0].x, roi.points[0].y);
    roi.points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();
  }
  if (draft) ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawMeasurement(measurement, selected = false, draft = false) {
  ctx.save();
  ctx.lineWidth = (draft ? 1 : selected ? 3 : 2) / state.view.scale;
  ctx.strokeStyle = measurement.color;
  ctx.fillStyle = `${measurement.color}18`;
  ctx.setLineDash(draft ? [3 / state.view.scale, 3 / state.view.scale] : []);
  ctx.beginPath();

  if (measurement.type === "distance") {
    ctx.moveTo(measurement.p1.x, measurement.p1.y);
    ctx.lineTo(measurement.p2.x, measurement.p2.y);
  } else if (measurement.type === "angle") {
    ctx.moveTo(measurement.p1.x, measurement.p1.y);
    ctx.lineTo(measurement.vertex.x, measurement.vertex.y);
    ctx.lineTo(measurement.p2.x, measurement.p2.y);
  } else if (measurement.type === "area-rect") {
    const x = Math.min(measurement.x, measurement.x + measurement.w);
    const y = Math.min(measurement.y, measurement.y + measurement.h);
    ctx.rect(x, y, Math.abs(measurement.w), Math.abs(measurement.h));
  } else if (measurement.type === "area-circle") {
    ctx.arc(measurement.cx, measurement.cy, Math.max(0, measurement.r), 0, Math.PI * 2);
  } else if (measurement.type === "area-ellipse") {
    const cx = measurement.x + measurement.w / 2;
    const cy = measurement.y + measurement.h / 2;
    ctx.ellipse(cx, cy, Math.abs(measurement.w / 2), Math.abs(measurement.h / 2), 0, 0, Math.PI * 2);
  } else if (measurement.type === "area-free" && measurement.points.length > 1) {
    ctx.moveTo(measurement.points[0].x, measurement.points[0].y);
    measurement.points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();
  }

  if (measurement.type.startsWith("area-")) ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawAngleDraft() {
  const points = [...state.angleDraft.points];
  if (state.pointer?.image) points.push(state.pointer.image);
  if (points.length < 2) return;
  drawMeasurement(
    {
      type: points.length >= 3 ? "angle" : "distance",
      p1: points[0],
      vertex: points[1],
      p2: points[2] || points[1],
      color: measureColors[state.measurements.length % measureColors.length],
    },
    true,
    true,
  );
}

async function handleFiles(files) {
  const failures = [];
  let firstNewImageId = null;

  for (const file of files) {
    try {
      const lowerName = file.name.toLowerCase();
      const canvas =
        lowerName.endsWith(".dcm") || lowerName.endsWith(".dicom")
          ? await loadDicomCanvas(file)
          : await loadRasterCanvas(file);
      const image = addImageFromCanvas(canvas, file.name, lowerName.endsWith(".dcm") || lowerName.endsWith(".dicom") ? "dicom" : "image");
      if (!firstNewImageId) firstNewImageId = image.id;
    } catch (error) {
      failures.push(`${file.name}: ${error.message}`);
    }
  }

  if (firstNewImageId) setActiveImage(firstNewImageId);
  if (failures.length) window.alert(`${t("imageLoadError")}:\n\n${failures.join("\n")}`);
}

function loadRasterCanvas(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(t("fileReadFail")));
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const imageCtx = canvas.getContext("2d", { willReadFrequently: true });
        imageCtx.drawImage(image, 0, 0);
        resolve(canvas);
      };
      image.onerror = () => reject(new Error(t("unsupportedImage")));
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function loadDicomCanvas(file) {
  const buffer = await file.arrayBuffer();
  return parseDicomToCanvas(buffer);
}

function addImageFromCanvas(canvas, name, source = "image") {
  const imageCtx = canvas.getContext("2d", { willReadFrequently: true });
  const data = imageCtx.getImageData(0, 0, canvas.width, canvas.height).data;
  const gray = new Uint8Array(canvas.width * canvas.height);

  for (let i = 0, j = 0; i < data.length; i += 4, j += 1) {
    gray[j] = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
  }

  const image = {
    id: `img_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    canvas,
    name,
    source,
    width: canvas.width,
    height: canvas.height,
    gray,
    rois: [],
    measurements: [],
    selectedId: null,
    selectedMeasureId: null,
  };
  state.images.push(image);
  return image;
}

function setImageFromCanvas(canvas, name) {
  const image = addImageFromCanvas(canvas, name);
  setActiveImage(image.id);
}

function loadDemoImage() {
  const canvas = document.createElement("canvas");
  canvas.width = 760;
  canvas.height = 460;
  const demoCtx = canvas.getContext("2d");
  const image = demoCtx.createImageData(canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const i = (y * canvas.width + x) * 4;
      const depth = y / canvas.height;
      const beam = 1 - Math.abs(x / canvas.width - 0.5) * 0.35;
      const texture =
        Math.sin(x * 0.16 + y * 0.08) * 16 +
        Math.sin(x * 0.04 - y * 0.11) * 13 +
        seededNoise(x, y) * 38;
      const fascicle = Math.sin((x + y * 1.8) * 0.045) > 0.78 ? 34 : 0;
      const ellipse = ((x - 380) / 285) ** 2 + ((y - 250) / 125) ** 2;
      const muscleBoost = ellipse < 1 ? 30 : -35;
      const value = clamp(46 + depth * 46 + beam * 24 + texture + fascicle + muscleBoost, 0, 255);
      image.data[i] = value;
      image.data[i + 1] = value;
      image.data[i + 2] = value;
      image.data[i + 3] = 255;
    }
  }

  demoCtx.putImageData(image, 0, 0);
  demoCtx.strokeStyle = "rgba(255,255,255,0.62)";
  demoCtx.lineWidth = 2;
  demoCtx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
  setImageFromCanvas(canvas, "demo-ultrassom.png");

  const roi = createRoi("circle", { cx: 382, cy: 252, r: 82 });
  roi.label = "Demo ROI";
  finishRoi(roi);
}

function seededNoise(x, y) {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return value - Math.floor(value) - 0.5;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function parseDicomToCanvas(buffer) {
  const view = new DataView(buffer);
  const textDecoder = new TextDecoder("ascii");
  const tags = new Map();
  const hasPreamble = buffer.byteLength > 132 && textDecoder.decode(new Uint8Array(buffer, 128, 4)) === "DICM";
  let offset = hasPreamble ? 132 : 0;
  let transferSyntax = "1.2.840.10008.1.2.1";

  while (offset + 8 <= buffer.byteLength) {
    const element = readExplicitElement(view, buffer, offset, true);
    if (!element || element.group !== 0x0002) break;
    tags.set(tagKey(element.group, element.element), element);
    if (element.group === 0x0002 && element.element === 0x0010) {
      transferSyntax = element.text.replace(/\0/g, "").trim();
    }
    offset = element.nextOffset;
  }

  const explicit = transferSyntax !== "1.2.840.10008.1.2";
  const littleEndian = transferSyntax !== "1.2.840.10008.1.2.2";
  if (!littleEndian) throw new Error("DICOM big-endian ainda não suportado neste protótipo");
  if (!["1.2.840.10008.1.2", "1.2.840.10008.1.2.1", "1.2.840.10008.1.2.1.99"].includes(transferSyntax)) {
    throw new Error("DICOM comprimido ou transfer syntax não suportado");
  }

  let pixelElement = null;
  while (offset + 8 <= buffer.byteLength) {
    const element = explicit
      ? readExplicitElement(view, buffer, offset, littleEndian)
      : readImplicitElement(view, buffer, offset, littleEndian);
    if (!element) break;
    if (element.group === 0x7fe0 && element.element === 0x0010) {
      pixelElement = element;
      break;
    }
    tags.set(tagKey(element.group, element.element), element);
    offset = element.nextOffset;
  }

  if (!pixelElement) throw new Error("pixel data não encontrado");
  if (pixelElement.length === 0xffffffff) throw new Error("DICOM encapsulado/comprimido não suportado");

  const rows = numberTag(tags, 0x0028, 0x0010);
  const columns = numberTag(tags, 0x0028, 0x0011);
  const bitsAllocated = numberTag(tags, 0x0028, 0x0100) || 8;
  const pixelRepresentation = numberTag(tags, 0x0028, 0x0103) || 0;
  const samplesPerPixel = numberTag(tags, 0x0028, 0x0002) || 1;
  const photometric = stringTag(tags, 0x0028, 0x0004).toUpperCase();
  const windowCenter = decimalTag(tags, 0x0028, 0x1050);
  const windowWidth = decimalTag(tags, 0x0028, 0x1051);
  const slope = decimalTag(tags, 0x0028, 0x1053) || 1;
  const intercept = decimalTag(tags, 0x0028, 0x1052) || 0;

  if (!rows || !columns) throw new Error("linhas/colunas DICOM ausentes");
  if (samplesPerPixel !== 1) throw new Error("somente DICOM monocromático é suportado agora");
  if (![8, 16].includes(bitsAllocated)) throw new Error("bits allocated DICOM não suportado");

  const raw = new Float32Array(rows * columns);
  let min = Infinity;
  let max = -Infinity;
  const pixelOffset = pixelElement.valueOffset;

  for (let i = 0; i < raw.length; i += 1) {
    let value;
    if (bitsAllocated === 8) {
      value = new Uint8Array(buffer, pixelOffset + i, 1)[0];
    } else if (pixelRepresentation === 1) {
      value = view.getInt16(pixelOffset + i * 2, true);
    } else {
      value = view.getUint16(pixelOffset + i * 2, true);
    }
    value = value * slope + intercept;
    raw[i] = value;
    if (value < min) min = value;
    if (value > max) max = value;
  }

  let low = min;
  let high = max;
  if (Number.isFinite(windowCenter) && Number.isFinite(windowWidth) && windowWidth > 1) {
    low = windowCenter - windowWidth / 2;
    high = windowCenter + windowWidth / 2;
  }

  const invert = photometric === "MONOCHROME1";
  const canvas = document.createElement("canvas");
  canvas.width = columns;
  canvas.height = rows;
  const canvasCtx = canvas.getContext("2d");
  const image = canvasCtx.createImageData(columns, rows);
  const range = Math.max(1, high - low);

  for (let i = 0; i < raw.length; i += 1) {
    let value = Math.round(((raw[i] - low) / range) * 255);
    value = clamp(value, 0, 255);
    if (invert) value = 255 - value;
    const j = i * 4;
    image.data[j] = value;
    image.data[j + 1] = value;
    image.data[j + 2] = value;
    image.data[j + 3] = 255;
  }

  canvasCtx.putImageData(image, 0, 0);
  return canvas;
}

function readExplicitElement(view, buffer, offset, littleEndian) {
  if (offset + 8 > buffer.byteLength) return null;
  const group = view.getUint16(offset, littleEndian);
  const element = view.getUint16(offset + 2, littleEndian);
  const vr = new TextDecoder("ascii").decode(new Uint8Array(buffer, offset + 4, 2));
  const longVr = ["OB", "OD", "OF", "OL", "OW", "SQ", "UC", "UR", "UT", "UN"].includes(vr);
  const length = longVr ? view.getUint32(offset + 8, littleEndian) : view.getUint16(offset + 6, littleEndian);
  const valueOffset = offset + (longVr ? 12 : 8);
  return elementRecord(group, element, vr, length, valueOffset, buffer, littleEndian);
}

function readImplicitElement(view, buffer, offset, littleEndian) {
  if (offset + 8 > buffer.byteLength) return null;
  const group = view.getUint16(offset, littleEndian);
  const element = view.getUint16(offset + 2, littleEndian);
  const length = view.getUint32(offset + 4, littleEndian);
  return elementRecord(group, element, "UN", length, offset + 8, buffer, littleEndian);
}

function elementRecord(group, element, vr, length, valueOffset, buffer, littleEndian) {
  const safeLength = length === 0xffffffff ? 0 : length;
  const nextOffset = valueOffset + safeLength + (safeLength % 2);
  if (nextOffset > buffer.byteLength && length !== 0xffffffff) return null;
  const bytes = safeLength ? new Uint8Array(buffer, valueOffset, safeLength) : new Uint8Array();
  return {
    group,
    element,
    vr,
    length,
    valueOffset,
    nextOffset,
    bytes,
    littleEndian,
    text: bytes.length ? new TextDecoder("ascii").decode(bytes) : "",
  };
}

function tagKey(group, element) {
  return `${group.toString(16).padStart(4, "0")},${element.toString(16).padStart(4, "0")}`;
}

function tag(tags, group, element) {
  return tags.get(tagKey(group, element));
}

function stringTag(tags, group, element) {
  return tag(tags, group, element)?.text.replace(/\0/g, "").trim() || "";
}

function decimalTag(tags, group, element) {
  const first = stringTag(tags, group, element).split("\\")[0];
  const value = Number.parseFloat(first);
  return Number.isFinite(value) ? value : null;
}

function numberTag(tags, group, element) {
  const item = tag(tags, group, element);
  if (!item) return null;
  const binaryNumberTags = new Set([
    tagKey(0x0028, 0x0002),
    tagKey(0x0028, 0x0010),
    tagKey(0x0028, 0x0011),
    tagKey(0x0028, 0x0100),
    tagKey(0x0028, 0x0101),
    tagKey(0x0028, 0x0103),
  ]);
  if ((["US", "SS"].includes(item.vr) || binaryNumberTags.has(tagKey(group, element))) && item.bytes.length >= 2) {
    return item.vr === "SS" || tagKey(group, element) === tagKey(0x0028, 0x0103)
      ? new DataView(item.bytes.buffer, item.bytes.byteOffset, item.bytes.byteLength).getInt16(0, item.littleEndian)
      : new DataView(item.bytes.buffer, item.bytes.byteOffset, item.bytes.byteLength).getUint16(0, item.littleEndian);
  }
  const numeric = Number.parseInt(item.text, 10);
  return Number.isFinite(numeric) ? numeric : null;
}

function updateAllAnalyses() {
  state.images.forEach((image) => {
    image.rois.forEach((roi) => {
      roi.analysis = analyzeRoi(roi, image);
    });
  });
}

function analyzeRoi(roi, image = state.image) {
  if (!image || !image.gray) return null;

  // Measurements always read the original grayscale buffer, never the overlay canvas.
  const { width, height, gray } = image;
  const hist = new Uint32Array(256);
  const bounds = boundsForRoi(roi, width, height);

  for (let y = bounds.y0; y <= bounds.y1; y += 1) {
    for (let x = bounds.x0; x <= bounds.x1; x += 1) {
      if (!containsPixel(roi, x + 0.5, y + 0.5)) continue;
      hist[gray[y * width + x]] += 1;
    }
  }

  let total = 0;
  let weighted = 0;
  let min = null;
  let max = null;

  for (let i = 0; i < hist.length; i += 1) {
    const count = hist[i];
    if (!count) continue;
    total += count;
    weighted += i * count;
    if (min === null) min = i;
    max = i;
  }

  if (!total) {
    return { hist: [...hist], total: 0, mean: 0, median: 0, sd: 0, min: 0, max: 0, bands: [] };
  }

  const mean = weighted / total;
  let varianceSum = 0;
  for (let i = 0; i < hist.length; i += 1) {
    varianceSum += (i - mean) ** 2 * hist[i];
  }

  const medianTarget = total / 2;
  let cumulative = 0;
  let median = 0;
  for (let i = 0; i < hist.length; i += 1) {
    cumulative += hist[i];
    if (cumulative >= medianTarget) {
      median = i;
      break;
    }
  }

  return {
    hist: [...hist],
    total,
    mean,
    median,
    sd: Math.sqrt(varianceSum / total),
    min,
    max,
    bands: summarizeBands(hist, total),
  };
}

function summarizeBands(hist, total) {
  return bandsForMode(state.bandMode).map((band, index) => {
    let pixels = 0;
    for (let i = band.start; i <= band.end; i += 1) pixels += hist[i];
    return {
      ...band,
      label: `${band.start}-${band.end}`,
      pixels,
      percent: total ? (pixels / total) * 100 : 0,
      color: bandColors[index % bandColors.length],
    };
  });
}

function boundsForRoi(roi, width, height) {
  let x0 = 0;
  let y0 = 0;
  let x1 = width - 1;
  let y1 = height - 1;

  if (roi.type === "rect") {
    x0 = Math.floor(Math.min(roi.x, roi.x + roi.w));
    y0 = Math.floor(Math.min(roi.y, roi.y + roi.h));
    x1 = Math.ceil(Math.max(roi.x, roi.x + roi.w));
    y1 = Math.ceil(Math.max(roi.y, roi.y + roi.h));
  } else if (roi.type === "circle") {
    x0 = Math.floor(roi.cx - roi.r);
    y0 = Math.floor(roi.cy - roi.r);
    x1 = Math.ceil(roi.cx + roi.r);
    y1 = Math.ceil(roi.cy + roi.r);
  } else if (roi.type === "ellipse") {
    x0 = Math.floor(Math.min(roi.x, roi.x + roi.w));
    y0 = Math.floor(Math.min(roi.y, roi.y + roi.h));
    x1 = Math.ceil(Math.max(roi.x, roi.x + roi.w));
    y1 = Math.ceil(Math.max(roi.y, roi.y + roi.h));
  } else if (roi.type === "freehand") {
    const xs = roi.points.map((point) => point.x);
    const ys = roi.points.map((point) => point.y);
    x0 = Math.floor(Math.min(...xs));
    y0 = Math.floor(Math.min(...ys));
    x1 = Math.ceil(Math.max(...xs));
    y1 = Math.ceil(Math.max(...ys));
  }

  return {
    x0: Math.max(0, Math.min(width - 1, x0)),
    y0: Math.max(0, Math.min(height - 1, y0)),
    x1: Math.max(0, Math.min(width - 1, x1)),
    y1: Math.max(0, Math.min(height - 1, y1)),
  };
}

function containsPixel(roi, x, y) {
  if (roi.type === "rect") {
    const x0 = Math.min(roi.x, roi.x + roi.w);
    const x1 = Math.max(roi.x, roi.x + roi.w);
    const y0 = Math.min(roi.y, roi.y + roi.h);
    const y1 = Math.max(roi.y, roi.y + roi.h);
    return x >= x0 && x <= x1 && y >= y0 && y <= y1;
  }

  if (roi.type === "circle") {
    return (x - roi.cx) ** 2 + (y - roi.cy) ** 2 <= roi.r ** 2;
  }

  if (roi.type === "ellipse") {
    const cx = roi.x + roi.w / 2;
    const cy = roi.y + roi.h / 2;
    const rx = Math.abs(roi.w / 2);
    const ry = Math.abs(roi.h / 2);
    if (!rx || !ry) return false;
    return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
  }

  if (roi.type === "freehand") {
    return pointInPolygon(x, y, roi.points);
  }

  return false;
}

function pointInPolygon(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    const xi = points[i].x;
    const yi = points[i].y;
    const xj = points[j].x;
    const yj = points[j].y;
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function createRoi(type, geometry) {
  const id = `roi_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  return {
    id,
    type,
    label: `ROI ${state.rois.length + 1}`,
    color: roiColors[state.rois.length % roiColors.length],
    ...geometry,
  };
}

function createMeasurement(type, geometry) {
  const id = `measure_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  return {
    id,
    type,
    label: `${t("measurement")} ${state.measurements.length + 1}`,
    color: measureColors[state.measurements.length % measureColors.length],
    ...geometry,
  };
}

function finishRoi(roi) {
  if (!state.image || !roiHasArea(roi)) return;
  clampShapeToImage(roi);
  pushUndo();
  roi.analysis = analyzeRoi(roi);
  state.rois.push(roi);
  state.selectedId = roi.id;
  state.image.selectedId = roi.id;
  updateUi();
  draw();
}

function finishMeasurement(measurement) {
  if (!state.image || !measurementHasValue(measurement)) return;
  clampShapeToImage(measurement);
  pushUndo();
  state.measurements.push(measurement);
  state.selectedMeasureId = measurement.id;
  state.image.selectedMeasureId = measurement.id;
  updateUi();
  draw();
}

function roiHasArea(roi) {
  if (roi.type === "rect") return Math.abs(roi.w) >= 2 && Math.abs(roi.h) >= 2;
  if (roi.type === "circle") return roi.r >= 1;
  if (roi.type === "ellipse") return Math.abs(roi.w) >= 2 && Math.abs(roi.h) >= 2;
  if (roi.type === "freehand") return roi.points.length >= 3;
  return false;
}

function measurementHasValue(measurement) {
  if (measurement.type === "distance") return pointDistance(measurement.p1, measurement.p2) >= 2;
  if (measurement.type === "angle") return Boolean(measurement.p1 && measurement.vertex && measurement.p2);
  if (measurement.type === "area-rect") return Math.abs(measurement.w) >= 2 && Math.abs(measurement.h) >= 2;
  if (measurement.type === "area-circle") return measurement.r >= 1;
  if (measurement.type === "area-ellipse") return Math.abs(measurement.w) >= 2 && Math.abs(measurement.h) >= 2;
  if (measurement.type === "area-free") return measurement.points.length >= 3;
  return false;
}

function selectedRoi() {
  return state.rois.find((roi) => roi.id === state.selectedId) || null;
}

function selectedMeasurement() {
  return state.measurements.find((measurement) => measurement.id === state.selectedMeasureId) || null;
}

function pointDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clampPointToImage(point) {
  if (!state.image) return point;
  return {
    x: clamp(point.x, 0, state.image.width),
    y: clamp(point.y, 0, state.image.height),
  };
}

function polygonArea(points) {
  if (points.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

function angleDegrees(measurement) {
  const a = {
    x: measurement.p1.x - measurement.vertex.x,
    y: measurement.p1.y - measurement.vertex.y,
  };
  const b = {
    x: measurement.p2.x - measurement.vertex.x,
    y: measurement.p2.y - measurement.vertex.y,
  };
  const dot = a.x * b.x + a.y * b.y;
  const mag = Math.hypot(a.x, a.y) * Math.hypot(b.x, b.y);
  if (!mag) return 0;
  return (Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180) / Math.PI;
}

function measurementBaseValue(measurement) {
  if (measurement.type === "distance") return pointDistance(measurement.p1, measurement.p2);
  if (measurement.type === "angle") return angleDegrees(measurement);
  if (measurement.type === "area-rect") return Math.abs(measurement.w * measurement.h);
  if (measurement.type === "area-circle") return Math.PI * measurement.r ** 2;
  if (measurement.type === "area-ellipse") return Math.PI * Math.abs(measurement.w / 2) * Math.abs(measurement.h / 2);
  if (measurement.type === "area-free") return polygonArea(measurement.points);
  return 0;
}

function measurementDisplay(measurement) {
  const base = measurementBaseValue(measurement);
  if (measurement.type === "angle") {
    return { value: base, unit: "°", text: `${formatNumber(base, 2)}°`, base };
  }

  const isArea = measurement.type.startsWith("area-");
  const unit = state.measureUnit;
  let value = base;
  let suffix = isArea ? "px²" : "px";
  if (unit === "mm") {
    value = isArea ? base * state.pixelSpacingMm ** 2 : base * state.pixelSpacingMm;
    suffix = isArea ? "mm²" : "mm";
  } else if (unit === "cm") {
    value = isArea ? (base * state.pixelSpacingMm ** 2) / 100 : (base * state.pixelSpacingMm) / 10;
    suffix = isArea ? "cm²" : "cm";
  }
  return { value, unit: suffix, text: `${formatNumber(value, 2)} ${suffix}`, base };
}

function measurementTypeLabel(type) {
  const labels = {
    distance: t("distance"),
    "area-rect": t("rectArea"),
    "area-circle": t("circleArea"),
    "area-ellipse": t("ellipseArea"),
    "area-free": t("freeArea"),
    angle: t("angle"),
  };
  return labels[type] || type;
}

function isRoiTool(tool) {
  return ["rect", "circle", "ellipse", "freehand"].includes(tool);
}

function isMeasureTool(tool) {
  return ["measure-distance", "measure-rect", "measure-circle", "measure-ellipse", "measure-freehand", "measure-angle"].includes(tool);
}

function hasExcelExportData() {
  const hasRois = allRois().length > 0;
  const hasMeasures = allMeasurements().length > 0;
  return (
    (els.exportBandsOption.checked && hasRois) ||
    (els.exportRoisOption.checked && hasRois) ||
    (els.exportHistogramOption.checked && hasRois) ||
    (els.exportMeasurementsOption.checked && hasMeasures)
  );
}

function isEditableShape(kind, shape) {
  if (kind === "roi") return ["rect", "circle", "ellipse"].includes(shape.type);
  return ["area-rect", "area-circle", "area-ellipse"].includes(shape.type);
}

function shapeBounds(kind, shape) {
  if (shape.type === "rect" || shape.type === "ellipse" || shape.type === "area-rect" || shape.type === "area-ellipse") {
    const x0 = Math.min(shape.x, shape.x + shape.w);
    const y0 = Math.min(shape.y, shape.y + shape.h);
    const x1 = Math.max(shape.x, shape.x + shape.w);
    const y1 = Math.max(shape.y, shape.y + shape.h);
    return { x0, y0, x1, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0 };
  }
  if (shape.type === "circle" || shape.type === "area-circle") {
    return { x0: shape.cx - shape.r, y0: shape.cy - shape.r, x1: shape.cx + shape.r, y1: shape.cy + shape.r, cx: shape.cx, cy: shape.cy, w: shape.r * 2, h: shape.r * 2 };
  }
  return null;
}

function shapeHandles(kind, shape) {
  const bounds = shapeBounds(kind, shape);
  if (!bounds) return [];
  return [
    { name: "nw", x: bounds.x0, y: bounds.y0 },
    { name: "n", x: bounds.cx, y: bounds.y0 },
    { name: "ne", x: bounds.x1, y: bounds.y0 },
    { name: "e", x: bounds.x1, y: bounds.cy },
    { name: "se", x: bounds.x1, y: bounds.y1 },
    { name: "s", x: bounds.cx, y: bounds.y1 },
    { name: "sw", x: bounds.x0, y: bounds.y1 },
    { name: "w", x: bounds.x0, y: bounds.cy },
  ];
}

function hitSelectionHandle(point) {
  const tolerance = Math.max(8 / state.view.scale, 3);
  const candidates = selectedEditableShapes();
  for (const candidate of candidates) {
    const handles = shapeHandles(candidate.kind, candidate.shape);
    for (const handle of handles) {
      if (Math.abs(point.x - handle.x) <= tolerance && Math.abs(point.y - handle.y) <= tolerance) {
        return { ...candidate, handle: handle.name };
      }
    }
  }
  return null;
}

function selectedEditableShapes() {
  const shapes = [];
  const roi = selectedRoi();
  if (roi && isEditableShape("roi", roi)) shapes.push({ kind: "roi", shape: roi });
  const measurement = selectedMeasurement();
  if (measurement && isEditableShape("measurement", measurement)) shapes.push({ kind: "measurement", shape: measurement });
  return shapes;
}

function hitEditableShape(point) {
  const shapes = [
    ...state.measurements.map((shape) => ({ kind: "measurement", shape })).reverse(),
    ...state.rois.map((shape) => ({ kind: "roi", shape })).reverse(),
  ];
  return shapes.find((candidate) => isEditableShape(candidate.kind, candidate.shape) && containsEditableShape(candidate.kind, candidate.shape, point)) || null;
}

function containsEditableShape(kind, shape, point) {
  if (kind === "roi") return containsPixel(shape, point.x, point.y);
  if (shape.type === "area-rect") {
    const x0 = Math.min(shape.x, shape.x + shape.w);
    const x1 = Math.max(shape.x, shape.x + shape.w);
    const y0 = Math.min(shape.y, shape.y + shape.h);
    const y1 = Math.max(shape.y, shape.y + shape.h);
    return point.x >= x0 && point.x <= x1 && point.y >= y0 && point.y <= y1;
  }
  if (shape.type === "area-circle") {
    return (point.x - shape.cx) ** 2 + (point.y - shape.cy) ** 2 <= shape.r ** 2;
  }
  if (shape.type === "area-ellipse") {
    const cx = shape.x + shape.w / 2;
    const cy = shape.y + shape.h / 2;
    const rx = Math.abs(shape.w / 2);
    const ry = Math.abs(shape.h / 2);
    if (!rx || !ry) return false;
    return ((point.x - cx) / rx) ** 2 + ((point.y - cy) / ry) ** 2 <= 1;
  }
  return false;
}

function selectShape(kind, shape) {
  if (kind === "roi") {
    state.selectedId = shape.id;
    state.selectedMeasureId = null;
    if (state.image) {
      state.image.selectedId = state.selectedId;
      state.image.selectedMeasureId = null;
    }
  } else {
    state.selectedMeasureId = shape.id;
    state.selectedId = null;
    if (state.image) {
      state.image.selectedMeasureId = state.selectedMeasureId;
      state.image.selectedId = null;
    }
  }
}

function moveShape(shape, dx, dy) {
  if (shape.type === "rect" || shape.type === "ellipse" || shape.type === "area-rect" || shape.type === "area-ellipse") {
    shape.x += dx;
    shape.y += dy;
  } else if (shape.type === "circle" || shape.type === "area-circle") {
    shape.cx += dx;
    shape.cy += dy;
  }
  clampShapeToImage(shape);
}

function resizeShape(shape, handle, startPoint, currentPoint, original) {
  const current = clampPointToImage(currentPoint);
  if (shape.type === "circle" || shape.type === "area-circle") {
    shape.r = clamp(Math.hypot(current.x - original.cx, current.y - original.cy), 1, maxCircleRadius(original.cx, original.cy));
    clampShapeToImage(shape);
    return;
  }

  const bounds = shapeBounds(null, original);
  const next = { x0: bounds.x0, y0: bounds.y0, x1: bounds.x1, y1: bounds.y1 };
  if (handle.includes("w")) next.x0 = current.x;
  if (handle.includes("e")) next.x1 = current.x;
  if (handle.includes("n")) next.y0 = current.y;
  if (handle.includes("s")) next.y1 = current.y;
  if (handle === "n" || handle === "s") {
    next.x0 = bounds.x0;
    next.x1 = bounds.x1;
  }
  if (handle === "e" || handle === "w") {
    next.y0 = bounds.y0;
    next.y1 = bounds.y1;
  }
  applyBoundedRectGeometry(shape, next);
}

function maxCircleRadius(cx, cy) {
  if (!state.image) return Number.POSITIVE_INFINITY;
  return Math.max(1, Math.min(cx, cy, state.image.width - cx, state.image.height - cy));
}

function applyBoundedRectGeometry(shape, bounds) {
  const maxX = state.image?.width ?? Number.POSITIVE_INFINITY;
  const maxY = state.image?.height ?? Number.POSITIVE_INFINITY;
  let x0 = clamp(Math.min(bounds.x0, bounds.x1), 0, maxX);
  let x1 = clamp(Math.max(bounds.x0, bounds.x1), 0, maxX);
  let y0 = clamp(Math.min(bounds.y0, bounds.y1), 0, maxY);
  let y1 = clamp(Math.max(bounds.y0, bounds.y1), 0, maxY);

  if (x1 - x0 < 1) {
    x1 = clamp(x0 + 1, 0, maxX);
    x0 = clamp(x1 - 1, 0, maxX);
  }
  if (y1 - y0 < 1) {
    y1 = clamp(y0 + 1, 0, maxY);
    y0 = clamp(y1 - 1, 0, maxY);
  }

  shape.x = x0;
  shape.y = y0;
  shape.w = x1 - x0;
  shape.h = y1 - y0;
}

function clampShapeToImage(shape) {
  if (!state.image) return;
  const maxX = state.image.width;
  const maxY = state.image.height;
  if (shape.type === "rect" || shape.type === "ellipse" || shape.type === "area-rect" || shape.type === "area-ellipse") {
    const bounds = shapeBounds(null, shape);
    const width = Math.min(bounds.w, maxX);
    const height = Math.min(bounds.h, maxY);
    const x0 = clamp(bounds.x0, 0, Math.max(0, maxX - width));
    const y0 = clamp(bounds.y0, 0, Math.max(0, maxY - height));
    shape.x = x0;
    shape.y = y0;
    shape.w = width;
    shape.h = height;
  } else if (shape.type === "circle" || shape.type === "area-circle") {
    shape.r = Math.min(shape.r, Math.max(1, Math.min(maxX, maxY) / 2));
    shape.cx = clamp(shape.cx, shape.r, maxX - shape.r);
    shape.cy = clamp(shape.cy, shape.r, maxY - shape.r);
  }
}

function refreshEditedShape(kind, shape) {
  if (kind === "roi") shape.analysis = analyzeRoi(shape);
}

function updateUi() {
  applyTranslations();
  els.emptyState.classList.toggle("hidden", Boolean(state.image));
  els.imageMeta.textContent = state.image
    ? `${state.image.name} · ${state.image.width} x ${state.image.height}px · ${state.images.length} imagem(ns)`
    : `${t("noImageLoaded")} · GUST`;
  els.exportExcelButton.disabled = !hasExcelExportData();
  els.deleteRoiButton.disabled = !selectedRoi();
  els.deleteMeasureButton.disabled = !selectedMeasurement();
  updateUndoButton();
  els.languageSelect.value = state.language;
  els.measureUnit.value = state.measureUnit;
  els.pixelSpacing.value = state.pixelSpacingMm;

  els.toolButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tool === state.activeTool);
  });
  els.viewer.classList.toggle("pan-mode", state.activeTool === "pan" && !state.editing);
  els.viewer.classList.toggle("editing-mode", Boolean(state.editing));
  els.bandButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.bandMode) === state.bandMode);
  });

  renderBandLegend();
  renderImageList();
  renderRoiList();
  renderMeasureList();
  renderPatientMetrics();
  renderMetrics();
  renderHistogram();
  renderBandBars();
}

function renderImageList() {
  if (!state.images.length) {
    els.imageList.className = "image-list empty";
    els.imageList.textContent = t("noImages");
    return;
  }

  els.imageList.className = "image-list";
  els.imageList.innerHTML = state.images
    .map((image) => {
      const roiCount = image.rois.length;
      const mean = aggregateAnalysis(image.rois);
      const source = image.source === "dicom" ? "DICOM" : "IMG";
      const meanText = Number.isFinite(mean.mean) ? ` · EI ${formatNumber(mean.mean, 1)}` : "";
      return `
        <button class="image-item ${image.id === state.activeImageId ? "active" : ""}" data-image-id="${image.id}" type="button">
          <span class="image-name">${image.name}</span>
          <span class="image-badge">${source}</span>
          <span class="image-detail">${image.width} x ${image.height}px · ${roiCount} ROI(s)${meanText}</span>
        </button>
      `;
    })
    .join("");
}

function renderPatientMetrics() {
  const aggregate = aggregateAnalysis(allRois().map(({ roi }) => roi));
  els.metricImages.textContent = state.images.length ? formatInteger(state.images.length) : "-";
  els.metricTotalRois.textContent = aggregate.roiCount ? formatInteger(aggregate.roiCount) : "-";
  els.metricPatientMean.textContent = Number.isFinite(aggregate.mean) ? formatNumber(aggregate.mean, 2) : "-";
  els.metricPatientPixels.textContent = aggregate.total ? formatInteger(aggregate.total) : "-";
}

function aggregateAnalysis(rois) {
  let total = 0;
  let weighted = 0;
  let roiCount = 0;
  rois.forEach((roi) => {
    if (!roi.analysis?.total) return;
    total += roi.analysis.total;
    weighted += roi.analysis.mean * roi.analysis.total;
    roiCount += 1;
  });
  return {
    total,
    roiCount,
    mean: total ? weighted / total : NaN,
  };
}

function renderBandLegend() {
  els.bandLegend.innerHTML = bandsForMode(state.bandMode)
    .map((band, index) => {
      const color = bandColors[index % bandColors.length];
      return `<div class="legend-row"><span class="swatch" style="background:${color}"></span>${band.start}-${band.end}</div>`;
    })
    .join("");
}

function renderRoiList() {
  if (!state.rois.length) {
    els.roiList.className = "roi-list empty";
    els.roiList.textContent = t("noRois");
    return;
  }

  els.roiList.className = "roi-list";
  els.roiList.innerHTML = state.rois
    .map((roi) => {
      const pixels = roi.analysis ? formatInteger(roi.analysis.total) : "-";
      const mean = roi.analysis ? formatNumber(roi.analysis.mean, 1) : "-";
      return `
        <button class="roi-item ${roi.id === state.selectedId ? "active" : ""}" data-roi-id="${roi.id}" type="button">
          <span class="roi-dot" style="background:${roi.color}"></span>
          <span class="roi-name">${roi.label}</span>
          <span class="roi-detail">${roi.type} · ${pixels} px · EI ${mean}</span>
        </button>
      `;
    })
    .join("");
}

function renderMeasureList() {
  if (!state.measurements.length) {
    els.measureList.className = "measure-list empty";
    els.measureList.textContent = t("noMeasurements");
    return;
  }

  els.measureList.className = "measure-list";
  els.measureList.innerHTML = state.measurements
    .map((measurement) => {
      const display = measurementDisplay(measurement);
      return `
        <button class="measure-item ${measurement.id === state.selectedMeasureId ? "active" : ""}" data-measure-id="${measurement.id}" type="button">
          <span class="measure-dot" style="background:${measurement.color}"></span>
          <span class="measure-name">${measurement.label}</span>
          <span class="measure-detail">${measurementTypeLabel(measurement.type)} · ${display.text}</span>
        </button>
      `;
    })
    .join("");
}

function renderMetrics() {
  const roi = selectedRoi();
  const analysis = roi?.analysis;
  els.metricRoi.textContent = roi ? roi.label : "-";
  els.metricPixels.textContent = analysis ? formatInteger(analysis.total) : "-";
  els.metricMean.textContent = analysis ? formatNumber(analysis.mean, 2) : "-";
  els.metricMedian.textContent = analysis ? formatNumber(analysis.median, 0) : "-";
  els.metricSd.textContent = analysis ? formatNumber(analysis.sd, 2) : "-";
  els.metricRange.textContent = analysis ? `${analysis.min}/${analysis.max}` : "-";
}

function renderHistogram() {
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = els.hist.clientWidth || 280;
  const displayHeight = els.hist.clientHeight || 160;
  els.hist.width = Math.floor(displayWidth * dpr);
  els.hist.height = Math.floor(displayHeight * dpr);
  histCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  histCtx.clearRect(0, 0, displayWidth, displayHeight);

  histCtx.fillStyle = "#fbfcfe";
  histCtx.fillRect(0, 0, displayWidth, displayHeight);

  const roi = selectedRoi();
  if (!roi?.analysis?.total) {
    histCtx.fillStyle = "#657284";
    histCtx.font = "13px system-ui";
    histCtx.fillText("Sem dados", 16, 28);
    return;
  }

  const hist = roi.analysis.hist;
  const max = Math.max(...hist);
  const pad = 18;
  const chartWidth = displayWidth - pad * 2;
  const chartHeight = displayHeight - pad * 2;

  histCtx.strokeStyle = "#d8dee7";
  histCtx.beginPath();
  histCtx.moveTo(pad, pad);
  histCtx.lineTo(pad, pad + chartHeight);
  histCtx.lineTo(pad + chartWidth, pad + chartHeight);
  histCtx.stroke();

  const bands = summarizeBands(hist, roi.analysis.total);
  for (let i = 0; i < 256; i += 1) {
    const bandIndex = bands.findIndex((band) => i >= band.start && i <= band.end);
    const x = pad + (i / 256) * chartWidth;
    const h = max ? (hist[i] / max) * chartHeight : 0;
    histCtx.fillStyle = bandColors[Math.max(0, bandIndex) % bandColors.length];
    histCtx.fillRect(x, pad + chartHeight - h, Math.max(1, chartWidth / 256), h);
  }

  histCtx.fillStyle = "#657284";
  histCtx.font = "11px system-ui";
  histCtx.textAlign = "center";
  const tickStep = Number(state.bandMode);
  for (let value = 0; value <= 250; value += tickStep) {
    const x = pad + (value / 255) * chartWidth;
    histCtx.strokeStyle = "#d8dee7";
    histCtx.beginPath();
    histCtx.moveTo(x, pad + chartHeight);
    histCtx.lineTo(x, pad + chartHeight + 4);
    histCtx.stroke();
    histCtx.fillText(String(value), x, displayHeight - 5);
  }
  histCtx.fillText("255", pad + chartWidth, displayHeight - 5);
  histCtx.textAlign = "start";
}

function renderBandBars() {
  const roi = selectedRoi();
  if (!roi?.analysis?.bands?.length) {
    els.bandBars.className = "band-bars empty";
    els.bandBars.textContent = t("noSelectedRoi");
    return;
  }

  els.bandBars.className = "band-bars";
  els.bandBars.innerHTML = roi.analysis.bands
    .map(
      (band) => `
        <div class="band-row">
          <div class="band-row-head">
            <strong>${band.label}</strong>
            <span>${formatNumber(band.percent, 2)}% · ${formatInteger(band.pixels)} px</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${Math.min(100, band.percent)}%;background:${band.color}"></div>
          </div>
        </div>
      `,
    )
    .join("");
}

function exportCsv() {
  const header = [
    "image",
    "image_source",
    "roi",
    "type",
    "total_pixels",
    "mean_ei",
    "median_ei",
    "sd_ei",
    "min_ei",
    "max_ei",
    "band",
    "band_pixels",
    "band_percent",
  ];
  const rows = [header];

  allRois().forEach(({ image, roi }) => {
    roi.analysis.bands.forEach((band) => {
      rows.push([
        image.name,
        image.source,
        roi.label,
        roi.type,
        roi.analysis.total,
        roi.analysis.mean.toFixed(4),
        roi.analysis.median,
        roi.analysis.sd.toFixed(4),
        roi.analysis.min,
        roi.analysis.max,
        band.label,
        band.pixels,
        band.percent.toFixed(4),
      ]);
    });
  });

  downloadText(
    `${baseFileName()}_ei.csv`,
    rows.map((row) => row.map(csvCell).join(",")).join("\n"),
    "text/csv;charset=utf-8",
  );
}

function exportHistogramCsv() {
  const header = [
    "image",
    "image_source",
    "roi",
    "type",
    "total_pixels",
    "pixel_value",
    "pixel_count",
    "pixel_percent",
  ];
  const rows = [header];

  allRois().forEach(({ image, roi }) => {
    const total = roi.analysis?.total || 0;
    const hist = roi.analysis?.hist || [];
    for (let pixelValue = 0; pixelValue <= 255; pixelValue += 1) {
      const count = hist[pixelValue] || 0;
      rows.push([
        image.name,
        image.source,
        roi.label,
        roi.type,
        total,
        pixelValue,
        count,
        total ? ((count / total) * 100).toFixed(6) : "0.000000",
      ]);
    }
  });

  downloadText(
    `${baseFileName()}_histograma_0_255.csv`,
    rows.map((row) => row.map(csvCell).join(",")).join("\n"),
    "text/csv;charset=utf-8",
  );
}

function exportMeasurementsCsv() {
  const header = [
    "image",
    "image_source",
    "measurement",
    "type",
    "base_value_px_or_px2",
    "display_value",
    "display_unit",
    "pixel_spacing_mm",
  ];
  const rows = [header];

  allMeasurements().forEach(({ image, measurement }) => {
    const display = measurementDisplay(measurement);
    rows.push([
      image.name,
      image.source,
      measurement.label,
      measurement.type,
      measurementBaseValue(measurement).toFixed(6),
      display.value.toFixed(6),
      display.unit,
      state.pixelSpacingMm,
    ]);
  });

  downloadText(
    `${baseFileName()}_medidas.csv`,
    rows.map((row) => row.map(csvCell).join(",")).join("\n"),
    "text/csv;charset=utf-8",
  );
}

function exportJson() {
  const payload = {
    images: state.images.map((image) => ({
      id: image.id,
      name: image.name,
      source: image.source,
      width: image.width,
      height: image.height,
      rois: image.rois,
      measurements: image.measurements.map((measurement) => ({
        ...measurement,
        value: measurementDisplay(measurement).value,
        unit: measurementDisplay(measurement).unit,
        baseValuePx: measurementBaseValue(measurement),
      })),
    })),
    measurementUnit: state.measureUnit,
    pixelSpacingMm: state.pixelSpacingMm,
    bandMode: state.bandMode,
    patient: aggregateAnalysis(allRois().map(({ roi }) => roi)),
  };
  downloadText(`${baseFileName()}_ei.json`, JSON.stringify(payload, null, 2), "application/json");
}

function exportExcel() {
  const sheets = [];
  if (els.exportBandsOption.checked && allRois().length) sheets.push({ name: "Bandas EI", rows: buildEiBandsRows() });
  if (els.exportRoisOption.checked && allRois().length) sheets.push({ name: "ROIs", rows: buildRoiRows() });
  if (els.exportHistogramOption.checked && allRois().length) sheets.push({ name: "Histograma", rows: buildHistogramRows() });
  if (els.exportMeasurementsOption.checked && allMeasurements().length) sheets.push({ name: "Medidas", rows: buildMeasurementRows() });
  if (!sheets.length) return;
  const blob = buildXlsx(sheets);
  downloadBlob(`${baseFileName()}_GUST.xlsx`, blob);
}

function buildEiBandsRows() {
  const rows = [];
  const bands = bandsForMode(state.bandMode);
  const roiItems = allRois();
  const patientAnalysis = aggregateHistogramAnalysis(roiItems.map(({ roi }) => roi.analysis).filter(Boolean));
  if (patientAnalysis.total) {
    rows.push(["Paciente"]);
    appendEiBandTable(rows, patientAnalysis, bands);
    rows.push([]);
  }
  roiItems.forEach(({ image, roi }, index) => {
    const analysis = roi.analysis;
    if (!analysis) return;
    rows.push([index + 1]);
    rows.push(["Imagem", image.name]);
    rows.push(["ROI", roi.label]);
    rows.push(["Tipo", roi.type]);
    appendEiBandTable(rows, analysis, bands);
    rows.push([]);
  });
  return rows;
}

function appendEiBandTable(rows, analysis, bands) {
  const pixelsByBand = bands.map((band) => bandPixelCount(analysis.hist, band));
  rows.push(["Total", ...bands.map((band) => `${band.start}-${band.end}`)]);
  rows.push([analysis.total, ...pixelsByBand]);
  rows.push(["%", ...pixelsByBand.map((pixels) => (analysis.total ? roundForSheet((pixels / analysis.total) * 100, 2) : 0))]);
}

function bandPixelCount(hist, band) {
  let pixels = 0;
  for (let value = band.start; value <= band.end; value += 1) pixels += hist[value] || 0;
  return pixels;
}

function aggregateHistogramAnalysis(analyses) {
  const hist = Array(256).fill(0);
  let total = 0;
  analyses.forEach((analysis) => {
    if (!analysis?.total) return;
    total += analysis.total;
    for (let value = 0; value <= 255; value += 1) hist[value] += analysis.hist[value] || 0;
  });
  return { hist, total };
}

function buildRoiRows() {
  const rows = [["image", "image_source", "roi", "type", "total_pixels", "mean_ei", "median_ei", "sd_ei", "min_ei", "max_ei"]];
  allRois().forEach(({ image, roi }) => {
    rows.push([
      image.name,
      image.source,
      roi.label,
      roi.type,
      roi.analysis.total,
      roundForSheet(roi.analysis.mean, 4),
      roi.analysis.median,
      roundForSheet(roi.analysis.sd, 4),
      roi.analysis.min,
      roi.analysis.max,
    ]);
  });
  return rows;
}

function buildHistogramRows() {
  const rows = [["image", "image_source", "roi", "type", "total_pixels", "pixel_value", "pixel_count", "pixel_percent"]];
  allRois().forEach(({ image, roi }) => {
    const total = roi.analysis?.total || 0;
    const hist = roi.analysis?.hist || [];
    for (let pixelValue = 0; pixelValue <= 255; pixelValue += 1) {
      const count = hist[pixelValue] || 0;
      rows.push([
        image.name,
        image.source,
        roi.label,
        roi.type,
        total,
        pixelValue,
        count,
        total ? roundForSheet((count / total) * 100, 6) : 0,
      ]);
    }
  });
  return rows;
}

function buildMeasurementRows() {
  const rows = [["image", "image_source", "measurement", "type", "base_value_px_or_px2", "display_value", "display_unit", "pixel_spacing_mm"]];
  allMeasurements().forEach(({ image, measurement }) => {
    const display = measurementDisplay(measurement);
    rows.push([
      image.name,
      image.source,
      measurement.label,
      measurement.type,
      roundForSheet(measurementBaseValue(measurement), 6),
      roundForSheet(display.value, 6),
      display.unit,
      state.pixelSpacingMm,
    ]);
  });
  return rows;
}

function roundForSheet(value, digits) {
  if (!Number.isFinite(value)) return "";
  return Number(value.toFixed(digits));
}

function buildXlsx(sheets) {
  const files = [];
  files.push({
    path: "[Content_Types].xml",
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
${sheets.map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}
</Types>`,
  });
  files.push({
    path: "_rels/.rels",
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
  });
  files.push({
    path: "xl/workbook.xml",
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>${sheets.map((sheet, index) => `<sheet name="${xmlEscape(sheet.name).slice(0, 31)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join("")}</sheets>
</workbook>`,
  });
  files.push({
    path: "xl/_rels/workbook.xml.rels",
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${sheets.map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join("")}
</Relationships>`,
  });
  sheets.forEach((sheet, index) => {
    files.push({ path: `xl/worksheets/sheet${index + 1}.xml`, content: sheetXml(sheet.rows) });
  });
  return zipFiles(files);
}

function sheetXml(rows) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<sheetData>
${rows
  .map((row, rowIndex) => `<row r="${rowIndex + 1}">${row.map((cell, colIndex) => cellXml(cell, rowIndex + 1, colIndex)).join("")}</row>`)
  .join("")}
</sheetData>
</worksheet>`;
}

function cellXml(value, rowIndex, colIndex) {
  if (value === null || value === undefined || value === "") return "";
  const ref = `${columnName(colIndex + 1)}${rowIndex}`;
  if (typeof value === "number" && Number.isFinite(value)) return `<c r="${ref}"><v>${value}</v></c>`;
  return `<c r="${ref}" t="inlineStr"><is><t>${xmlEscape(String(value))}</t></is></c>`;
}

function columnName(number) {
  let name = "";
  while (number > 0) {
    const remainder = (number - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    number = Math.floor((number - 1) / 26);
  }
  return name;
}

function xmlEscape(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function zipFiles(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;
  files.forEach((file) => {
    const name = encoder.encode(file.path);
    const data = encoder.encode(file.content);
    const crc = crc32(data);
    const local = zipLocalHeader(name, data, crc);
    chunks.push(local, data);
    central.push(zipCentralHeader(name, data, crc, offset));
    offset += local.length + data.length;
  });
  const centralStart = offset;
  central.forEach((entry) => {
    chunks.push(entry);
    offset += entry.length;
  });
  chunks.push(zipEndRecord(files.length, offset - centralStart, centralStart));
  return new Blob(chunks, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

function zipLocalHeader(name, data, crc) {
  const header = new Uint8Array(30 + name.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, 0, true);
  view.setUint32(10, dosDateTime(), true);
  view.setUint32(14, crc, true);
  view.setUint32(18, data.length, true);
  view.setUint32(22, data.length, true);
  view.setUint16(26, name.length, true);
  header.set(name, 30);
  return header;
}

function zipCentralHeader(name, data, crc, localOffset) {
  const header = new Uint8Array(46 + name.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint32(12, dosDateTime(), true);
  view.setUint32(16, crc, true);
  view.setUint32(20, data.length, true);
  view.setUint32(24, data.length, true);
  view.setUint16(28, name.length, true);
  view.setUint32(42, localOffset, true);
  header.set(name, 46);
  return header;
}

function zipEndRecord(total, centralSize, centralOffset) {
  const header = new Uint8Array(22);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x06054b50, true);
  view.setUint16(8, total, true);
  view.setUint16(10, total, true);
  view.setUint32(12, centralSize, true);
  view.setUint32(16, centralOffset, true);
  return header;
}

function dosDateTime() {
  const date = new Date();
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const day = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return (day << 16) | time;
}

function crc32(data) {
  if (!crc32.table) {
    crc32.table = Array.from({ length: 256 }, (_, index) => {
      let crc = index;
      for (let bit = 0; bit < 8; bit += 1) crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
      return crc >>> 0;
    });
  }
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i += 1) crc = crc32.table[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function baseFileName() {
  return (state.image?.name || "aiusg_paciente").replace(/\.[^.]+$/, "").replace(/[^a-z0-9_-]+/gi, "_");
}

function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
  downloadBlob(filename, blob);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

els.openFileButton.addEventListener("click", () => els.fileInput.click());
els.demoButton.addEventListener("click", loadDemoImage);
els.languageSelect.addEventListener("change", () => {
  state.language = els.languageSelect.value;
  updateUi();
});
els.measureUnit.addEventListener("change", () => {
  state.measureUnit = els.measureUnit.value;
  updateUi();
});
els.pixelSpacing.addEventListener("change", () => {
  state.pixelSpacingMm = Math.max(0.0001, Number(els.pixelSpacing.value) || 1);
  updateUi();
});
els.fileInput.addEventListener("change", (event) => {
  const files = [...event.target.files];
  if (files.length) handleFiles(files);
  event.target.value = "";
});

els.imageList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-image-id]");
  if (!item) return;
  setActiveImage(item.dataset.imageId);
});

els.toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.activeTool = button.dataset.tool;
    updateUi();
  });
});

els.bandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.bandMode = Number(button.dataset.bandMode);
    updateAllAnalyses();
    updateUi();
  });
});

els.roiList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-roi-id]");
  if (!item) return;
  state.selectedId = item.dataset.roiId;
  state.selectedMeasureId = null;
  if (state.image) {
    state.image.selectedId = state.selectedId;
    state.image.selectedMeasureId = null;
  }
  updateUi();
  draw();
});

els.measureList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-measure-id]");
  if (!item) return;
  state.selectedMeasureId = item.dataset.measureId;
  state.selectedId = null;
  if (state.image) {
    state.image.selectedMeasureId = state.selectedMeasureId;
    state.image.selectedId = null;
  }
  updateUi();
  draw();
});

els.deleteRoiButton.addEventListener("click", () => {
  const roi = selectedRoi();
  if (!roi) return;
  pushUndo();
  const index = state.rois.findIndex((item) => item.id === roi.id);
  if (index >= 0) state.rois.splice(index, 1);
  state.selectedId = state.rois.at(-1)?.id || null;
  if (state.image) state.image.selectedId = state.selectedId;
  updateUi();
  draw();
});

els.deleteMeasureButton.addEventListener("click", () => {
  const measurement = selectedMeasurement();
  if (!measurement) return;
  pushUndo();
  const index = state.measurements.findIndex((item) => item.id === measurement.id);
  if (index >= 0) state.measurements.splice(index, 1);
  state.selectedMeasureId = state.measurements.at(-1)?.id || null;
  if (state.image) state.image.selectedMeasureId = state.selectedMeasureId;
  updateUi();
  draw();
});

els.undoButton.addEventListener("click", undoLast);
els.exportExcelButton.addEventListener("click", exportExcel);
[els.exportBandsOption, els.exportRoisOption, els.exportHistogramOption, els.exportMeasurementsOption].forEach((input) => {
  input.addEventListener("change", updateUi);
});

els.viewer.addEventListener("pointerdown", (event) => {
  if (!state.image) return;
  els.viewer.setPointerCapture(event.pointerId);
  const screen = pointerPoint(event);
  const image = screenToImage(screen);
  state.pointer = { screen, image, view: { ...state.view } };

  if (state.activeTool === "pan") {
    const handleHit = hitSelectionHandle(image);
    if (handleHit) {
      pushUndo();
      state.editing = {
        kind: handleHit.kind,
        id: handleHit.shape.id,
        handle: handleHit.handle,
        mode: "resize",
        start: image,
        previous: image,
        original: clonePlain(handleHit.shape),
      };
      return;
    }
    const shapeHit = hitEditableShape(image);
    if (shapeHit) {
      selectShape(shapeHit.kind, shapeHit.shape);
      pushUndo();
      state.editing = {
        kind: shapeHit.kind,
        id: shapeHit.shape.id,
        mode: "move",
        start: image,
        previous: image,
        original: clonePlain(shapeHit.shape),
      };
      updateUi();
      draw();
      return;
    }
  }

  if (state.activeTool === "measure-angle") {
    const boundedImage = clampPointToImage(image);
    if (!state.angleDraft) state.angleDraft = { points: [] };
    state.angleDraft.points.push(boundedImage);
    if (state.angleDraft.points.length === 3) {
      const measurement = createMeasurement("angle", {
        p1: state.angleDraft.points[0],
        vertex: state.angleDraft.points[1],
        p2: state.angleDraft.points[2],
      });
      finishMeasurement(measurement);
      state.angleDraft = null;
    }
    draw();
    return;
  }

  if (state.activeTool === "pan") return;

  const boundedImage = clampPointToImage(image);
  const color = roiColors[state.rois.length % roiColors.length];
  const measureColor = measureColors[state.measurements.length % measureColors.length];
  if (state.activeTool === "rect") {
    state.drawing = {
      roi: createRoi("rect", { x: boundedImage.x, y: boundedImage.y, w: 0, h: 0, color }),
    };
  } else if (state.activeTool === "circle") {
    const fixed = els.fixedCircle.checked;
    const radius = Math.max(1, Number(els.circleRadius.value) || 1);
    state.drawing = {
      fixed,
      roi: createRoi("circle", { cx: boundedImage.x, cy: boundedImage.y, r: fixed ? radius : 0, color }),
    };
  } else if (state.activeTool === "freehand") {
    state.drawing = {
      roi: createRoi("freehand", { points: [boundedImage], color }),
    };
  } else if (state.activeTool === "ellipse") {
    state.drawing = {
      roi: createRoi("ellipse", { x: boundedImage.x, y: boundedImage.y, w: 0, h: 0, color }),
    };
  } else if (state.activeTool === "measure-distance") {
    state.drawing = {
      measurement: createMeasurement("distance", { p1: boundedImage, p2: boundedImage, color: measureColor }),
    };
  } else if (state.activeTool === "measure-rect") {
    state.drawing = {
      measurement: createMeasurement("area-rect", { x: boundedImage.x, y: boundedImage.y, w: 0, h: 0, color: measureColor }),
    };
  } else if (state.activeTool === "measure-circle") {
    state.drawing = {
      measurement: createMeasurement("area-circle", { cx: boundedImage.x, cy: boundedImage.y, r: 0, color: measureColor }),
    };
  } else if (state.activeTool === "measure-ellipse") {
    state.drawing = {
      measurement: createMeasurement("area-ellipse", { x: boundedImage.x, y: boundedImage.y, w: 0, h: 0, color: measureColor }),
    };
  } else if (state.activeTool === "measure-freehand") {
    state.drawing = {
      measurement: createMeasurement("area-free", { points: [boundedImage], color: measureColor }),
    };
  }
  draw();
});

els.viewer.addEventListener("pointermove", (event) => {
  if (!state.pointer || !state.image) return;
  const screen = pointerPoint(event);
  const image = screenToImage(screen);
  state.pointer.image = image;

  if (state.editing) {
    const target =
      state.editing.kind === "roi"
        ? state.rois.find((roi) => roi.id === state.editing.id)
        : state.measurements.find((measurement) => measurement.id === state.editing.id);
    if (!target) return;
    if (state.editing.mode === "move") {
      const dx = image.x - state.editing.previous.x;
      const dy = image.y - state.editing.previous.y;
      moveShape(target, dx, dy);
      state.editing.previous = image;
    } else if (state.editing.mode === "resize") {
      resizeShape(target, state.editing.handle, state.editing.start, image, state.editing.original);
    }
    refreshEditedShape(state.editing.kind, target);
    updateUi();
    draw();
    return;
  }

  if (state.activeTool === "pan" && !state.drawing) {
    state.view.x = state.pointer.view.x + screen.x - state.pointer.screen.x;
    state.view.y = state.pointer.view.y + screen.y - state.pointer.screen.y;
    draw();
    return;
  }

  if (state.angleDraft) {
    draw();
    return;
  }

  if (!state.drawing?.roi && !state.drawing?.measurement) return;
  const roi = state.drawing.roi;
  const measurement = state.drawing.measurement;
  const boundedImage = clampPointToImage(image);

  if (roi?.type === "rect" || roi?.type === "ellipse") {
    roi.w = boundedImage.x - roi.x;
    roi.h = boundedImage.y - roi.y;
  } else if (roi?.type === "circle" && !state.drawing.fixed) {
    roi.r = Math.min(Math.hypot(boundedImage.x - roi.cx, boundedImage.y - roi.cy), maxCircleRadius(roi.cx, roi.cy));
  } else if (roi?.type === "freehand") {
    const last = roi.points.at(-1);
    if (!last || Math.hypot(boundedImage.x - last.x, boundedImage.y - last.y) >= 1.5) {
      roi.points.push(boundedImage);
    }
  } else if (measurement?.type === "distance") {
    measurement.p2 = boundedImage;
  } else if (measurement?.type === "area-rect" || measurement?.type === "area-ellipse") {
    measurement.w = boundedImage.x - measurement.x;
    measurement.h = boundedImage.y - measurement.y;
  } else if (measurement?.type === "area-circle") {
    measurement.r = Math.min(Math.hypot(boundedImage.x - measurement.cx, boundedImage.y - measurement.cy), maxCircleRadius(measurement.cx, measurement.cy));
  } else if (measurement?.type === "area-free") {
    const last = measurement.points.at(-1);
    if (!last || Math.hypot(boundedImage.x - last.x, boundedImage.y - last.y) >= 1.5) {
      measurement.points.push(boundedImage);
    }
  }

  draw();
});

els.viewer.addEventListener("pointerup", (event) => {
  if (!state.pointer) return;
  els.viewer.releasePointerCapture(event.pointerId);

  if (state.editing) {
    const target =
      state.editing.kind === "roi"
        ? state.rois.find((roi) => roi.id === state.editing.id)
        : state.measurements.find((measurement) => measurement.id === state.editing.id);
    if (target) refreshEditedShape(state.editing.kind, target);
    state.editing = null;
    state.pointer = null;
    updateUi();
    draw();
    return;
  }

  if (state.drawing?.roi) {
    finishRoi(state.drawing.roi);
  }
  if (state.drawing?.measurement) {
    finishMeasurement(state.drawing.measurement);
  }

  state.drawing = null;
  state.pointer = null;
  draw();
});

els.viewer.addEventListener("pointercancel", () => {
  state.drawing = null;
  state.angleDraft = null;
  state.editing = null;
  state.pointer = null;
  draw();
});

els.viewer.addEventListener(
  "wheel",
  (event) => {
    if (!state.image) return;
    event.preventDefault();
    const screen = pointerPoint(event);
    const before = screenToImage(screen);
    const factor = event.deltaY < 0 ? 1.12 : 0.88;
    state.view.scale = Math.max(0.04, Math.min(16, state.view.scale * factor));
    const after = imageToScreen(before);
    state.view.x += screen.x - after.x;
    state.view.y += screen.y - after.y;
    draw();
  },
  { passive: false },
);

window.addEventListener("keydown", (event) => {
  if (event.target && ["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    undoLast();
    return;
  }
  if (event.key !== "Delete" && event.key !== "Backspace") return;
  const roi = selectedRoi();
  const measurement = selectedMeasurement();
  if (!roi && !measurement) return;
  event.preventDefault();
  pushUndo();
  if (roi) {
    const index = state.rois.findIndex((item) => item.id === roi.id);
    if (index >= 0) state.rois.splice(index, 1);
    state.selectedId = state.rois.at(-1)?.id || null;
    if (state.image) state.image.selectedId = state.selectedId;
  } else if (measurement) {
    const index = state.measurements.findIndex((item) => item.id === measurement.id);
    if (index >= 0) state.measurements.splice(index, 1);
    state.selectedMeasureId = state.measurements.at(-1)?.id || null;
    if (state.image) state.image.selectedMeasureId = state.selectedMeasureId;
  }
  updateUi();
  draw();
});

window.addEventListener("resize", resizeViewer);
resizeViewer();
updateUi();
