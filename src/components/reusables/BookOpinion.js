import React from 'react'
import Rating from './Rating'
import bookmarkApi from '../../apis/bookmarkApi'
import DateFormatter from '../../utils/DateFormatter'

class BookOpinion extends React.Component {
    state = {
        user: null
    }

    getUser = userId => {
        bookmarkApi
            .get(`/user/${userId}`)
            .then(user => {
                this.setState({
                    user: user.data.info
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getUser(this.props.opinion.userId)
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
        />
    }

    render() {
        return (
            <div style={containerStyle}>
                <div className='flex-row'>
                    <p>{this.state.user?.name ? this.state.user.name : 'Użytkownik usunięty'}</p>
                    <div className='flex-side' />
                    <p>{DateFormatter.getFormatted(new Date(this.props.opinion.date))}</p>
                </div>
                {this.renderImmutableRating(this.props.opinion)}
                {this.renderComment()}
            </div>
        )
    }
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 0',
    borderTop: '1px solid #999',
}

export default BookOpinion