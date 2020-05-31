import React from 'react'

class Rating extends React.Component {
    state = {
        value: this.props.startValue ?? 0,
        hoverValue: this.props.startValue ?? 0,
    }

    onChange = () => {
        this.props.onChange(this.state.value)
    }

    onStarClick = value => {
        this.setState({
            value: value
        }, () => {
            if (this.props.onChange) {
                this.onChange()
            }
        })   
    }

    onMouseEnter = value => {
        this.setState({
            hoverValue: value
        })
    }

    onMouseLeave = () => {
        this.setState({
            hoverValue: this.state.value
        })
    }

    renderMutableStar = (num, options, isMarked) => (
        <svg 
            onClick={() => this.onStarClick(num)}
            onMouseEnter={() => this.onMouseEnter(num)}
            key={num} 
            style={mutableStarStyle} 
            width={options.size} 
            height={options.size} 
            viewBox={options.vBox} 
            fill={isMarked ? options.markedColor : options.unmarkedColor}
        >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
    )

    renderStar = (num, options, isMarked) => (
        <svg 
            key={num} 
            style={starStyle} 
            width={options.size} 
            height={options.size} 
            viewBox={options.vBox} 
            fill={isMarked ? options.markedColor : options.unmarkedColor}
        >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
    )

    renderStars = options => {
        const value = this.state.value
        const hoverValue = this.state.hoverValue
        const isMutable = this.props.isMutable
        const renderMutableStar = this.renderMutableStar
        const renderStar = this.renderStar

        return Array.from(function* () {
            if (isMutable) {
                for (let i = 0; i < hoverValue; i++) {
                    yield renderMutableStar(i + 1, options, true)
                }
                for (let i = hoverValue; i < options.maxValue; i++) {
                    yield renderMutableStar(i + 1, options, false)
                }
            }
            else {
                for (let i = 0; i < value; i++) {
                    yield renderStar(i, options, true)
                }
                for (let i = value; i < options.maxValue; i++) {
                    yield renderStar(i, options, false)
                }
            }
        }())
    }

    render() {
        const options = {
            maxValue: this.props.maxValue ?? defaultProps.maxValue,
            value: this.props.value ?? defaultProps.value,
            markedColor: this.props.markedColor ?? defaultProps.markedColor,
            unmarkedColor: this.props.unmarkedColor ?? defaultProps.unmarkedColor,
            size: this.props.size ?? defaultProps.size,
            isMutable: this.props.isMutable ?? defaultProps.isMutable
        }
        options.vBox = `0 0 ${options.size} ${options.size}`
        const stars = this.renderStars(options).map(star => (star))

        return (
            <span style={ratingStyle} onMouseLeave={this.onMouseLeave}>{stars}</span>
        )
    }
}

const defaultProps = {
    max: 10,
    value: 0,
    markedColor: '#ffbf00',
    unmarkedColor: '#999',
    size: 24,
    isMutable: false
}

const ratingStyle = {
    padding: '5px 0px'
}

const starStyle = {
    paddingRight: '2px'
}

const mutableStarStyle = {
    paddingRight: '2px',
    cursor: 'pointer',
}

export default Rating