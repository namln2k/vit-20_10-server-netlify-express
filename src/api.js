const express = require('express');
const serverless = require('serverless-http');

const app = express();

const router = express.Router();

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