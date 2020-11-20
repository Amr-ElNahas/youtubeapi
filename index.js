const dotenv = require('dotenv')
dotenv.config() // Setting env variables
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const app = express()
const OAuth2Data = require('./client_secret')
const fs = require('fs')
const { google } = require('googleapis')
const multer = require("multer")
//const readline = require('readline');
//const OAuth2 = google.auth.OAuth2;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);
var authed = false



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
});

const youtubeapi = require('./routes/api/youtubeapi')
const authorize = require('./routes/api/authorize')

const SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/userinfo.profile'
];

app.use('/api/youtubeapi', youtubeapi)

//fs.readFile('client_secret.json', (error, content) => {
//    if (error) {
//        console.log('Error loading client secret file: ' + error);
//        return cb(error);
//    }
//    // Authorize a client with the loaded credentials
//    authorize(JSON.parse(content), cb);
//});
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./videos");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: Storage,
}).single("file"); //Field name and max count

/** * Adding temporary index page ***/
app.get('/', (req, res) => {

    if (!authed) {
        var url = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
        });
        console.log(url);
        res.redirect(url)
    }
    else {
        console.log(res.data);
        name = res.data.name;
        pic = res.data.picture;
        console.log(name)
        res.send("success")
    }



    //res.send('<h1>Youtube API Project</h1>\n<h3>Index Page<h3>')
})

app.post("/upload", (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Something went wrong");
        } else {
            console.log(req.file.path);
            title = req.body.title;
            description = req.body.description;
            tags = req.body.tags;
            console.log(title);
            console.log(description);
            console.log(tags);
            const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
            console.log(youtube)
            youtube.videos.insert(
                {
                    resource: {
                        // Video title and description
                        snippet: {
                            title: title,
                            description: description
                        },
                        // I don't want to spam my subscribers
                        status: {
                            privacyStatus: "private",
                        },
                    },
                    // This is for the callback function
                    part: "snippet,status",

                    // Create the readable stream to upload the video
                    media: {
                        body: fs.createReadStream(req.file.path)
                    },
                },
                (err, data) => {
                    if (err) throw err
                    console.log(data)
                    console.log("Done.");
                    fs.unlinkSync(req.file.path);
                    res.render("success", { name: name, pic: pic, success: true });
                }
            );
        }
    });
});

app.get("/google/callback", function (req, res) {
    const code = req.query.code;
    console.log(code)
    console.log('here')
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log("Error authenticating");
                console.log(err);
            } else {
                console.log("Successfully authenticated");
                console.log(tokens);
                oAuth2Client.setCredentials(tokens);

                authed = true;
                res.redirect("/");
            }
        });
    }
});
/** * Custom routing for wrong requests ***/
app.use((req, res) => {
    res.status(404).send({ error: 'Make sure address is correct' })
})
/** * Listening on serverport ***/
app.listen(port, () => console.log(`Server up. Listening on port ${port}`))