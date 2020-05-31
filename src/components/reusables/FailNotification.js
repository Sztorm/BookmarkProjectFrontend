import React from 'react'
import CloseButton from './CloseButton'

function FailNotification({ text, onClose, className = '', style, textClassName = '' }) {
    const styleResult = Object.assign({}, defaultStyle, style);
    const classResult = defaultClass + className;

    return (
        <div className={classResult} style={styleResult}>
            <p className={textClassName} style={textStyle}>{text}</p>
            <div className='flex-side' />
            <CloseButton className="dark-grey-col-trans" onClick={onClose} />
        </div>
    )
}

const defaultClass = 'flex-row '

const defaultStyle = {
    backgroundColor: '#e0384144',
    border: '3px solid #e03841',
    borderRadius: '4px',
}

const textStyle = {
    color: '#e03841',
    padding: '1rem 0 1rem 1rem',
    fontSize: '1.1rem',
}

export default FailNotification