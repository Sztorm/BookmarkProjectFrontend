import React from 'react'
import SearchButton from './SearchButton'

class SearchBar extends React.Component {
    state = {
        query: ""
    }

    onInputChange = (event) => {
        this.setState({ query: event.target.value })
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        this.props.onFormSubmit(this.state.query)
    }

    render() {
        const classResult = 'flex-row ' + (this.props.className ?? '')

        return (
            <form className={classResult} style={searchBarStyle} onSubmit={this.onFormSubmit}>
                <input
                    style={searchInputStyle}
                    placeholder="Szukaj książek"
                    type="text"
                    value={this.state.query}
                    onChange={this.onInputChange}
                />
                <SearchButton onClick={this.onFormSubmit} style={searchButtonStyle} />
            </form>
        )
    }
}

const searchBarStyle = {
    margin: '1rem 0',
}

const searchInputStyle = {
    borderRadius: '4px 0 0 4px',
    width: '100%',
}

const searchButtonStyle = {
    borderRadius: '0 4px 4px 0',
}

export default SearchBar