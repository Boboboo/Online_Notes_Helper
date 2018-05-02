const express  = require('express');
const port     = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const settings = require("./config/settings");
const mongoConfig = settings.mongoConfig;
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const configRoutes = require("./routes");

const app = express();
const statics = express.static(__dirname + '/public');

const handlebarsInstance = exphbs.create({
    defaultLayout: "main",
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === "number")
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    }
});
  
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
    next();
};


// configuration, connect to database ===========================================
mongoose.connect(mongoConfig.serverUrl+mongoConfig.database,{ useMongoClient: true });
require('./config/passport')(passport); 

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.use("/public", statics);
app.engine("handlebars", handlebarsInstance.engine);
app.set('view engine', 'handlebars'); 

// required for passport
app.use(session({
    secret: 'pppppokerface', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

// routes ======================================================================
require('./routes/login_out.js')(app, passport); 
configRoutes(app);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
