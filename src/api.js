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
    res.status(200).json({
        username: req.body.username,
        password: req.body.password,
        imageURL: "Suppose this is imageURL!"
    })
})

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);