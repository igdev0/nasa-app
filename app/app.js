import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './app.less';
import Footer from './components/footer.js';
import Header from './components/header';
import Main from './components/main';

const API_ROOT = 'https://images-api.nasa.gov';

const history = createBrowserHistory();

class Root extends Component {

	constructor(props) {

		super(props);

		this.state = {
			data: [],
			term: '',
			errorMessage: null
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	
	}

	handleInputChange(e) {

		this.setState({
			term: e.target.value
		})
	}

	componentDidMount() {
		// initial state

		axios.get(`${API_ROOT}/search`, {
			params: {
				q: 'Mars',
				media_type: 'image'
			}
		})

		.then((res) => {

			this.setState({
				data: this.sortItems(res.data.collection.items)
			})
		})
	}

	sortItems(items) {
		let _items = items.sort((item1, item2) => {
				let item_date1 = new Date(item1.data[0].date_created);
				let item_date2 = new Date(item2.data[0].date_created);
				return item_date1 < item_date2 ? -1 : 1;
		});
		return {items: _items};
	}

	handleSelect(e) {
		let items = [];

		if(e.target.value === 'Oldest') {
			items = this.state.data.items.sort((item1, item2) => {
				let item_date1 = new Date(item1.data[0].date_created);
				let item_date2 = new Date(item2.data[0].date_created);
				return item_date1 > item_date2 ? 1 : -1;
			});
		}

		if(e.target.value === 'Latest') {
			items = this.state.data.items.sort((item1, item2) => {
				let item_date1 = new Date(item1.data[0].date_created);
				let item_date2 = new Date(item2.data[0].date_created);
				return item_date1 < item_date2 ? 1 : -1;
			})
		}
		this.setState({
			data: {
				items: items
			}
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		axios.get(`${API_ROOT}/search`, {
			params:{
				q: this.state.term,
				media_type: 'image'
			}
		})

		.then((res) =>  {
			if(res.data.collection.length === 0) {
				this.setState({
					errorMessage: `For some reasons i can't find nothing after:${this.state.term}.`
				})
			}
			else {

				this.setState({
					data: this.sortItems(res.data.collection.items)
				})
			}
		})
		.catch((err) => {
			this.setState({
				errorMessage: `For some reasons i can't find nothing after:${this.state.term}.`
			})
		}) 
	}

	render() {

		return (
			<Router history={history}>
			 <main className="app-main">
			  <Header handleSubmit={this.handleSubmit} term={this.state.term} handleInputChange={this.handleInputChange}/>\
			  <Main handleSelect={this.handleSelect} {...this.state}/>
			  <Footer/>
			 </main>
			</Router>
		)
	}
}

ReactDOM.render(<Root/>, document.getElementById('root'));