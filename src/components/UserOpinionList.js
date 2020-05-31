import React from "react"
import UserOpinion from "./reusables/UserOpinion"
import SuccessNotification from './reusables/SuccessNotification'
import FailNotification from './reusables/FailNotification'
import NotificationType from '../utils/NotificationType'

class UserOpinionList extends React.Component {
    renderSaveNote = () => {
        if (this.props.saveNote === NotificationType.success) {
            return <SuccessNotification
                text='Zmiany zostały zapisane.'
                onClose={this.props.closeSaveNote}
            />
        }
        if (this.props.saveNote === NotificationType.fail) {
            return <FailNotification
                text='Zmiana nie udała się.'
                onClose={this.props.closeSaveNote} />
        }
    }

    renderDeleteNote = () => {
        if (this.props.deleteNote === NotificationType.success) {
            return <SuccessNotification
                text='Opinia została usunięta.'
                onClose={this.props.closeDeleteNote}
            />
        }
        if (this.props.deleteNote === NotificationType.fail) {
            return <FailNotification
                text='Nie udało się usunąć opinii.'
                onClose={this.props.closeDeleteNote} />
        }
    }

    render() {
        const list = this.props.opinions.map(opinion =>
            <UserOpinion
                key={opinion.bookId}
                opinion={opinion}
                book={opinion.book}
                updateOpinion={this.props.updateOpinion}
                deleteOpinion={this.props.deleteOpinion}
            />)
        return (
            <div className={this.props.className} style={containerStyle}>
                {this.renderDeleteNote()}
                {this.renderSaveNote()}
                {list}
            </div>
        )
    }
}

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
}

export default UserOpinionList;