import React from 'react'
import TopBarButton from './reusables/TopBarButton'
import Header from './reusables/Header'

function TopBar({ className = '', toggleLoginModal, toggleRegisterModal }) {
    return (
        <div className={className} style={topBarStyle}>
            <div className='flex-side' />
            <div className='flex-side' />
            <div className='flex-side' />
            <Header text='Bookmark' style={{ fontSize: '2.1rem' }} />
            <div className='flex-side' />
            <TopBarButton
                className='flex-side green-bc-trans'
                style={buttonStyle}
                text='Zarejestruj się'
                onClick={() => toggleRegisterModal(true)}
            />
            <TopBarButton
                className='flex-side green-bc-trans'
                style={buttonStyle}
                text='Zaloguj się'
                onClick={() => toggleLoginModal(true)}
            />
        </div>
    )
}

const buttonStyle = {
    borderWidth: '1px',
    borderColor: '#242',
    borderStyle: 'none none none dashed',
}

const topBarStyle = {
    display: 'flex',
    background: '#353',
    color: '#eee',
}

export default TopBar