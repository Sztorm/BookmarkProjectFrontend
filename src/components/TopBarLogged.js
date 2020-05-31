import React from 'react'
import TopBarButton from './reusables/TopBarButton'
import Header from './reusables/Header'

function TopBarLogged({ className = '', onLogout, toggleUserModal }) {
    return (
        <div className={className} style={topBarStyle}>
            <TopBarButton
                style={leftButtonStyle}
                className='flex-side green-bc-trans'
                text='Moje opinie'
                onClick={() => toggleUserModal(true)}
            />
            <div className='flex-side' />
            <div className='flex-side' />
            <Header text='Bookmark' style={{ fontSize: '2.1rem' }} />
            <div className='flex-side' />
            <div className='flex-side' />
            <TopBarButton
                style={rightButtonStyle}
                className='flex-side green-bc-trans'
                text='Wyloguj się'
                onClick={onLogout}
            />
        </div>
    )
}

const leftButtonStyle = {
    borderWidth: '1px',
    borderColor: '#242',
    borderStyle: 'none dashed none none',
}

const rightButtonStyle = {
    borderWidth: '1px',
    borderColor: '#242',
    borderStyle: 'none none none dashed',
}

const topBarStyle = {
    display: 'flex',
    background: '#353',
    color: '#eee',
}

export default TopBarLogged