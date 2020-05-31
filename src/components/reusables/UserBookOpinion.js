import React from 'react'
import Rating from './Rating'
import Button from './Button'
import DateFormatter from '../../utils/DateFormatter'

class UserBookOpinion extends React.Component {
    state = {
        isInEditState: false,
        editedComment: '',
        editedRating: 5,
    }

    componentDidMount() {
        if (this.props.opinion) {
            this.setState({
                editedComment: this.props.opinion.comment,
                editedRating: this.props.opinion.rating,
            })
        }
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
        if (this.props.opinion) {
            this.props.updateOpinion({
                opinionId: this.props.opinion._id,
                bookId: this.props.bookId,
                comment: this.state.editedComment,
                rating: this.state.editedRating,
            }, () => this.setState({
                isInEditState: false,
            }))
        }
        else {
            this.props.postOpinion({
                bookId: this.props.bookId,
                comment: this.state.editedComment,
                rating: this.state.editedRating,
            }, () => this.setState({
                isInEditState: false,
            }))
        }
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

    renderDeleteButton = () => {
        if (this.props.opinion) {
            return <Button
                text='Usuń'
                onClick={this.onDeleteButtonClick}
            />
        }
    }

    renderEditedOpinion = () => {
        return (
            <div>
                <div className='flex-row-rev flex-wrap' style={buttonContainerStyle}>
                    {this.renderDeleteButton()}
                    <Button
                        style={editButtonStyle}
                        text='Anuluj'
                        onClick={() => this.toggleEditState(false)}
                    />
                    <Button
                        style={editButtonStyle}
                        text='Zapisz'
                        onClick={this.onSaveButtonClick}
                    />
                </div>
                <div className="flex-column" style={containerStyle}>
                    <Rating
                        maxValue={10}
                        startValue={this.state.editedRating}
                        isMutable={true}
                        onChange={this.onRatingChange}
                        markedColor='#4a4'
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

    renderComment = () => {
        const { opinion } = this.props

        if (opinion.comment && opinion.comment.length > 0) {
            return (
                <div>
                    <p>{opinion.comment}</p>
                </div>
            )
        }
    }

    renderImmutableRating = opinion => {
        return <Rating
            maxValue={10}
            startValue={opinion.rating}
            markedColor='#4a4'
        />
    }

    renderNotEditedOpinion = () => {
        return (
            <div>
                <div className='flex-row' style={buttonContainerStyle}>
                    <div className='flex-side' />
                    <Button text='Edytuj' onClick={() => this.toggleEditState(true)} />
                </div>
                <div style={containerStyle}>
                    <div className='flex-row'>
                        <p>Twoja opinia:</p>
                        <div className='flex-side' />
                        <p>{DateFormatter.getFormatted(new Date(this.props.opinion.date))}</p>
                    </div>
                    {this.renderImmutableRating(this.props.opinion)}
                    {this.renderComment()}
                </div>
            </div>
        )
    }

    renderNotAddedOpinion = () => {
        return (
            <div>
                <div className='flex-row' style={buttonContainerStyle}>
                    <div className='flex-side' />
                    <Button text='Dodaj opinię' onClick={() => this.toggleEditState(true)} />
                </div>
            </div>
        )
    }

    render() {
        if (this.state.isInEditState) {
            return this.renderEditedOpinion()
        }
        else if (this.props.opinion) {
            return this.renderNotEditedOpinion()
        }
        else {
            return this.renderNotAddedOpinion()
        }
    }
}

const buttonContainerStyle = {
    marginBottom: '0.5rem'
}

const editButtonStyle = {
    marginRight: '1rem',
}

const containerStyle = {
    padding: '10px 0px',
    borderTop: '1px solid #999',
}

export default UserBookOpinion