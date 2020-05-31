import React from "react"
import BookInfo from "./BookInfo"
import NotificationType from '../utils/NotificationType'
import SuccessNotification from './reusables/SuccessNotification'
import FailNotification from './reusables/FailNotification'

export class BookList extends React.Component {
    renderSaveNote = () => {
        if (this.props.saveNote === NotificationType.success) {
            console.log('object save')
            return <SuccessNotification
                style={notificationStyle}
                text='Zmiany zostały zapisane.'
                onClose={this.props.closeSaveNote}
            />
        }
        if (this.props.saveNote === NotificationType.fail) {
            console.log('object save')
            return <FailNotification
                style={notificationStyle}
                text='Zmiana nie udała się.'
                onClose={this.props.closeSaveNote} />
        }
    }

    renderDeleteNote = () => {
        if (this.props.deleteNote === NotificationType.success) {
            console.log('object delete')
            return <SuccessNotification
                style={notificationStyle}
                text='Opinia została usunięta.'
                onClose={this.props.closeDeleteNote}
            />
        }
        if (this.props.deleteNote === NotificationType.fail) {
            console.log('object delete')
            return <FailNotification
                style={notificationStyle}
                text='Nie udało się usunąć opinii.'
                onClose={this.props.closeDeleteNote} />
        }
    }

    render() {
        const list = this.props.books.map(book =>
            <BookInfo
                key={book.id}
                user={this.props.user}
                book={book}
                postOpinion={this.props.postOpinion}
                deleteOpinion={this.props.deleteOpinion}
                updateOpinion={this.props.updateOpinion}
            />)
        return (
            <div>
                {this.renderSaveNote()}
                {this.renderDeleteNote()}
                {list}
            </div>
        )
    }
}

const notificationStyle = {
    marginTop: '1rem',
}

export default BookList;