const dotenv = require('dotenv')
dotenv.config() // Setting env variables
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const app = express()

const youtubeapi = require('./routes/api/youtubeapi')


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
});

//const authorize = require('./routes/api/authorize')

app.use('/api/youtubeapi', youtubeapi)


/** * Adding temporary index page ***/
app.get('/', (req, res) => {

    res.send('<h1>Youtube API Project</h1>\n<h3>Index Page<h3>\n<a href=http://localhost:3001/api/youtubeapi>here</a>')
})

app.use((req, res) => {
    res.status(404).send({ error: 'Make sure address is correct' })
})
/** * Listening on serverport ***/
app.listen(port, () => console.log(`Server up. Listening on port ${port}`))