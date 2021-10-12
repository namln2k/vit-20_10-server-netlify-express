<script type="text/javascript" src="data.json"></script>

const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const PASSWORD = "vit201021";

// Configurations to enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }

    next();
});

// Request body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Parse database to object array
const db = JSON.parse(data);

/*
    Return:
        0 if username does not exist in db
        1 if username exists in db and password is correct
        2 if username exists in db but password is incorrect
*/
function validateLogin(username, password) {
    if (db.some(item => { item.username == username }) === undefined)
        return 0;
    if (password == PASSWORD)
        return 1;
    return 2;
}


// Handle post request (username, password)
router.post('/', (req, res) => {
    // Get username and password
    const loginInfo = {
        username: req.body.username,
        password: req.body.password,
    }

    // Init response
    var fullName = "";
    var images = [];
    var wishes = [];

    // Validate login
    var isLoginValid = validateLogin(loginInfo.username, loginInfo.password);

    if (isLoginValid == 0) {
        // Username does not exist in db, using default values
        fullName = db[0].fullName;
        images = db[0].images;
        wishes = db[0].wishes;

        // Send response to front-end
        res.status(200).json({
            message: "Username is not in db, returning default values",
            fullName: fullName,
            images: images,
            wishes: wishes
        })
    } else if (validateLogin(username, password) == 1) {
        // Username exists in db, getting data
        var girl = db.find(username => { username == loginInfo.username });
        fullName = girl.fullName;
        images = girl.images;
        wishes = girl.wishes;

        // Send response to front-end
        res.status(200).json({
            message: "Success",
            fullName: fullName,
            images: images,
            wishes: wishes
        })
    } else {
        // Wrong password, send respond to front-end
        res.status(404).send("Wrong password");
    }
})

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);