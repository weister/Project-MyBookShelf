import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'

//Local Component Imports
import SearchBar from './SearchBar'
import AddButton from './AddButton'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.refreshShelves();
  }

  refreshShelves = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBar handleChangeShelf={this.refreshShelves} />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title='Currently Reading'
                  handleChangeShelf={this.refreshShelves}
                  books={books.filter(book => book.shelf === 'currentlyReading')}
                />
                <BookShelf
                  title='Want To Read'
                  handleChangeShelf={this.refreshShelves}
                  books={books.filter(book => book.shelf === 'wantToRead')}
                />
                <BookShelf
                  title='Read'
                  handleChangeShelf={this.refreshShelves}
                  books={books.filter(book => book.shelf === 'read')}
                />
              </div>
            </div>
            <AddButton />
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
