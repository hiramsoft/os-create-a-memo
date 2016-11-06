import React, {Component} from 'react';
import {render} from 'react-dom';

import EditMemoComponent from "./edit/EditMemoComponent.js";
import ViewMemoPdfComponent from "./view/ViewMemoPdfComponent.js";

//import defaultModel from './DefaultModel.test.js';
import defaultModel from './DefaultModel.prod.js';

class CreateAMemoApp extends Component {

    componentWillMount(){
        // defaults
        this.setState({
            isEdit: true,
            memoModel: defaultModel
        });
    }

    onViewPdf(event){
        this.setState({
            isEdit: false,
            memoModel: event.memoModel
        });
    }

    onEditPdf(event){
        this.setState({
            isEdit: true,
            memoModel: event.memoModel
        });
    }

    render() {

        const {isEdit, memoModel} = this.state;

        if(isEdit){
            return <EditMemoComponent memoModel={memoModel} onViewPdf={this.onViewPdf.bind(this)}/>
        }
        else {
            return <ViewMemoPdfComponent memoModel={memoModel} onEditPdf={this.onEditPdf.bind(this)}/>
        }
    }
}

render(<CreateAMemoApp/>, document.getElementById('create-a-memo-app'));