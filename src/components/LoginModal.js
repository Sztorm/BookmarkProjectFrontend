import React from 'react'
import ModalTop from './reusables/ModalTop'
import Button from './reusables/Button'
import FailNotification from './reusables/FailNotification'
import NotificationType from '../utils/NotificationType'

export class LoginModal extends React.Component {
    state = {
        login: '',
        password: '',
        formNotFilledNote: NotificationType.none,
    }

    onBackgroundClick = event => {
        if (event.target === event.currentTarget) {
            this.props.toggleLoginModal(false)
        }
    }

    onCloseButtonClick = () => {
        this.props.toggleLoginModal(false)
    }

    onLoginInputChange = event => {
        this.setState({ 
            login: event.target.value,
            formNotFilledNote: NotificationType.none,
        })
    }

    onPasswordInputChange = event => {
        this.setState({ 
            password: event.target.value,
            formNotFilledNote: NotificationType.none,
        })
    }

    onFormNotFilledNoteClose = () => {
        this.setState({ formNotFilledNote: NotificationType.none })
    }

    isFormFilled = () => {
        const { login, password } = this.state

        return login && login.length !== 0 &&
            password && password.length !== 0
    }

    renderFormNotFilledNote = () => {
        if (this.state.formNotFilledNote === NotificationType.fail) {
            return <FailNotification
                style={notificationStyle}
                text='Wszystkie pola muszą zostać wypełnione.'
                onClose={this.onFormNotFilledNoteClose} />
        }
    }

    onFormSubmit = event => {
        event.preventDefault()
        
        if (!this.isFormFilled()) {
            this.setState({
                formNotFilledNote: NotificationType.fail,
            })
            return
        }
        this.props.onFormSubmit({
            login: this.state.login,
            password: this.state.password
        })
        this.setState({
            login: '',
            password: '',
            formNotFilledNote: NotificationType.none,
        })
    }

    onRegisterButtonClick = () => {
        this.props.toggleRegisterModal(true)
        this.onCloseButtonClick()
    }

    render() {
        if (!this.props.isActive) {
            return <div />
        }
        return (
            <div className="modal-container" onClick={this.onBackgroundClick}>
                <div className='flex-row' style={{ minHeight: '70%' }}>
                    <div className='flex-side' onClick={this.onBackgroundClick} />
                    <div className="flex-col-70" style={modalContentStyle}>
                        <ModalTop text='Logowanie' onClose={this.onCloseButtonClick} />
                        <div className='flex-row flex-wrap'>
                            <div className='flex-column' style={loginDescriptionSection}>
                                <p style={textStyle}>Odkryj niesamowity zbiór książek.</p>
                                <p style={textStyle}>Zamieść opinię o przeczytanych i zobacz, co o nich sądzą inni!</p>
                                <img src='login-books.jpg' alt='books' style={imageStyle} />
                            </div>
                            <div className='flex-column' style={loginControlsSection}>
                                <form className="flex-column" onSubmit={this.onFormSubmit}>
                                    <input
                                        style={formInputStyle}
                                        placeholder="Login"
                                        type="text"
                                        value={this.state.login}
                                        onChange={this.onLoginInputChange}
                                    />
                                    <input
                                        style={formInputStyle}
                                        placeholder="Hasło"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onPasswordInputChange}
                                    />
                                </form>
                                {this.renderFormNotFilledNote()}
                                <Button text='Zaloguj się' onClick={this.onFormSubmit}/>
                                <p style={registerTextStyle}>Nie masz konta?</p>
                                <Button text='Zarejestruj się' onClick={this.onRegisterButtonClick} />
                            </div>
                        </div>
                    </div>
                    <div className='flex-side' onClick={this.onBackgroundClick} />
                </div>
            </div>
        )
    }
}

const notificationStyle = {
    marginBottom: '1rem',
}

const textStyle = {
    fontSize: '1.3rem',
}

const registerTextStyle = {
    fontSize: '1.3rem',
    margin: '1rem 0'
}

const imageStyle = {
    display: 'flex',
    alignSelf: 'flex-end',
    marginTop: '1rem',
    maxWidth: '100%',
    height: 'auto',
}

const formInputStyle = {
    marginBottom: '1rem',
}

const modalContentStyle = {
    backgroundColor: '#fff',
    minHeight: '70%',
    alignSelf: 'center',
}

const loginDescriptionSection = {
    padding: '1rem',
    minWidth: 'min(384px, 100%)',
    width: '50%',
    flexGrow: '1',
}

const loginControlsSection = {
    padding: '1rem',
    minWidth: 'min(384px, 100%)',
    width: '50%',
    flexGrow: '1',
}

export default LoginModal
