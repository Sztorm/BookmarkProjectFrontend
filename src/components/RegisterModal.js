import React from 'react'
import ModalTop from './reusables/ModalTop'
import Button from './reusables/Button'
import CheckBox from './reusables/CheckBox'
import FailNotification from './reusables/FailNotification'
import NotificationType from '../utils/NotificationType'

export class RegisterModal extends React.Component {
    state = {
        email: '',
        name: '',
        password: '',
        isAgreementAccepted: false,
        agreementNote: NotificationType.none,
        formNotFilledNote: NotificationType.none,
    }

    onBackgroundClick = event => {
        if (event.target === event.currentTarget) {
            this.props.toggleRegisterModal(false)
        }
    }

    onCloseButtonClick = () => {
        this.props.toggleRegisterModal(false)
    }

    onEmailInputChange = event => {
        this.setState({ 
            email: event.target.value ,
            formNotFilledNote: NotificationType.none,
        })
    }

    onNameInputChange = event => {
        this.setState({ 
            name: event.target.value,
            formNotFilledNote: NotificationType.none,
        })
    }

    onPasswordInputChange = event => {
        this.setState({ 
            password: event.target.value,
            formNotFilledNote: NotificationType.none,
        })
    }

    onAgreementInputChange = value => {
        this.setState({
            agreementNote: NotificationType.none,
            isAgreementAccepted: value,
        })
    }

    onAgreementNoteClose = () => {
        this.setState({ agreementNote: NotificationType.none })
    }

    onFormNotFilledNoteClose = () => {
        this.setState({ formNotFilledNote: NotificationType.none })
    }

    isFormFilled = () => {
        const { email, name, password } = this.state

        return email && email.length !== 0 &&
            name && name.length !== 0 &&
            password && password.length !== 0
    }

    renderAgreementNote = () => {
        if (this.state.agreementNote === NotificationType.fail) {
            return <FailNotification
                style={notificationStyle}
                text='Aby się zarejestrować należy zaakceptować zgodę.'
                onClose={this.onAgreementNoteClose} />
        }
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
        let canSubmit = true
        if (!this.state.isAgreementAccepted) {
            this.setState({
                agreementNote: NotificationType.fail,
            })
            canSubmit = false
        }
        if (!this.isFormFilled()) {
            this.setState({
                formNotFilledNote: NotificationType.fail,
            })
            canSubmit = false
        }
        if (!canSubmit) {
            return
        }
        this.props.onFormSubmit({
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
        })
        this.setState({
            email: '',
            name: '',
            password: '',
            isAgreementAccepted: false,
            agreementNote: NotificationType.none,
            formNotFilledNote: NotificationType.none,
        })  
    }

    render() {
        if (!this.props.isActive) {
            return <div />
        }
        return (
            <div className="modal-container flex-col" onClick={this.onBackgroundClick}>
                <div className='flex-row' style={{ minHeight: '70%' }}>
                    <div className='flex-side' onClick={this.onBackgroundClick} />
                    <div className="flex-col-70" style={modalContentStyle}>
                        <ModalTop text='Rejestracja' onClose={this.onCloseButtonClick} />
                        <div className='flex-row flex-wrap'>
                            <div className='flex-column' style={descriptionSection}>
                                <p style={textStyle}>
                                    Zarejestruj się, by móc oceniać książki.
                                </p>
                                <p style={textStyle}>
                                    To nic nie kosztuje!
                                </p>
                                <img src='register-contract.jpg' alt='books' style={imageStyle} />
                            </div>
                            <div className='flex-column' style={controlsSection}>
                                <form className="flex-column" onSubmit={this.onFormSubmit}>
                                    <input
                                        style={formInputStyle}
                                        placeholder="Email"
                                        type="text"
                                        value={this.state.email}
                                        onChange={this.onEmailInputChange}
                                    />
                                    <input
                                        style={formInputStyle}
                                        placeholder="Nazwa użytkownika"
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.onNameInputChange}
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
                                {this.renderAgreementNote()}
                                <div className='flex-row' style={controlStyle}>
                                    <CheckBox onClick={this.onAgreementInputChange} value={this.state.isAgreementAccepted} style={{ marginRight: '1rem' }} />
                                    <p>Wyrażam zgodę na przetwarzanie przekazanych przeze mnie danych na potrzeby działania serwisu.</p>
                                </div>
                                <Button text='Zarejestruj się' onClick={this.onFormSubmit} />
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
    //maxHeight: '10000%',
    alignSelf: 'center',
}

const descriptionSection = {
    padding: '1rem',
    minWidth: 'min(384px, 100%)',
    width: '50%',
    flexGrow: '1',
}

const controlsSection = {
    padding: '1rem',
    minWidth: 'min(384px, 100%)',
    width: '50%',
    flexGrow: '1',
}

const controlStyle = {
    marginBottom: '1rem',
}

export default RegisterModal
