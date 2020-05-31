import React from 'react'
import Rating from './Rating'
import Button from './Button'
import DateFormatter from '../../utils/DateFormatter'

class UserOpinion extends React.Component {
    state = {
        isInEditState: false,
        editedComment: '',
        editedRating: this.props.opinion.rating,
    }

    componentDidMount() {
        this.setState({
            editedComment: this.props.opinion.comment
        })
    }

    toggleEditState = value => {
        this.setState({
            isInEditState: value,
        })
    }

    onDeleteButtonClick = () => {
        this.setState({
            isInEditState: false,
        }, () => this.props.deleteOpinion(this.props.opinion._id))
    }

    onSaveButtonClick = () => {
        this.props.updateOpinion({
            opinionId: this.props.opinion._id,
            comment: this.state.editedComment,
            rating: this.state.editedRating,
        }, () => this.setState({
            isInEditState: false,
        }))
    }

    onCommentTextChange = event => {
        this.setState({
            editedComment: event.target.value
        })
    }

    onRatingChange = value => {
        this.setState({
            editedRating: value
        })
    }

    renderComment = opinionInfo => {
        if (opinionInfo.comment && opinionInfo.comment.length > 0) {
            return (
                <div>
                    <p>{opinionInfo.comment}</p>
                </div>
            )
        }
    }

    renderImmutableRating = opinion => {
        return <Rating
            maxValue={10}
            startValue={opinion.rating}
        />
    }

    renderOpinion = (bookInfo, opinionInfo) => {
        if (this.state.isInEditState) {
            return (
                <div>
                    <div className='flex-row flex-wrap'>
                        <div className='flex-column'>
                            <p style={titleStyle}>{bookInfo.title}</p>
                            {bookInfo.authors}
                        </div>
                        <div className='flex-side' />
                        <div className='flex-row'>
                            <Button
                                text='Zapisz'
                                onClick={this.onSaveButtonClick}
                            />
                            <Button
                                style={editButtonStyle}
                                text='Anuluj'
                                onClick={() => this.toggleEditState(false)}
                            />
                            <Button
                                style={editButtonStyle}
                                text='Usuń'
                                onClick={this.onDeleteButtonClick}
                            />
                        </div>
                    </div>
                    <div style={opinionStyle}>
                        <Rating
                            maxValue={10}
                            startValue={this.state.editedRating}
                            isMutable={true}
                            onChange={this.onRatingChange}
                        />
                        <textarea
                            placeholder="Komentarz"
                            value={this.state.editedComment}
                            onChange={this.onCommentTextChange}
                        />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className='flex-row'>
                        <div className='flex-column'>
                            <p style={titleStyle}>{bookInfo.title}</p>
                            {bookInfo.authors}
                        </div>
                        <div className='flex-side' />
                        <Button text='Edytuj' onClick={() => this.toggleEditState(true)} />
                    </div>
                    <div style={opinionStyle}>
                        <p>{opinionInfo.date}</p>
                        {this.renderImmutableRating(this.props.opinion)}
                        {this.renderComment(opinionInfo)}
                    </div>
                </div>
            )
        }
    }

    render() {
        const { opinion, book } = this.props
        const doThumbnailExist = book.volumeInfo.hasOwnProperty('imageLinks')
        const doAuthorsExist = book.volumeInfo.hasOwnProperty('authors')
        const bookInfo = {
            title: book.volumeInfo.title,
            authors: doAuthorsExist ?
                book.volumeInfo.authors.join(', ') : "Autor nieznany",
            thumbnailSrc: doThumbnailExist ?
                book.volumeInfo.imageLinks.thumbnail : './green-book.png',
        }
        const opinionInfo = {
            date: DateFormatter.getFormatted(new Date(opinion.date)),
            rating: opinion.rating,
            comment: opinion.comment,
        }
        return (
            <div style={containerStyle}>
                <img
                    style={thumbnailStyle}
                    src={bookInfo.thumbnailSrc}
                    alt={bookInfo.title}
                />
                <div style={infoStyle}>
                    {this.renderOpinion(bookInfo, opinionInfo)}
                </div>
            </div>
        )
    }
}

const editButtonStyle = {
    marginLeft: '1rem',
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 0px',
    borderBottom: '1px solid #999',
}

const thumbnailStyle = {
    minWidth: '150px',
    width: '150px',
    height: '100%',
    boxShadow: '2px 2px 10px 1px #4d4d4d4d',
}

const infoStyle = {
    padding: '10px 15px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontSize: '1.1rem',
}

const titleStyle = {
    fontSize: '1.4rem',
}

const opinionStyle = {
    marginTop: '1rem',
}

export default UserOpinion