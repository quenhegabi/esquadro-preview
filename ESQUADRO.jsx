// ============================================================================
// ESQUADЯO — Lápis Raro (v1.0)
// Plugin / Script de Pranchetas e Guias para Adobe Illustrator & Photoshop
// ============================================================================

(function() {
    var isAI = (typeof app !== 'undefined' && app.name === 'Adobe Illustrator');
    var isPS = (typeof app !== 'undefined' && app.name === 'Adobe Photoshop');

    if (!isAI && !isPS) {
        alert("O ESQUADЯO precisa ser executado no Adobe Illustrator ou Photoshop.");
        return;
    }

    // Banco de Formatos Auditados (Guia 2026 Lápis Raro)
    var platforms = {
        "Instagram": [
            { name: "Avatar / Destaques (1:1)", w: 320, h: 320, safe: { t: 50, b: 50, l: 50, r: 50 } },
            { name: "Feed Quadrado (1:1)", w: 1080, h: 1080, cropLat: 135.2 },
            { name: "Feed Retrato (4:5)", w: 1080, h: 1350, cropLat: 34 },
            { name: "Feed Retrato (3:4)", w: 1080, h: 1440 },
            { name: "Story (9:16)", w: 1080, h: 1920, safe: { t: 110, b: 160, l: 100, r: 100 } },
            { name: "Reels (9:16)", w: 1080, h: 1920, safe: { t: 140, b: 300, l: 40, r: 40 }, noInfo: { w: 180, h: 750 } },
            { name: "Thumb Reels (9:16)", w: 1080, h: 1920, cropFeedTop: 240, cropFeedBot: 240 },
            { name: "Feed Paisagem (16:9)", w: 1080, h: 566, cropLat: 328 },
            { name: "Feed Paisagem (4:3)", w: 1080, h: 810, cropLat: 236.5 },
            { name: "Feed Paisagem (5:4)", w: 1080, h: 864, cropLat: 216 }
        ],
        "Facebook": [
            { name: "Avatar / Perfil (1:1)", w: 320, h: 320, safe: { t: 50, b: 50, l: 50, r: 50 } },
            { name: "Post Quadrado (1:1)", w: 1080, h: 1080 },
            { name: "Post Retrato (4:5)", w: 1080, h: 1359 },
            { name: "Carrossel (1:1)", w: 1200, h: 1200 },
            { name: "Post Paisagem (16:9)", w: 1080, h: 566 },
            { name: "Anúncio com Link (1,91:1)", w: 1200, h: 630 },
            { name: "Capa de Perfil (820x360)", w: 820, h: 360, safe: { t: 24, b: 24, l: 90, r: 90 }, noInfoLeft: { w: 180, h: 100 } },
            { name: "Capa de Grupo (1640x856)", w: 1640, h: 856 },
            { name: "Capa de Evento (1920x1005)", w: 1920, h: 1005 }
        ],
        "LinkedIn": [
            { name: "Perfil / Bio (1:1)", w: 400, h: 400, safe: { t: 50, b: 50, l: 50, r: 50 } },
            { name: "Post Quadrado (1:1)", w: 1080, h: 1080 },
            { name: "Post Retrato (4:5)", w: 1080, h: 1350 },
            { name: "Post Paisagem (1,91:1)", w: 1200, h: 627 },
            { name: "Capa de Perfil (4:1)", w: 1584, h: 396 },
            { name: "Vídeo Vertical (9:16)", w: 1080, h: 1920 }
        ],
        "TikTok": [
            { name: "Avatar / Perfil (1:1)", w: 200, h: 200, safe: { t: 20, b: 20, l: 20, r: 20 } },
            { name: "For You / Vídeo (9:16)", w: 1080, h: 1920, safe: { t: 140, b: 300, l: 40, r: 40 } },
            { name: "Thumb Capa (4:5)", w: 1080, h: 1920, cropFeedTop: 285, cropFeedBot: 285 }
        ],
        "WhatsApp": [
            { name: "Perfil (1:1)", w: 200, h: 200, safe: { t: 20, b: 20, l: 20, r: 20 } },
            { name: "Status (9:16)", w: 1080, h: 1920, safe: { t: 120, b: 160, l: 100, r: 100 } },
            { name: "Thumb Imagem / Doc (2:3)", w: 1200, h: 1800 },
            { name: "Sticker / Figurinha (1:1)", w: 512, h: 512, safe: { t: 16, b: 16, l: 16, r: 16 } }
        ],
        "X (Twitter)": [
            { name: "Avatar / Perfil (1:1)", w: 400, h: 400, safe: { t: 20, b: 20, l: 20, r: 20 } },
            { name: "Post Quadrado (1:1)", w: 1080, h: 1080 },
            { name: "Post Retangular (16:9)", w: 1200, h: 675 },
            { name: "Card / Link (2:1)", w: 800, h: 418 },
            { name: "Capa do Perfil (3:1)", w: 1500, h: 500, safe: { t: 140, b: 140, l: 282.5, r: 282.5 } }
        ],
        "YouTube": [
            { name: "Avatar / Canal (1:1)", w: 800, h: 800, safe: { t: 20, b: 20, l: 20, r: 20 } },
            { name: "Thumbnail (16:9)", w: 1280, h: 720 },
            { name: "Shorts (9:16)", w: 1080, h: 1920, safe: { t: 120, b: 160, l: 60, r: 60 } },
            { name: "Capa do Canal (16:9)", w: 2560, h: 1440, safe: { t: 508.5, b: 508.5, l: 507, r: 507 } }
        ]
    };

    // Construção do Diálogo
    var win = new Window('dialog', 'ESQUADЯO — Lápis Raro');
    win.orientation = 'column';
    win.alignChildren = ['fill', 'top'];

    // Header
    var pHead = win.add('group');
    pHead.add('statictext', undefined, 'ESQUADЯO — LÁPIS RAЯO (BRAND INTELLIGENCE)');

    // Dropdown Plataforma
    var pGroup = win.add('group');
    pGroup.add('statictext', undefined, 'PLATAFORMA:');
    var platformKeys = ["Instagram", "Facebook", "LinkedIn", "TikTok", "WhatsApp", "X (Twitter)", "YouTube"];
    var platformDrop = pGroup.add('dropdownlist', undefined, platformKeys);
    platformDrop.selection = 0;

    // Dropdown Formato
    var fGroup = win.add('group');
    fGroup.add('statictext', undefined, 'FORMATO:');
    var formatDrop = fGroup.add('dropdownlist', undefined, []);

    function updateFormatList() {
        formatDrop.removeAll();
        var pName = platformKeys[platformDrop.selection.index];
        var list = platforms[pName] || [];
        for (var i = 0; i < list.length; i++) {
            formatDrop.add('item', list[i].name);
        }
        formatDrop.selection = 0;
    }

    platformDrop.onChange = updateFormatList;
    updateFormatList();

    // Quantidade
    var qGroup = win.add('group');
    qGroup.add('statictext', undefined, 'QUANTIDADE DE PRANCHETAS:');
    var qInput = qGroup.add('edittext', undefined, '1');
    qInput.preferredSize.width = 50;

    // Botões
    var btnGroup = win.add('group');
    btnGroup.alignment = 'center';
    var btnCreate = btnGroup.add('button', undefined, 'CRIAR PRANCHETA(S)');
    var btnGuides = btnGroup.add('button', undefined, 'APLICAR APENAS GUIAS');
    var btnCancel = btnGroup.add('button', undefined, 'CANCELAR');

    btnCancel.onClick = function() { win.close(); };

    btnCreate.onClick = function() {
        var pName = platformKeys[platformDrop.selection.index];
        var fmt = platforms[pName][formatDrop.selection.index];
        var count = parseInt(qInput.text) || 1;
        win.close();
        
        if (isAI) {
            createIllustratorArtboards(fmt, count);
        } else if (isPS) {
            alert("Para o Photoshop, utilize o painel UXP oficial do ESQUADЯO.");
        }
    };

    btnGuides.onClick = function() {
        var pName = platformKeys[platformDrop.selection.index];
        var fmt = platforms[pName][formatDrop.selection.index];
        win.close();

        if (isAI) {
            drawIllustratorGuidesOnCurrent(fmt);
        }
    };

    win.center();
    win.show();

    // Engine do Illustrator
    function createIllustratorArtboards(fmt, count) {
        var doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, fmt.w, fmt.h);
        
        for (var i = 0; i < count; i++) {
            var ab;
            if (i === 0 && app.activeDocument.artboards.length === 1) {
                ab = doc.artboards[0];
                ab.artboardRect = [0, 0, fmt.w, -fmt.h];
            } else {
                var offsetX = i * (fmt.w + 100);
                ab = doc.artboards.add([offsetX, 0, offsetX + fmt.w, -fmt.h]);
            }
            
            // Desenha guias
            drawGuidesForArtboard(doc, ab, fmt, i === 0);
        }
        alert("✅ " + count + " prancheta(s) [" + fmt.name + "] criada(s) com sucesso no Illustrator!");
    }

    function drawIllustratorGuidesOnCurrent(fmt) {
        if (app.documents.length === 0) {
            alert("Nenhum documento aberto no Illustrator.");
            return;
        }
        var doc = app.activeDocument;
        var ab = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        drawGuidesForArtboard(doc, ab, fmt, true);
        alert("📏 Guias de " + fmt.name + " aplicadas com sucesso!");
    }

    function drawGuidesForArtboard(doc, ab, fmt, isFirst) {
        var rect = ab.artboardRect;
        var left = rect[0];
        var top = rect[1];
        var right = rect[2];
        var bottom = rect[3];

        // Safe Zone Margins (Guias)
        if (fmt.safe) {
            var sLeft = left + fmt.safe.l;
            var sRight = right - fmt.safe.r;
            var sTop = top - fmt.safe.t;
            var sBottom = bottom + fmt.safe.b;

            createGuideLine(doc, sLeft, top, sLeft, bottom);
            createGuideLine(doc, sRight, top, sRight, bottom);
            createGuideLine(doc, left, sTop, right, sTop);
            createGuideLine(doc, left, sBottom, right, sBottom);
        }

        // Crop Feed (Apenas na 1ª prancheta se count > 1)
        if (isFirst) {
            if (fmt.cropLat) {
                createGuideLine(doc, left + fmt.cropLat, top, left + fmt.cropLat, bottom);
                createGuideLine(doc, right - fmt.cropLat, top, right - fmt.cropLat, bottom);
            }
            if (fmt.cropFeedTop) {
                createGuideLine(doc, left, top - fmt.cropFeedTop, right, top - fmt.cropFeedTop);
                createGuideLine(doc, left, bottom + fmt.cropFeedBot, right, bottom + fmt.cropFeedBot);
            }
        }
    }

    function createGuideLine(doc, x1, y1, x2, y2) {
        var line = doc.pathItems.line(x1, y1, x2, y2);
        line.guides = true;
    }
})();
