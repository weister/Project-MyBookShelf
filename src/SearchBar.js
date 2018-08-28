import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class SearchBar extends Component {
  state = {
    query: '',
    searchResult: []
  }

	handleCloseSearch = (event) => {
		event.preventDefault();
		this.props.history.push('/');
	}

  handleSearchChange = (event) => {
    event.preventDefault();
    const query = event.target.value;

    if(query === '') {
      this.setState((previousState) => ({
        query: query,
        searchResult: []
      }))
    } else {
      this.searchBooks(query);
    }
  }

  searchBooks = (query) => {
    BooksAPI.search(query)
      .then(books => {
        this.setState(() => ({
          query: query,
          searchResult: books
        }))
      });
  }

	render() {
    const {query, searchResult} = this.state;
		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link
          	className="close-search"
          	to='/'
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              value={query}
              className="search-books"
              placeholder="Search by title or author"
              onChange={this.handleSearchChange}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(searchResult.length) ? (searchResult.map(book => (
              <li key={book.id}><Books book={book} handleChangeShelf={this.props.handleChangeShelf} /></li>
            ))) : ("No books found...")}
          </ol>
        </div>
      </div>
		)
	}

}

export default SearchBar