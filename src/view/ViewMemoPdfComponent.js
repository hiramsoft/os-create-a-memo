import React, {Component} from 'react';
import PdfService from './PdfService.js';

export default class MemoPdfComponent extends Component {

    componentWillMount(){

        const {memoModel} = this.props;

        if(!memoModel){
            return;
        }

        const output = this.drawPdf(memoModel);

        const toPortionFilename = (memoModel.To ? ` To ${memoModel.To}` : '');
        const fromPortionFilename = (memoModel.From ? ` From ${memoModel.From}` : '');
        const datePortionFilename = (memoModel.Date ? ` On ${memoModel.Date}` : '');

        const downloadFilename = `Memo${toPortionFilename}${fromPortionFilename}${datePortionFilename}.pdf`;

        this.setState({output: output, downloadFilename: downloadFilename});
    }

    drawPdf(memoModel){
        console.log("drawPdf()", memoModel);

        const doc = PdfService.PdfDocFactory('letter');

        doc.setFontType("bold");
        doc.setFontSize(64);
        doc.text("Memo", 64, 96);
        doc.setFontType("normal");

        // this is the drawing pointer
        var headingLineTop = 140;


        const headingLineHeight = 30;
        const headingLabelLeft = 100;
        const headingValueLeft = 170;

        function drawHeading(label, value, top){
            doc.setFontType("bold");
            doc.text(label, headingLabelLeft, top);
            doc.setFontType("normal");
            doc.text(value, headingValueLeft, top);
            return top + headingLineHeight;
        }

        const hrLineHeight = 15;
        const hrWidth = 450;
        const hrHeight = 2;
        function drawHr(top){

            doc.setDrawColor(0);
            doc.setFillColor(0);
            doc.rect(headingLabelLeft, top - headingLineHeight + hrLineHeight, hrWidth, hrHeight, 'FD');

            return top + hrLineHeight;
        }

        doc.setFontSize(14);

        if(memoModel.To){
            headingLineTop = drawHeading('To:', memoModel.To, headingLineTop);
        }
        if(memoModel.From){
            headingLineTop = drawHeading('From:', memoModel.From, headingLineTop);
        }
        if(memoModel.CC){
            headingLineTop = drawHeading('CC:', memoModel.CC, headingLineTop);
        }
        if(memoModel.Date){
            headingLineTop = drawHeading('Date:', memoModel.Date, headingLineTop);
        }
        if(memoModel.Subject){
            headingLineTop = drawHeading('Subject:', memoModel.Subject, headingLineTop);
        }

        headingLineTop = drawHr(headingLineTop);

        function drawContact(doc, memoModel, minY, maxY) {
            if(memoModel.Contact){
                PdfService.drawCenterText(doc, 0, doc.pageWidth, minY, maxY, memoModel.Contact);
            }
        }

        const marginBottom = 50;
        const maxYPos = doc.pageHeight - marginBottom;

        if(memoModel.Body){
            var lines = doc.splitTextToSize(memoModel.Body, hrWidth);

            var YPos = headingLineTop;
            var lastLineH = 0;

            for(var i=0;i<lines.length;i++) {
                const line = lines[i];
                var dims = doc.getTextDimensions(line);

                if(dims.h < 5){
                    console.log("I think I found a blank line:", dims.h, line);
                    dims.h = lastLineH;
                }
                else {
                    lastLineH = dims.h;
                }

                const XPos = headingLabelLeft;
                if(YPos > maxYPos){
                    // draw on current page
                    drawContact(doc, memoModel, maxYPos, doc.pageHeight);

                    PdfService.addPage(doc);

                    YPos = marginBottom;
                }
                doc.text(XPos, YPos, line);
                YPos += dims.h;
            }
        }

        // draw final line
        drawContact(doc, memoModel, maxYPos, doc.pageHeight);


        const output = PdfService.getUriString(doc);
        return output;
    }

    componentWillReceiveProps(nextProps){

        console.log("ViewMemoPdfComponent.componentWillReceiveProps()", nextProps);

        const {memoModel} = nextProps;

        if(!memoModel){
            return;
        }

        const output = this.drawPdf(memoModel);

        const toPortionFilename = (memoModel.To ? ` To ${memoModel.To}` : '');
        const fromPortionFilename = (memoModel.From ? ` From ${memoModel.From}` : '');
        const datePortionFilename = (memoModel.Date ? ` From ${memoModel.Date}` : '');

        const downloadFilename = `Memo${toPortionFilename}${fromPortionFilename}${datePortionFilename}.pdf`;

        this.setState({output: output, downloadFilename: downloadFilename});

    }

    onEditPdf(){
        const {onEditPdf, memoModel} = this.props;
        if(onEditPdf){
            onEditPdf({memoModel: memoModel});
        }
    }

    render() {
        const {output, downloadFilename} = this.state;



        return <div>

            <div className="create-pdf-line">
                <button
                    className="create-pdf-button"
                    onClick={this.onEditPdf.bind(this)}
                >
                    Edit PDF
                </button>

                <a
                    className="create-pdf-button download-pdf-button"
                    download={downloadFilename}
                    href={output}
                >
                    Download PDF
                </a>
            </div>

            <iframe className="pdf-frame" src={output}></iframe>
        </div>
    }
}