import React from 'react'
import BookOpinionList from './BookOpinionList'
import Rating from './reusables/Rating'
import TopBarButton from './reusables/TopBarButton'

class BookInfo extends React.Component {
    state = {
        isExpanded: false,
    }

    onExpandButtonClick = () => {
        this.setState({ isExpanded: !this.state.isExpanded })
    }

    render() {
        const { book } = this.props
        const doThumbnailExist = book.volumeInfo.hasOwnProperty('imageLinks')
        const doAuthorsExist = book.volumeInfo.hasOwnProperty('authors')
        const bookInfo = {
            title: book.volumeInfo.title,
            authors: doAuthorsExist ?
                book.volumeInfo.authors.join(', ') : "Autor nieznany",
            categories: book.volumeInfo.categories?.join(', '),
            thumbnailSrc: doThumbnailExist ?
                book.volumeInfo.imageLinks.thumbnail : './green-book.png',
            opinions: book.opinions,
            averageRating: book.opinions.length > 0 ?
                book.opinions.reduce((sum, o) => sum + o.rating, 0) / book.opinions.length : 0
        }
        return (
            <div style={containerStyle} >
                <div style={opinionContainerStyle} onClick={this.onBookSelect}>
                    <img
                        style={thumbnailStyle}
                        src={bookInfo.thumbnailSrc}
                        alt={bookInfo.title}
                    />
                    <div style={infoStyle}>
                        <div style={titleStyle}>
                            {bookInfo.title}
                        </div>
                        <div>
                            {bookInfo.authors}
                        </div>
                        {book.opinions.length === 0 ? 'Brak ocen' : `Średnia ocena: ${bookInfo.averageRating.toFixed(2)}`}
                        <Rating maxValue={10} startValue={Math.round(bookInfo.averageRating)} />
                        {this.renderDescription()}
                    </div>
                </div>
                <TopBarButton
                    className='flex-row'
                    style={expandButtonStyle}
                    text={this.state.isExpanded ? 'Zwiń' : 'Rozwiń'}
                    onClick={this.onExpandButtonClick}
                />
            </div>
        )
    }

    renderDescription() {
        if (this.state.isExpanded) {
            const { book } = this.props
            const hasDescription = book.volumeInfo.description && book.volumeInfo.description.length !== 0

            return (
                <div className='flex-column' style={descriptionStyle}>
                    {hasDescription ? book.volumeInfo.description : 'Brak opisu.'}
                    {this.renderOpinions()}
                </div>
            )
        }
    }

    renderOpinions() {
        return <BookOpinionList
                user={this.props.user}
                opinions={this.props.book.opinions}
                bookId={this.props.book.id}
                postOpinion={this.props.postOpinion}
                deleteOpinion={this.props.deleteOpinion}
                updateOpinion={this.props.updateOpinion}
            />
    }
}

const expandButtonStyle = {
    backgroundColor: '#00000000', 
    justifyContent: 'center',
}

const opinionContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 0px',
}

const containerStyle = {
    borderBottom: '1px solid #999',
}

const thumbnailStyle = {
    minWidth: '150px',
    width: '150px',
    height: '100%',
    boxShadow: '2px 2px 10px 1px #4d4d4d4d',
}

const infoStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '10px 15px',
    fontSize: '1.1rem',
}

const descriptionStyle = {
    height: 'auto',
    transition: 'all 2s ease-in 1s',
    paddingTop: '15px',
    fontSize: '1.1rem',
}

const titleStyle = {
    fontSize: '1.4rem',
}


export default BookInfo