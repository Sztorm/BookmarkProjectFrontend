import React from 'react'

function TopBarButton({ text = 'button', onClick, className = 'green-bc-trans', textClassName = '', style}) {
    const styleResult = Object.assign({}, defaultStyle, style)
    const classResult = className

    return (
        <span className={classResult} style={styleResult} onClick={onClick}>
            <span className={textClassName}>{text}</span>
        </span>
    )
}

const defaultStyle = {
    backgroundColor: '#353',
    fontSize: '1.1rem',
    textAlign: 'center',
    borderStyle: 'none',
    cursor: 'pointer',
    userSelect: 'none',
}

export default TopBarButton