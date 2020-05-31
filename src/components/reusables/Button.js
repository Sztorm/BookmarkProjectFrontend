import React from 'react'

function Button({ onClick, text = 'button', className = '', textClassName = '', style }) {
    const styleResult = Object.assign({}, defaultStyle, style);
    const classResult = defaultClass + className;

    return (
        <span className={classResult} style={styleResult} onClick={onClick} >
            <span className={textClassName}>{text}</span>
        </span>
    )
}

const defaultClass = 'green-bc-trans '

const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#353',
    color: '#eee',
    fontSize: '1rem',
    padding: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    userSelect: 'none',
}

export default Button