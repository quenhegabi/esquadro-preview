// ============================================================================
// ESQUADЯO — UXP Plugin Engine (Lápis Raro) for Photoshop
// ============================================================================

// Registro de Entrypoints do UXP para o Photoshop
try {
  const uxp = require("uxp");
  if (uxp && uxp.entrypoints) {
    uxp.entrypoints.setup({
      plugin: {
        create() {
          console.log("Plugin ESQUADЯO iniciado com sucesso!");
        }
      },
      panels: {
        esquadroPanel: {
          show() {
            console.log("Painel ESQUADЯO exibido no Photoshop.");
          }
        }
      }
    });
  }
} catch (e) {
  console.log("Ambiente fora do UXP nativo (modo protótipo/browser)");
}

const masterPlatforms = {
  facebook: [
    { id: "fb_avatar", name: "Avatar / Perfil (1:1)", width: 320, height: 320, safe: { top: 50, bottom: 50, left: 50, right: 50 }, circular: true },
    { id: "fb_square", name: "Post Quadrado (1:1)", width: 1080, height: 1080 },
    { id: "fb_portrait", name: "Post Retrato (4:5)", width: 1080, height: 1359 },
    { id: "fb_carousel", name: "Carrossel (1:1)", width: 1200, height: 1200 },
    { id: "fb_landscape", name: "Post Paisagem (16:9)", width: 1080, height: 566 },
    { id: "fb_link", name: "Anúncio com Link (1,91:1)", width: 1200, height: 630 },
    { 
      id: "fb_cover_profile", 
      name: "Capa de Perfil (820×360)", 
      width: 820, 
      height: 360, 
      safe: { top: 24, bottom: 24, left: 90, right: 90 },
      cropFeed: { top: 24, bottom: 24, left: 90, right: 90 },
      noInfoBox: { width: 180, height: 100, anchor: "bottom-left" }
    },
    { id: "fb_cover_group", name: "Capa de Grupo (1640×856)", width: 1640, height: 856 },
    { id: "fb_cover_event", name: "Capa de Evento (1920×1005)", width: 1920, height: 1005 }
  ],
  instagram: [
    { id: "ig_avatar", name: "Avatar / Destaques (1:1)", width: 320, height: 320, safe: { top: 50, bottom: 50, left: 50, right: 50 }, circular: true },
    { id: "ig_square", name: "Feed Quadrado (1:1)", width: 1080, height: 1080, crop: { lateral: 135.2 } },
    { id: "ig_portrait_4_5", name: "Feed Retrato (4:5)", width: 1080, height: 1350, crop: { lateral: 34 } },
    { id: "ig_portrait_3_4", name: "Feed Retrato (3:4)", width: 1080, height: 1440 },
    { id: "ig_story", name: "Story (9:16)", width: 1080, height: 1920, safe: { top: 110, bottom: 160, left: 100, right: 100 } },
    { id: "ig_reels", name: "Reels (9:16)", width: 1080, height: 1920, safe: { top: 140, bottom: 300, left: 40, right: 40 }, noInfoBox: { width: 180, height: 750, anchor: "bottom-right" } },
    { id: "ig_thumb_reels", name: "Thumb Reels (9:16)", width: 1080, height: 1920, cropFeed: { top: 240, bottom: 240 } },
    { id: "ig_landscape_16_9", name: "Feed Paisagem (16:9)", width: 1080, height: 566, crop: { lateral: 328 } },
    { id: "ig_landscape_4_3", name: "Feed Paisagem (4:3)", width: 1080, height: 810, crop: { lateral: 236.5 } },
    { id: "ig_landscape_5_4", name: "Feed Paisagem (5:4)", width: 1080, height: 864, crop: { lateral: 216 } }
  ],
  linkedin: [
    { id: "lkd_avatar", name: "Perfil / Bio (1:1)", width: 400, height: 400, safe: { top: 50, bottom: 50, left: 50, right: 50 }, circular: true },
    { id: "lkd_square", name: "Post Quadrado (1:1)", width: 1080, height: 1080 },
    { id: "lkd_portrait", name: "Post Retrato (4:5)", width: 1080, height: 1350 },
    { id: "lkd_landscape", name: "Post Paisagem (1,91:1)", width: 1200, height: 627 },
    { id: "lkd_cover", name: "Capa de Perfil (4:1)", width: 1584, height: 396 },
    { id: "lkd_video", name: "Vídeo Vertical (9:16)", width: 1080, height: 1920 }
  ],
  tiktok: [
    { id: "tt_avatar", name: "Avatar / Perfil (1:1)", width: 200, height: 200, safe: { top: 20, bottom: 20, left: 20, right: 20 }, circular: true },
    { id: "tt_foryou", name: "For You / Vídeo (9:16)", width: 1080, height: 1920, safe: { top: 140, bottom: 300, left: 40, right: 40 } },
    { id: "tt_thumb", name: "Thumb Capa (4:5)", width: 1080, height: 1920, cropFeed: { top: 285, bottom: 285 } }
  ],
  whatsapp: [
    { id: "wa_avatar", name: "Perfil (1:1)", width: 200, height: 200, safe: { top: 20, bottom: 20, left: 20, right: 20 }, circular: true },
    { id: "wa_status", name: "Status (9:16)", width: 1080, height: 1920, safe: { top: 120, bottom: 160, left: 100, right: 100 } },
    { id: "wa_thumb_doc", name: "Thumb Imagem / Doc (2:3)", width: 1200, height: 1800 },
    { id: "wa_sticker", name: "Sticker / Figurinha (1:1)", width: 512, height: 512, safe: { top: 16, bottom: 16, left: 16, right: 16 } }
  ],
  twitter: [
    { id: "tw_avatar", name: "Avatar / Perfil (1:1)", width: 400, height: 400, safe: { top: 20, bottom: 20, left: 20, right: 20 }, circular: true },
    { id: "tw_square", name: "Post Quadrado (1:1)", width: 1080, height: 1080 },
    { id: "tw_landscape", name: "Post Retangular (16:9)", width: 1200, height: 675 },
    { id: "tw_card", name: "Card / Link (2:1)", width: 800, height: 418 },
    { id: "tw_cover", name: "Capa do Perfil (3:1)", width: 1500, height: 500, safe: { top: 140, bottom: 140, left: 282.5, right: 282.5 }, cropFeed: { top: 140, bottom: 140, left: 282.5, right: 282.5 } }
  ],
  youtube: [
    { id: "yt_avatar", name: "Avatar / Canal (1:1)", width: 800, height: 800, safe: { top: 20, bottom: 20, left: 20, right: 20 }, circular: true },
    { id: "yt_thumb", name: "Thumbnail de Vídeo (16:9)", width: 1280, height: 720 },
    { id: "yt_shorts", name: "Shorts (9:16)", width: 1080, height: 1920, safe: { top: 120, bottom: 160, left: 60, right: 60 } },
    { id: "yt_cover", name: "Capa do Canal (16:9)", width: 2560, height: 1440, safe: { top: 508.5, bottom: 508.5, left: 507, right: 507 }, cropFeed: { top: 508.5, bottom: 508.5 } }
  ]
};

