// ============================================================================
// ESQUADЯO — HostScript ExtendScript para Adobe Illustrator & Photoshop
// ============================================================================

function createArtboardsFromJSON(fmtJson, count) {
    try {
        var fmt = eval('(' + fmtJson + ')');
        var doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, fmt.width, fmt.height);
        
        for (var i = 0; i < count; i++) {
            var ab;
            if (i === 0 && doc.artboards.length === 1 && app.documents.length === 1) {
                ab = doc.artboards[0];
                ab.artboardRect = [0, 0, fmt.width, -fmt.height];
            } else {
                var offsetX = i * (fmt.width + 100);
                ab = doc.artboards.add([offsetX, 0, offsetX + fmt.width, -fmt.height]);
            }
            
            // Desenha guias
            drawGuidesForArtboard(doc, ab, fmt, i === 0);
        }
        return "SUCCESS";
    } catch(e) {
        return "ERROR: " + e.message;
    }
}

function applyGuidesToActive(fmtJson) {
    try {
        if (app.documents.length === 0) return "NO_DOC";
        var fmt = eval('(' + fmtJson + ')');
        var doc = app.activeDocument;
        var ab = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        drawGuidesForArtboard(doc, ab, fmt, true);
        return "SUCCESS";
    } catch(e) {
        return "ERROR: " + e.message;
    }
}

function drawGuidesForArtboard(doc, ab, fmt, isFirst) {
    var rect = ab.artboardRect;
    var left = rect[0];
    var top = rect[1];
    var right = rect[2];
    var bottom = rect[3];

    // 1. Safe Zone
    if (fmt.safe) {
        var sLeft = left + fmt.safe.left;
        var sRight = right - fmt.safe.right;
        var sTop = top - fmt.safe.top;
        var sBottom = bottom + fmt.safe.bottom;

        createGuideLine(doc, sLeft, top, sLeft, bottom);
        createGuideLine(doc, sRight, top, sRight, bottom);
        createGuideLine(doc, left, sTop, right, sTop);
        createGuideLine(doc, left, sBottom, right, sBottom);
    }

    // 2. Crop Feed (Apenas na 1ª prancheta)
    if (isFirst) {
        if (fmt.crop && fmt.crop.lateral) {
            createGuideLine(doc, left + fmt.crop.lateral, top, left + fmt.crop.lateral, bottom);
            createGuideLine(doc, right - fmt.crop.lateral, top, right - fmt.crop.lateral, bottom);
        }
        if (fmt.cropFeed) {
            if (fmt.cropFeed.top) createGuideLine(doc, left, top - fmt.cropFeed.top, right, top - fmt.cropFeed.top);
            if (fmt.cropFeed.bottom) createGuideLine(doc, left, bottom + fmt.cropFeed.bottom, right, bottom + fmt.cropFeed.bottom);
        }
    }
}

function createGuideLine(doc, x1, y1, x2, y2) {
    var line = doc.pathItems.line(x1, y1, x2, y2);
    line.guides = true;
}
