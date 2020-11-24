import logo from './logo.svg';
import './App.css';
import Youtubeapi from './components/youtubeapi/youtubeapi';
import VideoFetch from './components/videoFetch/videoFetch';

const dotenv = require('dotenv')
dotenv.config()

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          </header>
          <Youtubeapi />
          <VideoFetch />
    </div>
  );
}

export default App;
