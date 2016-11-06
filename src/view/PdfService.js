import jsPDF from '../vendor/jspdf.min.js';


/**
 * This is the bridge so only one file refers to the vendor
 */
class PdfService {
    /**
     *
     * @param format 'letter' or 'a4'
     * @constructor
     */

    PdfDocFactory(format = 'letter') {

        var doc = new jsPDF('p', 'pt', format);
        if (format == 'letter') {
            doc.pageWidth = 612;
            doc.pageHeight = 792;
        }
        else if (format == 'a4') {
            doc.pageWidth = 595.28;
            doc.pageHeight = 841.89;
        }

        return doc;
    }

    drawCenterText(doc, leftX, rightX, topY, bottomY, text) {
        var XWidth = rightX - leftX;
        var YHeight = bottomY - topY;
        var midpointX = XWidth / 2;
        var midpointY = YHeight / 2;


        var lines = doc.splitTextToSize(text, XWidth);
        var typicalDims = doc.getTextDimensions(lines[0]);
        var totalY = typicalDims.h * lines.length;
        var startY = bottomY - midpointY - (totalY / 2);
        if (doc.internal.getFontSize() > 16) {
            startY += (totalY / 3);
        }
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var dims = doc.getTextDimensions(line);
            var XPos = leftX + midpointX - (dims.w / 2);
            //console.log("Line = ", line, "typicalDims = ", typicalDims, "dims =", dims);
            var YPos = startY + (dims.h * (i) + (typicalDims.h / 2));
            doc.text(XPos, YPos, line);
        }
    };

    addPage(doc) {
        doc.addPage();
    };

    getUriString(doc) {
        return doc.output('datauristring');
    }

}

const singleton = new PdfService();

export default singleton;