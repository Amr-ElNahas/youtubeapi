import React, { Component } from 'react';
import './youtubeapi.css';

class Youtubeapi extends Component {
	constructor(){
		super();
		this.state={
			name:[],
			pic:[]
		}
	}
	componentDidMount(){
		fetch("/api/youtubeapi")
	}
	render() {
		return (
		  <div>

		  </div>
	  );
	}
}

export default Youtubeapi;