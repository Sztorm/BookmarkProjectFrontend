## BookmarkProjectFrontend
## Table of contents
* [Description](#description)
* [Dependencies](#dependencies)
* [Setup](#setup)
* [Images](#images)
* [License](#license)

## Description
This is frontend of the Bookmark project designed with help of React.js library.
The website uses [Bookmark API](https://github.com/Sztorm/BookmarkProjectBackend) for user related data transfer 
and [Google Books API](https://developers.google.com/books/docs/v1/using) for downloading book information.
Bookmark allows searching for books, see opinions about them and requires registration in order to post them.
The user can easily see, add, update and delete his opinion about a specific book. Search results show
books information like: author, title, average rating and description.

## Dependencies
Apart from React library, project uses `axios 0.19.2`

## Setup
In order to install and run this project, type the following commands into terminal:
```
$ npm install
$ npm start
```
3000 is the default application port

## Images
![Login](/example_screens/login.png)
![Sign up](/example_screens/signup.png)
![User editing opinions](/example_screens/user_opinions_edit.png)
![Book opinions](/example_screens/book_opinions.png)

## License
This project is licensed under the MIT License.