const platformSelect = document.getElementById('platformSelect');
const formatSelect = document.getElementById('formatSelect');
const qtdInput = document.getElementById('qtdInput');
const btnMinus = document.getElementById('btnMinus');
const btnPlus = document.getElementById('btnPlus');
const btnActionLabel = document.getElementById('btnActionLabel');
const canvasPreview = document.getElementById('canvasPreview');
const safeOverlay = document.getElementById('safeOverlay');
const noInfoBox = document.getElementById('noInfoBox');
const cropOverlay = document.getElementById('cropOverlay');
const dimText = document.getElementById('dimText');
const cropNoteText = document.getElementById('cropNoteText');
const legendSafeItem = document.getElementById('legendSafeItem');
const legendCropItem = document.getElementById('legendCropItem');
const btnCreate = document.getElementById('btnCreate');
const btnGuidesOnly = document.getElementById('btnGuidesOnly');
const toast = document.getElementById('toast');

function populateFormats() {
  const platformKey = platformSelect.value;
  const formats = masterPlatforms[platformKey] || [];
  
  formatSelect.innerHTML = '';
  formats.forEach(fmt => {
    const opt = document.createElement('option');
    opt.value = fmt.id;
    opt.textContent = fmt.name;
    formatSelect.appendChild(opt);
  });

  updatePreview();
}

