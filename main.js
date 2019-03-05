#!/usr/bin/env node

const express = require('express');
// const path = require('path');

// GCP needs this account key filepath added as a system env variable to authenticate.
// const gcpKeyPath = path.resolve('gcp-service-account-key.json');
// console.log('Setting environment variable GOOGLE_APPLICATION_CREDENTIALS to ' + gcpKeyPath);
// process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve('gcp-service-account-key.json');

const app = express();
// const transcribeController = require('./controllers/transcribe-controller');

app.use(express.json({type: 'application/json', limit: "500mb"}));

app.route('/').post((req, res) => {
    console.log(req.body);
    switch (req.body.type) {
	case 'url_verification':
            res.send({challenge: req.body.challenge});
	    break;
        default:
            res.status(200).send();
	    break;
    }
});

app.listen(8080, () => {
    console.log('Listening on port 8080...');
});

