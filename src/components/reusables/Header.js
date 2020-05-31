import React from 'react'

function Header({text, className = '', style}) {
    const styleResult = Object.assign({}, defaultStyle, style);

    return <h1 className={className} style={styleResult}>{text}</h1>
}

const defaultStyle = {
    display: 'flex',
    alignSelf: 'center',
    padding: '1rem 0px',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: '1.7rem',
}

export default Header