import React from 'react'

export class CheckBox extends React.Component {
    state = {
        value: false
    }

    onCheck = () => {
        const newValue = !this.state.value

        this.setState({
            value: newValue
        })
        this.props.onClick(newValue)
    }

    render() {
        const styleResult = Object.assign({}, defaultStyle, this.props.style);
        const classResult = defaultClass + (this.props.className ?? '');

        return (
            <span className={classResult} style={styleResult} onClick={this.onCheck} >{this.state.value && '\u2714'}</span>
        )
    }
}

const defaultClass = ''
const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#353',
    padding: '0.7rem',
    width: '1rem',
    height: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    userSelect: 'none',
}

export default CheckBox