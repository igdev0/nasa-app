import React, {Component} from 'react';
import './header.less';

class Header extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<header className="app-header">
			 <form onSubmit={this.props.handleSubmit}>
			  <fieldset >
			  	<input 
			  	type="text"
			  	value={this.props.term}
			  	onChange={this.props.handleInputChange}
			  	placeholder="Search ..."
			  	/>
			  </fieldset>
			  <div className="submit-button">
			   <button type="submit">Search</button>
			  </div>
			 </form>
			 <h1><span className="q1">Question everything,</span><br/><span className="q2"> Learn something.</span><br/><span className="q3"> Answer nothing.</span></h1>
			</header>
		)
	}
}

export default Header;