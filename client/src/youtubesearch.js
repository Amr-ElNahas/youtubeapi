import axios from 'axios'
const KEY = "AIzaSyCgyCB-moHkqAZ6f0s1YmmgaHzzdKhRZcc"

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: 'snippet',
        maxResult: 20,
        key: KEY
    }
})