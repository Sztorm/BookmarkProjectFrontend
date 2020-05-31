import React from 'react'

function SearchButton({ onClick, style, size='20px', className}) {
    const styleResult = Object.assign({}, defaultStyle, style)
    const classResult = defaultClass + className;

    return (
        <span className={classResult} style={styleResult} onClick={onClick}>
            <img
                className="search icon"
                src="./magnifier-white.svg"
                alt=""
                style={{ width: size, height: size }}
            />
        </span>
    )
}

const defaultClass = 'green-bc-trans '
const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#353',
    color: '#eee',
    padding: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    userSelect: 'none',
}

export default SearchButton