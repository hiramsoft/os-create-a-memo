import React, {Component} from 'react';

import HeaderLine from "./HeaderLine.js";
import FooterLine from "./FooterLine.js";
import BodyContent from "./BodyContent.js";

const body_placeholder = `
Create a PDF memo instantly on your computer or mobile device. Get started by tapping any placeholder text (such as here) and start typing to replace it with your own. Only the fields you modify will appear on the memo.
`;

export default class EditMemoComponent extends Component {
    componentWillMount(){
        if(this.props.memoModel) {
            const copy = Object.assign({}, this.props.memoModel);
            this.setState({update: copy});
        }
        else {
            this.setState({update: {}});
        }
    }

    onModelChange(key, newValue){
        const nextUpdate = this.state.update || {};
        nextUpdate[key] = newValue;
        this.setState({update: nextUpdate});
    }

    componentWillReceiveProps(nextProps){
        const {memoModel} = nextProps;
        if(memoModel){
            this.setState({update: memoModel});
        }
    }

    createPdf(){
        const copy = Object.assign({}, this.state.update);
        const {onViewPdf} = this.props;
        if(onViewPdf){
            onViewPdf({memoModel: copy});
        }
    }

    render(){

        const {memoModel} = this.props;

        return <div>
            <span className="memo-line">
                <h1 className="h1-memo">
                    Memo
                </h1>
            </span>
            <HeaderLine
                name="To"
                onChange={this.onModelChange.bind(this)}
                placeholder="Recipient Name"
                defaultValue={memoModel.To}
            />
            <HeaderLine
                name="From"
                onChange={this.onModelChange.bind(this)}
                placeholder="Your Name"
                defaultValue={memoModel.From}
            />
            <HeaderLine
                name="CC"
                onChange={this.onModelChange.bind(this)}
                placeholder="Name"
                defaultValue={memoModel.CC}
            />
            <HeaderLine
                name="Date"
                onChange={this.onModelChange.bind(this)}
                defaultValue={memoModel.Date || defaultDate}
            />
            <HeaderLine
                name="Subject"
                onChange={this.onModelChange.bind(this)}
                placeholder="Subject"
                defaultValue={memoModel.Subject}
            />
            <BodyContent
                name="Body"
                onChange={this.onModelChange.bind(this)}
                placeholder={body_placeholder}
                defaultValue={memoModel.Body}
            />
            <FooterLine
                name="Contact"
                onChange={this.onModelChange.bind(this)}
                placeholder="Contact information to show at the bottom of the page"
                defaultValue={memoModel.Contact}
            />

            <div className="create-pdf-line">
                <button
                    className="create-pdf-button"
                    onClick={this.createPdf.bind(this)}
                >
                    Create a PDF in your browser
                </button>
            </div>
        </div>
    }
}

EditMemoComponent.defaultProps = {
    memoModel : {}
};