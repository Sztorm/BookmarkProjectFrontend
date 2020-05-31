import React from 'react'
import googlebooks from '../apis/googlebooks'
import bookmarkApi from '../apis/bookmarkApi'
import TopBar from './TopBar'
import TopBarLogged from './TopBarLogged'
import SearchBar from './reusables/SearchBar'
import BookList from './BookList'
import LoginModal from './LoginModal'
import UserModal from './UserModal'
import RegisterModal from './RegisterModal'
import SuccessNotification from './reusables/SuccessNotification'
import FailNotification from './reusables/FailNotification'
import NotificationType from '../utils/NotificationType'
import JWTDecoder from '../utils/JWTDecoder'

class App extends React.Component {
    state = {
        books: [],
        user: null,
        isLoginModalActive: false,
        isRegisterModalActive: false,
        isSettingsModalActive: false,
        isUserModalActive: false,
        registerNote: NotificationType.none,
        loginNote: NotificationType.none,
        logoutNote: NotificationType.none,
        saveNote: NotificationType.none,
        deleteNote: NotificationType.none,
    }

    async getBookOpinionResponsesAsync(googleBooks) {
        let opinions = new Array(googleBooks.length)

        for (let i = 0; i < googleBooks.length; i++) {
            try {
                opinions[i] = await bookmarkApi.get(`/book/${googleBooks[i].id}/opinions`)
            }
            catch (error) {
                console.log(error)
            }
        }
        return opinions
    }

