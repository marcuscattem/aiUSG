const els = {
  viewer: document.querySelector("#viewerCanvas"),
  hist: document.querySelector("#histogramCanvas"),
  languageSelect: document.querySelector("#languageSelect"),
  fileInput: document.querySelector("#fileInput"),
  openFileButton: document.querySelector("#openFileButton"),
  demoButton: document.querySelector("#demoButton"),
  exportCsvButton: document.querySelector("#exportCsvButton"),
  exportMeasurementsButton: document.querySelector("#exportMeasurementsButton"),
  exportHistogramButton: document.querySelector("#exportHistogramButton"),
  exportJsonButton: document.querySelector("#exportJsonButton"),
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
    histogramCsv: "Histograma CSV",
    measurementsCsv: "Medidas CSV",
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
    histogramCsv: "Histogram CSV",
    measurementsCsv: "Measurements CSV",
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
    histogramCsv: "Histograma CSV",
    measurementsCsv: "Medidas CSV",
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
  state.rois.forEach((roi) => drawRoi(roi, roi.id === state.selectedId));
  state.measurements.forEach((measurement) => drawMeasurement(measurement, measurement.id === state.selectedMeasureId));
  if (state.drawing && state.drawing.roi) drawRoi(state.drawing.roi, true, true);
  if (state.drawing && state.drawing.measurement) drawMeasurement(state.drawing.measurement, true, true);
  if (state.angleDraft) drawAngleDraft();
  ctx.restore();
}

function drawRoi(roi, selected = false, draft = false) {
  ctx.save();
  ctx.lineWidth = (draft ? 1 : selected ? 3 : 2) / state.view.scale;
  ctx.strokeStyle = roi.color;
  ctx.fillStyle = `${roi.color}24`;
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
  ctx.fill();
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
  roi.analysis = analyzeRoi(roi);
  state.rois.push(roi);
  state.selectedId = roi.id;
  state.image.selectedId = roi.id;
  updateUi();
  draw();
}

function finishMeasurement(measurement) {
  if (!state.image || !measurementHasValue(measurement)) return;
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

function updateUi() {
  applyTranslations();
  els.emptyState.classList.toggle("hidden", Boolean(state.image));
  els.imageMeta.textContent = state.image
    ? `${state.image.name} · ${state.image.width} x ${state.image.height}px · ${state.images.length} imagem(ns)`
    : `${t("noImageLoaded")} · GUST`;
  els.exportCsvButton.disabled = !allRois().length;
  els.exportMeasurementsButton.disabled = !allMeasurements().length;
  els.exportHistogramButton.disabled = !allRois().length;
  els.exportJsonButton.disabled = !allRois().length;
  els.deleteRoiButton.disabled = !selectedRoi();
  els.deleteMeasureButton.disabled = !selectedMeasurement();
  els.languageSelect.value = state.language;
  els.measureUnit.value = state.measureUnit;
  els.pixelSpacing.value = state.pixelSpacingMm;

  els.toolButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tool === state.activeTool);
  });
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

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function baseFileName() {
  return (state.image?.name || "aiusg_paciente").replace(/\.[^.]+$/, "").replace(/[^a-z0-9_-]+/gi, "_");
}

function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
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
  updateUi();
  draw();
});

els.measureList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-measure-id]");
  if (!item) return;
  state.selectedMeasureId = item.dataset.measureId;
  if (state.image) state.image.selectedMeasureId = state.selectedMeasureId;
  updateUi();
  draw();
});

els.deleteRoiButton.addEventListener("click", () => {
  const roi = selectedRoi();
  if (!roi) return;
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
  const index = state.measurements.findIndex((item) => item.id === measurement.id);
  if (index >= 0) state.measurements.splice(index, 1);
  state.selectedMeasureId = state.measurements.at(-1)?.id || null;
  if (state.image) state.image.selectedMeasureId = state.selectedMeasureId;
  updateUi();
  draw();
});

els.exportCsvButton.addEventListener("click", exportCsv);
els.exportMeasurementsButton.addEventListener("click", exportMeasurementsCsv);
els.exportHistogramButton.addEventListener("click", exportHistogramCsv);
els.exportJsonButton.addEventListener("click", exportJson);

