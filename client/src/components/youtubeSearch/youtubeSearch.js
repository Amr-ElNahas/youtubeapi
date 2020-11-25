import React, { Component } from 'react';
import './youtubeSearch.css';
//import youtubesearch from '../../../../routes/api/youtubesearch';
import SearchBar from './../Searchbar'
import Videodetail from './../videodetails'
import Videolist from './../videolist'
import youtubesearch from '../../youtubesearch'


class YoutubeSearch extends Component {
    constructor() {
        super();
        this.state = {
            videos: [],
            selectedVideo: null
        };
        
    }
    handleSubmit = async(termFromSearchBar) => {
        const response = await youtubesearch.get('/search', {
            params: {
                q: termFromSearchBar
            }

        })
        this.setState({
            videos: response.data.items
        })
        console.log(response)
    }
    handleVideoSelect = (video) => {
        this.setState({
            selectedVideo:video
        })
    }

    render() {
        return (
            <div className='ui container' >
                <SearchBar handleFormSubmit={this.handleSubmit} />
                <div className='ui grid'>
                    <div className='ui row'>
                        <div className='left column'>
                            <Videodetail video={this.state.selectedVideo} />
                        </div>
                        <div className='right column'>
                            <Videolist handleVideoSelect={this.handleVideoSelect} videos={this.state.videos} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default YoutubeSearch