import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class BooksController extends Component {
	handleSelectChange = event => {
		event.preventDefault();
		const bookId = this.props.bookId;
		const shelf = event.target.value;
		BooksAPI.update({id: bookId}, shelf).then(
			books => this.props.handleChangeShelf(shelf)
		);
	}

	render() {
		const shelf = (this.props.shelf) ? (this.props.shelf) : 'none';
		return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleSelectChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
		)
	}

}

export default BooksController