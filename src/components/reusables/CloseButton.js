import React from 'react'

function CloseButton({ onClick, className = '', style }) {
    const styleResult = Object.assign({}, defaultStyle, style);

    return (
        <span className={className} style={styleResult}>
            <span onClick={onClick} style={closeSignStyle}>&times;</span>
        </span>
    )
}

const closeSignStyle = {
    cursor: 'pointer',
}

const defaultStyle = {
    color: '#eee',
    fontSize: '2.1rem',
    fontWeight: 'bold',
    lineHeight: '0.9',
}

export default CloseButton