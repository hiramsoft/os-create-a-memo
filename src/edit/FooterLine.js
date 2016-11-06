import React, {Component} from 'react';

export default class FooterLine extends Component {

    componentWillMount(){
        const startingValue = this.props.defaultValue || '';
        this.setState({value : startingValue});
    }

    componentWillReceiveProps(nextProps){
        const {defaultValue} = nextProps;
        if(defaultValue){
            this.setState({value : defaultValue});
        }
    }

    onChange(event){
        const nextValue = event.target.value;
        this.setState({value : nextValue});

        const {onChange, name} = this.props;
        if(onChange){
            onChange(name, nextValue);
        }
    }

    render() {

        const {type, placeholder} = this.props;
        const {value} = this.state;

        return <div className="footer-line">
            <input
                className="footer-line-input"
                placeholder={placeholder}
                defaultValue={value}
                type={type}
                onChange={this.onChange.bind(this)}
            />
        </div>
    }
}

FooterLine.defaultProps = {
    type: 'text',
    placeholder: ''
};