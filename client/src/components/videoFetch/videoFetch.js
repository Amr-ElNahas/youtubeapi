import React, { Component } from 'react';
import './videoFetch.css';

const API = 'AIzaSyB0Y4pT3dRmbeJlurnK72BPGk8Xro8Uv2o'
const channelID = 'UClGOz_V3eHcaleqSP26kU1Q'
const result = 10

var finalURL = 'https://www.googleapis.com/youtube/v3/search?key=' + API + '&channelId=' + channelID + '&part=snippet,id&order=date&maxResults='+result



class VideoFetch extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
        this.clicked=this.clicked.bind(this)
    }
    clicked() {
        //fetch(finalURL).then(res => res.json())
        //    .then(data => this.setState(data, () => console.log(this.state.data)))
        fetch(finalURL).then(res => res.json()).then((resp) => {
            //console.log(resp)
            const data = resp.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId)
            this.setState({ data })
        })
    }
    componentDidMount() {
        //console.log(finalURL)
    }
    render() {
        return (
            <div>
                <button onClick={this.clicked} > Get videos </button>
                {
                    this.state.data.map((link, i) => {
                        console.log(link)
                        var frame = <div key={i} className="view"><iframe  width="560" height="315" src={link} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                        return frame;
                    })
                }
                {this.frame}
                    
                
            </div>
            
        );
    }
}

export default VideoFetch;