els.viewer.addEventListener("pointerdown", (event) => {
  if (!state.image) return;
  els.viewer.setPointerCapture(event.pointerId);
  const screen = pointerPoint(event);
  const image = screenToImage(screen);
  state.pointer = { screen, image, view: { ...state.view } };

  if (state.activeTool === "measure-angle") {
    if (!state.angleDraft) state.angleDraft = { points: [] };
    state.angleDraft.points.push(image);
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

  const color = roiColors[state.rois.length % roiColors.length];
  const measureColor = measureColors[state.measurements.length % measureColors.length];
  if (state.activeTool === "rect") {
    state.drawing = {
      roi: createRoi("rect", { x: image.x, y: image.y, w: 0, h: 0, color }),
    };
  } else if (state.activeTool === "circle") {
    const fixed = els.fixedCircle.checked;
    const radius = Math.max(1, Number(els.circleRadius.value) || 1);
    state.drawing = {
      fixed,
      roi: createRoi("circle", { cx: image.x, cy: image.y, r: fixed ? radius : 0, color }),
    };
  } else if (state.activeTool === "freehand") {
    state.drawing = {
      roi: createRoi("freehand", { points: [image], color }),
    };
  } else if (state.activeTool === "ellipse") {
    state.drawing = {
      roi: createRoi("ellipse", { x: image.x, y: image.y, w: 0, h: 0, color }),
    };
  } else if (state.activeTool === "measure-distance") {
    state.drawing = {
      measurement: createMeasurement("distance", { p1: image, p2: image, color: measureColor }),
    };
  } else if (state.activeTool === "measure-rect") {
    state.drawing = {
      measurement: createMeasurement("area-rect", { x: image.x, y: image.y, w: 0, h: 0, color: measureColor }),
    };
  } else if (state.activeTool === "measure-circle") {
    state.drawing = {
      measurement: createMeasurement("area-circle", { cx: image.x, cy: image.y, r: 0, color: measureColor }),
    };
  } else if (state.activeTool === "measure-ellipse") {
    state.drawing = {
      measurement: createMeasurement("area-ellipse", { x: image.x, y: image.y, w: 0, h: 0, color: measureColor }),
    };
  } else if (state.activeTool === "measure-freehand") {
    state.drawing = {
      measurement: createMeasurement("area-free", { points: [image], color: measureColor }),
    };
  }
  draw();
});

els.viewer.addEventListener("pointermove", (event) => {
  if (!state.pointer || !state.image) return;
  const screen = pointerPoint(event);
  const image = screenToImage(screen);
  state.pointer.image = image;

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

  if (roi?.type === "rect" || roi?.type === "ellipse") {
    roi.w = image.x - roi.x;
    roi.h = image.y - roi.y;
  } else if (roi?.type === "circle" && !state.drawing.fixed) {
    roi.r = Math.hypot(image.x - roi.cx, image.y - roi.cy);
  } else if (roi?.type === "freehand") {
    const last = roi.points.at(-1);
    if (!last || Math.hypot(image.x - last.x, image.y - last.y) >= 1.5) {
      roi.points.push(image);
    }
  } else if (measurement?.type === "distance") {
    measurement.p2 = image;
  } else if (measurement?.type === "area-rect" || measurement?.type === "area-ellipse") {
    measurement.w = image.x - measurement.x;
    measurement.h = image.y - measurement.y;
  } else if (measurement?.type === "area-circle") {
    measurement.r = Math.hypot(image.x - measurement.cx, image.y - measurement.cy);
  } else if (measurement?.type === "area-free") {
    const last = measurement.points.at(-1);
    if (!last || Math.hypot(image.x - last.x, image.y - last.y) >= 1.5) {
      measurement.points.push(image);
    }
  }

  draw();
});

els.viewer.addEventListener("pointerup", (event) => {
  if (!state.pointer) return;
  els.viewer.releasePointerCapture(event.pointerId);

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

window.addEventListener("resize", resizeViewer);
resizeViewer();
updateUi();
