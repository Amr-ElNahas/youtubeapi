const VideoDetail = ({ video }) => {
    if (!video) {
        return <div>
            <h1> Enter search keyword to load</h1>
            <br/>
            <p> you can search for terms, topics, location etc </p>
        </div>
    }
    const videoSource = 'https://www.youtube.com/embed/' + video.id.videoId
    console.log(typeof video)
    return (
        <div>
            <div className="ui embed">
                <iframe src={videoSource} allowFullScreen title="video player"/>
            </div>
            <div className="ui segment">
                <h4>{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>
        )
}
export default VideoDetail