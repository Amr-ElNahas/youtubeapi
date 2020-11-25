import React, { Component } from 'react';
const API = 'AIzaSyCgyCB-moHkqAZ6f0s1YmmgaHzzdKhRZcc'
const playlistID = 'PLOU2XLYxmsIL5MoZ5LrrxfVk3V04evsMm'
const result = 25

var finalURL = "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=" + playlistID + "&maxResults=" + result + "&key=" + API

//<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLxi9dU_wMai-ZzlgsQS6F4_jtSSb2Gx_g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

//{
//    console.log(this.state.data)
//    var frame = <div className="view"><iframe width="560" height="315" src={this.state.data} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
//    return frame;
//}
//{ this.frame }

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        //fetch(finalURL).then(res => res.json())
        //    .then(data => this.setState(data, () => console.log(this.state.data)))
        fetch(finalURL).then(res => res.json()).then((resp) => {
            console.log(resp)
            const data = "https://www.youtube.com/embed/videoseries?list=" + resp.items[0]
            this.setState({ data })
        })
    }
    render() {
        return (
            <div>
                
                <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLxi9dU_wMai-ZzlgsQS6F4_jtSSb2Gx_g" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> 

            </div>

        );
    }
}
export default HomePage