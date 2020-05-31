import React from "react"
import BookOpinion from "./reusables/BookOpinion"
import UserBookOpinion from "./reusables/UserBookOpinion"
//import SuccessNotification from './reusables/SuccessNotification'
//import FailNotification from './reusables/FailNotification'
//import NotificationType from '../utils/NotificationType'

class BookOpinionList extends React.Component {
    renderUserOpinion = userOpinion => {
        if (!userOpinion) {
            return <UserBookOpinion
            key={this.props.user.userId}
            opinion={null}
            user={this.props.user}
            bookId={this.props.bookId}
            postOpinion={this.props.postOpinion}
            updateOpinion={this.props.updateOpinion}
            deleteOpinion={this.props.deleteOpinion}
        />
        }
        return <UserBookOpinion
            key={this.props.user.userId}
            opinion={userOpinion}
            user={this.props.user}
            bookId={this.props.bookId}
            postOpinion={this.props.postOpinion}
            updateOpinion={this.props.updateOpinion}
            deleteOpinion={this.props.deleteOpinion}
        />
    }

    renderOpinionsWhileLoggedIn = () => {
        const userOpinion = this.props.opinions ? 
            this.props.opinions.find(o => o.userId === this.props.user.userId) : null
        const list = this.props.opinions
            .filter(o => o.userId !== this.props.user.userId)
            .map(opinion =>
                <BookOpinion
                    key={opinion.userId}
                    opinion={opinion}
                />)
        const classResult = defaultClassName + (this.props.className ? this.props.className : '')
        return (
            <div className={classResult} style={containerStyle}>
                {this.renderUserOpinion(userOpinion)}
                {list}
            </div>
        )
    }

    renderOpinionsWhileLoggedOff = () => {
        const list = this.props.opinions.map(opinion =>
            <BookOpinion
                key={opinion.userId}
                opinion={opinion}
            />)
        const classResult = defaultClassName + (this.props.className ? this.props.className : '')

        return (
            <div className={classResult} style={containerStyle}>
                {list}
            </div>
        )
    }

    render() {
        if (this.props.user) {
            return this.renderOpinionsWhileLoggedIn()
        }
        else {
            return this.renderOpinionsWhileLoggedOff()
        }
    }
}

const defaultClassName = 'flex-column '

/*const notificationStyle = {
    //marginTop: '1rem',
}*/

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 0',
}

export default BookOpinionList;