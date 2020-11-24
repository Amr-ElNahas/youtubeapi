import React, { Component } from 'react';
import './youtubeapi.css';
import axios from 'axios'

//class Youtubeapi extends Component {
//	constructor(){
//		super();
//		this.state={
//			data:[]
//		}
//	}
//	componentDidMount(){
//		fetch("http://localhost:3001/api/youtubeapi").then(res => res.json())
//      .then(data => this.setState(data, () => console.log(this.state.data)))
//	}
//	render() {
//		return (
//		  <div>

//		  </div>
//	  );
//	}
//}

//export default Youtubeapi;

const Youtubeapi = () => {
    const [form, setForm] = React.useState({
        title:"",
        description:"",
        file:null
    })
    function handleChange(event) {
        const inputValue = event.target.name === "file" ? event.target.files[0] : event.target.value
        setForm({
            ...form,
            [event.target.name]: inputValue
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        const videoData = new FormData()
        videoData.append("file", form.file)
        videoData.append("title", form.title)
        videoData.append("description", form.description)
        axios.post("http://localhost:3001/api/youtubeapi/upload", videoData).then(res => res.json())
      .then(data => this.setState(data, () => console.log(this.state.data)))

    }
    return (
        <div>
            <h3> Upload </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input onChange={handleChange} type="text" name="title" placeholder="Title" />
                </div>
                <div>
                    <input onChange={handleChange} type="text" name="description" placeholder="Description" />
                </div>
                <div>
                    <input onChange={handleChange} accept="video/mp4" type="file" name="file" placeholder="Add video file" />
                </div>
                <button type="submit"> Upload video </button>
            </form>
        </div>
        )
}
export default Youtubeapi