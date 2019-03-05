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
    if (req.body.type === 'url_verification') {
        console.log(`Received url_verifcation`);
        console.log(`   token: ${req.body.token}`);
        console.log(`   challenge: ${req.body.challenge}`);
        res.send({challenge: req.body.challenge});
    } else {
        processEventCallback(req.body.event);
        res.status(200).send();
    }
});

function processEventCallback(event) {
    switch (event.type) {
        case 'message':
            console.log(`message sent to channel: ${event.text}`);
            break;
        default:
            break;
    }
}

app.listen(8080, () => {
    console.log('Listening on port 8080...');
});