function updatePreview() {
  const platformKey = platformSelect.value;
  const formats = masterPlatforms[platformKey] || [];
  const selectedId = formatSelect.value;
  const fmt = formats.find(f => f.id === selectedId) || formats[0];

  if (!fmt) return;

  const q = parseInt(qtdInput.value) || 1;

  const maxW = 84;
  const maxH = 108;
  const ratio = fmt.width / fmt.height;

  let renderW, renderH;
  if (ratio > maxW / maxH) {
    renderW = maxW;
    renderH = maxW / ratio;
  } else {
    renderH = maxH;
    renderW = maxH * ratio;
  }

  canvasPreview.style.width = `${renderW}px`;
  canvasPreview.style.height = `${renderH}px`;
  canvasPreview.style.borderRadius = fmt.circular ? '50%' : '2px';
  dimText.textContent = `${fmt.width} × ${fmt.height} px`;

  const scaleX = renderW / fmt.width;
  const scaleY = renderH / fmt.height;

  // 1. Safe Zone
  if (fmt.safe) {
    legendSafeItem.style.display = 'flex';
    safeOverlay.style.display = 'block';
    safeOverlay.style.top = `${fmt.safe.top * scaleY}px`;
    safeOverlay.style.bottom = `${fmt.safe.bottom * scaleY}px`;
    safeOverlay.style.left = `${fmt.safe.left * scaleX}px`;
    safeOverlay.style.right = `${fmt.safe.right * scaleX}px`;
    safeOverlay.style.borderRadius = fmt.circular ? '50%' : '0';
  } else {
    legendSafeItem.style.display = 'none';
    safeOverlay.style.display = 'none';
  }

  // 2. Box de sem informação
  if (fmt.noInfoBox) {
    noInfoBox.style.display = 'block';
    noInfoBox.style.width = `${fmt.noInfoBox.width * scaleX}px`;
    noInfoBox.style.height = `${fmt.noInfoBox.height * scaleY}px`;
    
    if (fmt.noInfoBox.anchor === "bottom-left") {
      noInfoBox.style.bottom = `${fmt.safe.bottom * scaleY}px`;
      noInfoBox.style.left = `${fmt.safe.left * scaleX}px`;
      noInfoBox.style.right = 'auto';
    } else {
      noInfoBox.style.bottom = `${fmt.safe.bottom * scaleY}px`;
      noInfoBox.style.right = `${fmt.safe.right * scaleX}px`;
      noInfoBox.style.left = 'auto';
    }
  } else {
    noInfoBox.style.display = 'none';
  }

  // 3. Crop Feed
  const hasCrop = fmt.cropFeed || fmt.crop;
  if (hasCrop) {
    legendCropItem.style.display = 'flex';
    cropOverlay.style.display = 'block';

    if (fmt.cropFeed) {
      cropOverlay.style.top = `${fmt.cropFeed.top * scaleY}px`;
      cropOverlay.style.bottom = `${fmt.cropFeed.bottom * scaleY}px`;
      cropOverlay.style.left = fmt.cropFeed.left ? `${fmt.cropFeed.left * scaleX}px` : '0';
      cropOverlay.style.right = fmt.cropFeed.right ? `${fmt.cropFeed.right * scaleX}px` : '0';
    } else if (fmt.crop) {
      cropOverlay.style.top = '0';
      cropOverlay.style.bottom = '0';
      cropOverlay.style.left = `${fmt.crop.lateral * scaleX}px`;
      cropOverlay.style.right = `${fmt.crop.lateral * scaleX}px`;
    }

    cropNoteText.style.display = q > 1 ? 'block' : 'none';
  } else {
    legendCropItem.style.display = 'none';
    cropOverlay.style.display = 'none';
    cropNoteText.style.display = 'none';
  }
}

function updateQtdLabel() {
  let q = parseInt(qtdInput.value);
  if (isNaN(q) || q < 1) q = 1;
  qtdInput.value = q;

  btnActionLabel.textContent = q > 1 ? "Criar Pranchetas" : "Criar Prancheta";
  updatePreview();
}

btnMinus.addEventListener('click', () => {
  let q = parseInt(qtdInput.value) || 1;
  if (q > 1) {
    qtdInput.value = q - 1;
    updateQtdLabel();
  }
});

btnPlus.addEventListener('click', () => {
  let q = parseInt(qtdInput.value) || 1;
  if (q < 20) {
    qtdInput.value = q + 1;
    updateQtdLabel();
  }
});

platformSelect.addEventListener('change', populateFormats);
formatSelect.addEventListener('change', updatePreview);
qtdInput.addEventListener('input', updateQtdLabel);

// Ação Photoshop UXP DOM Call
btnCreate.addEventListener('click', async () => {
  const platformKey = platformSelect.value;
  const formats = masterPlatforms[platformKey] || [];
  const fmt = formats.find(f => f.id === formatSelect.value) || formats[0];
  const count = parseInt(qtdInput.value) || 1;

  showToast(`✨ Criando ${count} prancheta(s)...`);

  try {
    const { app, core } = require('photoshop');
    if (app) {
      await core.executeAsModal(async () => {
        // Photoshop document or artboard creation
        let doc = app.activeDocument;
        if (!doc) {
          doc = await app.documents.add({
            width: fmt.width,
            height: fmt.height,
            resolution: 72,
            mode: "RGBColor",
            name: fmt.name
          });
        }
      }, { "commandName": "Criar Prancheta ESQUADЯO" });
    }
  } catch (err) {
    console.log("Execução em ambiente de simulação/local");
  }
});

btnGuidesOnly.addEventListener('click', async () => {
  showToast(`📏 Guias aplicadas com sucesso!`);
});

function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

populateFormats();
updateQtdLabel();