    getBooksAndOpinions = query => {
        googlebooks
            .get("/volumes", {
                params: {
                    q: query,
                }
            })
            .then(books => {
                let booksData = books.data.items;
                this.getBookOpinionResponsesAsync(booksData)
                    .then(opinions => {
                        for (let i = 0; i < booksData.length; i++) {
                            booksData[i].opinions = opinions[i].data.info
                        }
                        this.setState({
                            books: booksData
                        }, () => this.forceUpdate())
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    postOpinion = (opinion, opinionCallback) => {
        bookmarkApi.post('opinion', {
            bookId: opinion.bookId,
            userId: this.state.user.userId,
            rating: opinion.rating,
            comment: opinion.comment,
        }, {
            headers: {
                Authorization: 'Bearer ' + this.state.user.token
            }
        })
            .then(result => {
                let newBooks = [...this.state.books]
                let bookIndex = newBooks.findIndex(b => b.id === opinion.bookId)
                newBooks[bookIndex].opinions.push({
                    __v: 0,
                    _id: result.data.info._id,
                    bookId: opinion.bookId,
                    comment: opinion.comment,
                    date: result.data.info.date,
                    rating: opinion.rating,
                    userId: this.state.user.userId,
                })

                this.setState({
                    books: newBooks,
                    saveNote: NotificationType.success,
                }, () => {
                    if (opinionCallback) {
                        opinionCallback()
                    }
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    saveNote: NotificationType.fail
                }, () => {
                    if (opinionCallback) {
                        opinionCallback()
                    }
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
                    Authorization: 'Bearer ' + this.state.user.token
                }
            })
            .then(result => {
                let newBooks = [...this.state.books]
                const bookIndex = newBooks.findIndex(b => b.id === opinion.bookId)
                const opinionIndex = newBooks[bookIndex].opinions.findIndex(o => o._id === opinion.opinionId)
                newBooks[bookIndex].opinions[opinionIndex].date = result.data.info.date
                newBooks[bookIndex].opinions[opinionIndex].rating = opinion.rating
                newBooks[bookIndex].opinions[opinionIndex].comment = opinion.comment

                this.setState({
                    books: newBooks,
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
                }, () => {
                    if (opinionCallback) {
                        opinionCallback()
                    }
                })
            });
    }

    deleteOpinion = opinionId => {
        bookmarkApi
            .delete(`opinion/${opinionId}`, {
                headers: {
                    Authorization: 'Bearer ' + this.state.user.token
                }
            })
            .then(result => {
                let newBooks = [...this.state.books]
                let bookIndex = newBooks.findIndex(b => b.opinions.find(o => o._id === opinionId))
                newBooks[bookIndex].opinions = newBooks[bookIndex].opinions.filter(stateOpinion => stateOpinion._id !== opinionId)

                this.setState({
                    books: newBooks,
                    deleteNote: NotificationType.success,
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    deleteNote: NotificationType.fail
                })
            })
    }

    onQuerySubmit = query => {
        this.getBooksAndOpinions(query)
    }

    onRegister = info => {
        bookmarkApi
            .post('user/signup', {
                email: info.email,
                name: info.name,
                password: info.password,
            })
            .then(user => {
                this.setState({
                    isRegisterModalActive: false,
                    registerNote: NotificationType.success,
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    isRegisterModalActive: false,
                    registerNote: NotificationType.fail,
                })
            })
    }

    onLogin = info => {
        bookmarkApi
            .post('user/login', {
                nameOrEmail: info.login,
                password: info.password,
            })
            .then(user => {
                console.log('user', user)
                let userData = JWTDecoder.getPayload(user.data.token)
                userData.token = user.data.token

                this.setState({
                    user: userData,
                    isLoginModalActive: false,
                    logoutNote: NotificationType.none,
                    loginNote: NotificationType.success,
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    isLoginModalActive: false,
                    loginNote: NotificationType.fail,
                })
            })
    }

    onLogout = () => {
        this.setState({
            user: null,
            loginNote: NotificationType.none,
            logoutNote: NotificationType.success,
        })
    }

    toggleLoginModal = isActive => {
        this.setState({
            isLoginModalActive: isActive
        })
    }

    toggleRegisterModal = isActive => {
        this.setState({
            isRegisterModalActive: isActive
        })
    }

    toggleSettingsModal = isActive => {
        this.setState({
            isSettingsModalActive: isActive
        })
    }

    toggleUserModal = isActive => {
        this.setState({
            isUserModalActive: isActive
        })
    }

    onLoginNoteClose = () => {
        this.setState({ loginNote: NotificationType.none })
    }

    onRegisterNoteClose = () => {
        this.setState({ registerNote: NotificationType.none })
    }

    onLogoutNoteClose = () => {
        this.setState({ logoutNote: NotificationType.none })
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

    renderRegisterNote = () => {
        switch (this.state.registerNote) {
            case NotificationType.success:
                return <SuccessNotification
                    style={notificationStyle}
                    text='Rejestracja udała się. Zaloguj się.'
                    onClose={this.onRegisterNoteClose} />
            case NotificationType.fail:
                return <FailNotification
                    style={notificationStyle}
                    text='Rejestracja nie udała się. Spróbuj ponownie później.'
                    onClose={this.onRegisterNoteClose} />
            default: break
        }
    }

    renderLoginNote = () => {
        switch (this.state.loginNote) {
            case NotificationType.success:
                return <SuccessNotification
                    style={notificationStyle}
                    text={`Witaj, ${this.state.user.name}`}
                    onClose={this.onLoginNoteClose} />
            case NotificationType.fail:
                return <FailNotification
                    style={notificationStyle}
                    text='Nie udało się zalogować. Spróbuj ponownie później.'
                    onClose={this.onLoginNoteClose} />
            default: break
        }
    }

    renderLogoutNote = () => {
        if (this.state.logoutNote === NotificationType.success) {
            return <SuccessNotification
                style={notificationStyle}
                text='Wylogowano.'
                onClose={this.onLogoutNoteClose} />
        }
    }

    renderTopBar = () => {
        if (!this.state.user) {
            return <TopBar
                toggleLoginModal={this.toggleLoginModal}
                toggleRegisterModal={this.toggleRegisterModal}
            />
        }
        else {
            return <TopBarLogged
                onLogout={this.onLogout}
                toggleUserModal={this.toggleUserModal}
                toggleSettingsModal={this.toggleSettingsModal}
            />
        }
    }

    renderModals = () => {
        if (!this.state.user) {
            return (
                <div>
                    <LoginModal
                        isActive={this.state.isLoginModalActive}
                        toggleLoginModal={this.toggleLoginModal}
                        toggleRegisterModal={this.toggleRegisterModal}
                        onFormSubmit={this.onLogin}
                    />
                    <RegisterModal
                        isActive={this.state.isRegisterModalActive}
                        toggleRegisterModal={this.toggleRegisterModal}
                        onFormSubmit={this.onRegister}
                    />
                </div>
            )
        }
        else {
            return (
                <div>
                    <UserModal
                        isActive={this.state.isUserModalActive}
                        user={this.state.user}
                        toggleUserModal={this.toggleUserModal}
                        onFormSubmit={this.onUserPanel}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderModals()}
                {this.renderTopBar()}
                <div className='flex-row'>
                    <div className='flex-side' />
                    <div className='flex-col-60' style={{ padding: '0 5px' }}>
                        {this.renderRegisterNote()}
                        {this.renderLoginNote()}
                        {this.renderLogoutNote()}
                        <SearchBar onFormSubmit={this.onQuerySubmit}/>
                        <BookList
                            books={this.state.books}
                            user={this.state.user}
                            saveNote={this.state.saveNote}
                            deleteNote={this.state.deleteNote}
                            postOpinion={this.postOpinion}
                            deleteOpinion={this.deleteOpinion}
                            updateOpinion={this.updateOpinion}
                            closeSaveNote={this.closeSaveNote}
                            closeDeleteNote={this.closeDeleteNote}
                        />
                    </div>
                    <div className='flex-side' />
                </div>
            </div>
        )
    }
}

const notificationStyle = {
    marginTop: '1rem',
}

export default App;
