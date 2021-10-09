const express = require('express');
const serverless = require('serverless-http');

const app = express();

const router = express.Router();

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

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

router.post('/', (req, res) => {
    const loginInfo = {
        username: req.body.username,
        password: req.body.password,
    }

    var imgJSON;
    if (loginInfo.username == 'nam' && loginInfo.password == '123') {
        imgJSON = 'nam';
    } else if (loginInfo.username == 'tan') {
        imgJSON = 'tan';
    } else {
        res.status(404);
        continue;
    }
    res.status(200).json({
        imgData: imgJSON
    })
})

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);