import React, { Component } from 'react';
import './youtubeapi.css';
//import axios from 'axios'

class Youtubeapi extends Component {
	constructor(){
		super();
		this.state={
			data:[]
		}
	}
	componentDidMount(){
		fetch("http://localhost:3001/api/youtubeapi").then(res => res.json())
      .then(data => this.setState(data, () => console.log(this.state.data)))
	}
	render() {
		return (
		  <div>

		  </div>
	  );
	}
}

export default Youtubeapi;