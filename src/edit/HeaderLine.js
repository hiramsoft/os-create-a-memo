import React, {Component} from 'react';

export default class HeaderLine extends Component {

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

        const {name, placeholder, type} = this.props;
        const {value} = this.state;

        return <div className="header-line">
            <span className="header-label">
                {name}
            </span>
            <span className="header-value">
                <input
                    className="value-value-input"
                    placeholder={placeholder}
                    defaultValue={value}
                    type={type}
                    onChange={this.onChange.bind(this)}
                />
            </span>

        </div>
    }
}

HeaderLine.defaultProps = {
    type: 'text',
    placeholder: '',
    defaultValue: ''
};