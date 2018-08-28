import React from 'react'
import BooksController from './BooksController'
import * as BooksAPI from './BooksAPI'

class Books extends React.Component {
  state = {
    shelf: ''
  }

  componentDidMount() {
    BooksAPI.get(this.props.book.id)
      .then(book => {
        this.setState({
          shelf: book.shelf
        })
    });
  }

  handleChangeShelf = (shelf) => {
    this.setState({
      shelf: shelf
    })
    this.props.handleChangeShelf();
  }

	render() {
		const { book } = this.props;
    const imageLink = (book.imageLinks) ? (book.imageLinks.thumbnail) : '';
		return (
			<div>
        <div className="book">
          <div className="book-top">
            <div
            	className="book-cover"
            		style={{
            			width: 128,
            			height: 193,
            			backgroundImage: `url(${imageLink})`
            		}}
            ></div>
            <BooksController
              bookId={book.id}
              shelf={this.state.shelf}
              handleChangeShelf={this.handleChangeShelf}
            />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
			</div>
		)
	}
}

export default Books