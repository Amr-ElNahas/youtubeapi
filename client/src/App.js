import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Youtubeapi from './components/youtubeapi/youtubeapi';
import VideoFetch from './components/videoFetch/videoFetch';
import Success from './components/success/success';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <div className="App">
                <h3> Youtube Try </h3>
                <div >
                    <Router>
                       
                        <ul>
                            <li>
                                <Link to="/viewvideos">viewvideos</Link>
                            </li>
                            <li>
                                <Link to="/upload">upload</Link>
                            </li>
                        </ul>

                            <Route path="/viewvideos" component={VideoFetch} />
                            <Route path="/upload" component={Youtubeapi} />
                            <Route path="/success" component={Success} />
                        
                
                    </Router>
                </div>
                
            </div>
        );
    }
}
export default App;
