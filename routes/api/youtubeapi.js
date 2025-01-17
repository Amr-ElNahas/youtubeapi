const express = require('express')
//const app = express()
const router = express.Router()
var axios = require('axios')
const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');
const OAuth2Data = require('../../client_secret');
const multer = require("multer")
const open = require("open")


const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

var authed = false

const SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/userinfo.profile'
];

var Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./uploads");
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname + "_" + file.originalname);
	},
});
var upload = multer({
	storage: Storage,
}).single("file"); //Field name and max count

router.get('/', (req, res) => {

	if (!authed) {
		var url = oAuth2Client.generateAuthUrl({
			access_type: "offline",
			scope: SCOPES,
		});
		console.log(url);
		res.redirect(url)
	}
	else {
		var oauth2 = google.oauth2({
			auth: oAuth2Client,
			version: "v2",
		});
		oauth2.userinfo.get(function (err, response) {
			if (err) {
				console.log(err);
			} else {
				console.log(response.data);
				name = response.data.name;
				pic = response.data.picture;
				res.json({
					name: response.data.name,
					pic: response.data.picture,
					success: false,
				});
			}
		});
	}
});

//router.post("/upload", (req, res) => {
//	upload(req, res, function (err) {
//		if (err) {
//			console.log(err);
//			return res.end("Something went wrong");
//		} else {
//			console.log(req.file.path);
//			title = req.body.title;
//			description = req.body.description;
//			tags = req.body.tags;
//			console.log(title);
//			console.log(description);
//			console.log(tags);
//			const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
//			console.log(youtube)
			//youtube.videos.insert(
            //    {
            //    	resource: {
            //    		// Video title and description
            //    		snippet: {
            //    			title: title,
            //    			description: description
            //    		},
            //    		// I don't want to spam my subscribers
            //    		status: {
            //    			privacyStatus: "private",
            //    		},
            //    	},
            //    	// This is for the callback function
            //    	part: "snippet,status",

            //    	// Create the readable stream to upload the video
            //    	media: {
            //    		body: fs.createReadStream(req.file.path)
            //    	},
            //    },
            //    (err, data) => {
            //    	if (err) throw err
            //    	console.log(data)
            //    	console.log("Done.");
            //    	fs.unlinkSync(req.file.path);
            //    	res.render("success", { name: name, pic: pic, success: true });
            //    }
            //);
//		}
//	});
//});
router.post("/upload",upload, (req, res) => {

	if(req.file){
		const filename=req.file.fieldname + "_" + req.file.originalname
		console.log(filename)

		const {title, description} = req.body;
		open(oAuth2Client.generateAuthUrl({
			access_type: "offline",
			scope: SCOPES,
			state:JSON.stringify({
				filename,title,description
			})
		}))
	}
});

router.get("/google/callback", function (req, res) {
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
				const {filename,title,description}=JSON.parse(req.query.state)
				res.redirect("http://localhost:3000/success");

				const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
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
                		body: fs.createReadStream("./uploads"+'/'+filename)
                	},
                },
                (err, data) => {
                	if (err) throw err
                	console.log(data)
                	console.log("Done.");
                	process.exit()
                }
            );
			}
		});
	}
});

module.exports = router;