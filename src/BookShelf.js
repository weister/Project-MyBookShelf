import React, { Component } from 'react'
import Books from './Books'

class BookShelf extends Component {

  handleChangeShelf = () => {
    this.props.handleChangeShelf();
  }

	render() {
		const {title, books} = this.props;
		return (
			<div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}><Books book={book} handleChangeShelf={this.handleChangeShelf}/></li>
            ))}
          </ol>
        </div>
      </div>
		)
	}

}

export default BookShelf