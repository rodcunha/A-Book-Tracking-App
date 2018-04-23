import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			books: []
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	}

	handleChange(event, bookFromSelect) {
		for (const book of this.state.books) {
			if (book.id === bookFromSelect.id) {
				book.shelf = event.target.value;
				break;
			}
		}

		this.setState({
			books: this.state.books
		});
		
		BooksAPI.update(bookFromSelect, event.target.value);
	}
	
	addBookToLibrary = (event, bookFromSearchPage) => {
		console.log(bookFromSearchPage);
		
		//names.map( name => name.length );
		for (const book of this.state.books) {
			if (book.id === bookFromSearchPage.id) {
				this.books.add(bookFromSearchPage);
				//book.shelf = event.target.value;
				break;
			}
		}

		this.setState({
			books: this.state.books
		});

		//BooksAPI.update(bookFromSelect, event.target.value);
		//books.add();
	}

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<ListBooks
						books={this.state.books}
						handleChange={this.handleChange}					
					/>
				)}/>
				<Route path='/search' render={() => (
					<SearchBooks books={this.state.books} addBookToLibrary={this.addBookToLibrary} />
				)}/>
			</div>
		);
	}
}

export default BooksApp