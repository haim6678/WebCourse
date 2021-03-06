const calculateNextState = require('./src/calculateNextState');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

// Parsers for POST data - adding a middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set our api routes - for MVC
app.post('/calculate', (req, res) => {
    let val = req.body.input;
    let allowed = "*/=+-";
    // input check
    if (isNaN(val) && allowed.indexOf(val) == -1) {
      res.json({display: "error"});
      return;
    }
    res.json(calculateNextState(req.body.calculatorState, req.body.input));
});

// echo test to check connection
app.get('/connectionCheck/:val', (req, res) => {
    res.send(req.params.val);
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    // res.json(calculate.calculateNextState(null,'1'));
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port.
server.listen(port, () => console.log(`API running on localhost:${port}`));
