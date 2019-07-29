const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const accountRoutes = require('./routes/accountRoutes'); //Import our routes
const surveyRoutes = require('./routes/surveyRoutes'); //Import our routes
const statsRoutes = require('./routes/statsRoutes'); //Import our routes

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * By enabling the "trust proxy" setting via app.enable('trust proxy'), 
 * Express will have knowledge that it's sitting behind a proxy and that the X-Forwarded-* header fields may be trusted, which otherwise may be easily spoofed.
 * This allows the client IP address/s to be accessed via req.ip or req.ips.
 */
app.set('trust proxy', true);

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
}

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/account', accountRoutes); //Use our account routes
app.use('/survey', surveyRoutes); //Use our account routes
app.use('/update', statsRoutes); //Use our account routes

// Express serve up index.html file if it doesn't recognize route
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


/**
 * Our error handler middleware, errors processed using 'next' are sent to here.
 * This has to be declared after the other middleware otherwise errors won't be sent here.
 */
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(`Woops! Something broke:
     ${err}`);
})

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});