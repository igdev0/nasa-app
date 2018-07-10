import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './main.less';

class Main extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		if(this.props.data.length !== 0) {
			return (
				<section className="results-section">
				 <div className="results-tool-bar">
				  <h1>Results after "<span>{this.props.term ? this.props.term : 'default'}</span>" sort by: <select onChange={this.props.handleSelect}><option value="Oldest">Oldest</option><option defaultValue>Latest</option></select></h1>

				 </div>
				 <div className="flex-row">
				 	{
				 		this.props.data.items.map((item, key) => {
				 		 	let linkTo = item.links[0].href.replace('thumb', 'orig');
				 			return (
				 				<div key={key} className="flex-col">
				 				 <div className="item">
				 				  <div className="item-title">
				 				   <h2>{item.data[0].title}</h2>
				 				   <p>date: {item.data[0].created_date}</p>
				 				  </div>
				 				  <div className="item-description">
				 				   <p>{item.data[0].description}</p>
				 				  </div>
				 				  <div className="item-thumbnail">
				 				   <a target="_blank" href={linkTo}><img src={item.links[0].href} alt={item.data.title}/></a>
				 				  </div>
				 				 </div>
				 				</div>
				 			)
				 		})
				 	}
				 </div>
				</section>
			)
		}

		else {

			return null;
		}
	}
}

export default Main;