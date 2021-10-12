const express = require('express');
const serverless = require('serverless-http');

/* 
    Database object
    Note: db[0] is the default data (If username does not exist in db)
*/
const db = require('./db.json');

const app = express();
const router = express.Router();

// Common password for all users
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

// Include http request body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/*
    Params: 
        username
        password
    Returns:
        0: username does not exist in db
        1: username exists in db and password is correct
        2: username exists in db but password is incorrect
*/
function validateLogin(username, password) {
    if (password != PASSWORD)
        // If password is wrong
        return 0;
    if (findByUsername(username) === undefined)
        // If password is correct but username does not exist in db
        return 2;
    return 1;
}

/*
    Params: 
        username
    Returns:
        girl data if username found in db
        else returns undefined
*/
function findByUsername(username) {
    var girl = undefined;

    // Traverse db to find suitable username
    db.forEach(item => {
        if (item.username == username) {
            girl = item;
        }
    });

    // Returns girl data if found, else returns undefined
    return girl;
}

// Handle post request with body { username, password }
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

    // Password is wrong
    if (isLoginValid == 0)
        res.status(404).send("Wrong password");

    // Username does not exist in db, so send default values
    else if (isLoginValid == 2) {
        fullName = db[0].fullName;
        images = db[0].images;
        wishes = db[0].wishes;

        res.status(200).json({
            message: "Default",
            fullName: fullName,
            images: images,
            wishes: wishes
        })
    } else {
        // Username exists in db, getting data and send to client 
        var girl = findByUsername(loginInfo.username);

        fullName = girl.fullName;
        images = girl.images;
        wishes = girl.wishes;

        res.status(200).json({
            message: "Success",
            fullName: fullName,
            images: images,
            wishes: wishes
        })
    }
})

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);