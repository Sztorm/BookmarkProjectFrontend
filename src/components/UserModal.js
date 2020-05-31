import React from 'react'
import UserOpinionList from './UserOpinionList'
import ModalTop from './reusables/ModalTop'
import NotificationType from '../utils/NotificationType'
import googlebooks from '../apis/googlebooks'
import bookmarkApi from '../apis/bookmarkApi'
import Button from './reusables/Button'

class UserModal extends React.Component {
    state = {
        opinions: [],
        saveNote: NotificationType.none,
        deleteNote: NotificationType.none,
    }

    onBackgroundClick = event => {
        if (event.target === event.currentTarget) {
            this.props.toggleUserModal(false)
        }
    }

    onCloseButtonClick = () => {
        this.props.toggleUserModal(false)
    }

    closeSaveNote = () => {
        this.setState({
            saveNote: NotificationType.none
        })
    }

    closeDeleteNote = () => {
        this.setState({
            deleteNote: NotificationType.none
        })
    }

    async getBookResponsesAsync(opinions) {
        let books = new Array(opinions.length)
        for (let i = 0; i < opinions.length; i++) {
            try {
                books[i] = await googlebooks.get(`/volumes/${opinions[i].bookId}`)
            }
            catch (error) {
                console.log(error)
            }
        }
        return books
    }

    updateOpinions = () => {
        bookmarkApi
            .get(`/user/${this.props.user.userId}/opinions`)
            .then(opinions => {
                let opinionsData = opinions.data.info;
                this.getBookResponsesAsync(opinionsData)
                    .then(books => {
                        for (let i = 0; i < opinionsData.length; i++) {
                            opinionsData[i].book = books[i].data
                        }
                        this.setState({
                            opinions: opinionsData,
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteOpinion = opinionId => {
        bookmarkApi
            .delete(`opinion/${opinionId}`, {
                headers: {
                    Authorization: 'Bearer ' + this.props.user.token
                }
            })
            .then(result => {
                this.setState({
                    opinions: [...this.state.opinions.filter(stateOpinion => stateOpinion._id !== opinionId)],
                    deleteNote: NotificationType.success
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    deleteNote: NotificationType.fail
                })
            })
    }

    updateOpinion = (opinion, opinionCallback) => {
        bookmarkApi
            .patch(`/opinion/${opinion.opinionId}`, {
                rating: opinion.rating,
                comment: opinion.comment,
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.props.user.token
                }
            })
            .then(result => {
                this.setState({
                    opinions: this.state.opinions.map(stateOpinion => {
                        if (stateOpinion._id === opinion.opinionId) {
                            stateOpinion.date = result.data.info.date
                            stateOpinion.rating = opinion.rating
                            stateOpinion.comment = opinion.comment
                        }
                        return stateOpinion
                    }),
                    saveNote: NotificationType.success
                }, () => {
                    if (opinionCallback) {
                        opinionCallback()
                    }
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    saveNote: NotificationType.fail
                })
            });
    }

    onRefreshButtonClick = () => {
        this.updateOpinions()
        this.forceUpdate()
    }

    componentDidMount() {
        this.updateOpinions()
    }

    render() {
        if (!this.props.isActive) {
            return <div />
        }
        return (
            <div className="modal-container" onClick={this.onBackgroundClick}>
                <div className='flex-row' style={{ minHeight: '70%', width: '100%' }}>
                    <div className='flex-side' onClick={this.onBackgroundClick} />
                    <div className="flex-col-70" style={modalContentStyle}>
                        <ModalTop text='Moje opinie' onClose={this.onCloseButtonClick} />
                        <div className='flex-row'>
                            <div className='flex-side'/>
                            <Button 
                                text='Odśwież' 
                                style={refreshButtonStyle} 
                                onClick={this.onRefreshButtonClick}
                            />
                        </div>
                        <UserOpinionList
                            className='flex-column'
                            opinions={this.state.opinions}
                            saveNote={this.state.saveNote}
                            deleteNote={this.state.deleteNote}
                            closeSaveNote={this.closeSaveNote}
                            closeDeleteNote={this.closeDeleteNote}
                            updateOpinion={this.updateOpinion}
                            deleteOpinion={this.deleteOpinion}
                        />
                    </div>
                    <div className='flex-side' onClick={this.onBackgroundClick} />
                </div>
            </div>
        )
    }
}

const refreshButtonStyle = {
    marginTop: '0.5rem',
    marginRight: '0.5rem',
}

const modalContentStyle = {
    backgroundColor: '#fff',
    minHeight: '70%',
    alignSelf: 'center',
}

export default UserModal
