import React from 'react'
import Header from './Header'
import CloseButton from './CloseButton'

function ModalTop({ text, onClose, className = '', style, headerClassName = '', headerStyle }) {
    const styleResult = Object.assign({}, defaultStyle, style);
    const headerStyleResult = Object.assign({}, defaultHeaderStyle, headerStyle);
    const classResult = defaultClass + className;

    return (
        <div className={classResult} style={styleResult}>
            <div className='flex-side' />
            <Header className={headerClassName} style={headerStyleResult} text={text} />
            <div className='flex-side' />
            <CloseButton className="grey-col-trans" onClick={onClose} />
        </div>
    )
}

const defaultClass = 'flex-row '
const defaultStyle = {
    backgroundColor: '#353',
}
const defaultHeaderStyle = {
    color: '#eee',
    fontSize: '1.7rem',
}

export default ModalTop