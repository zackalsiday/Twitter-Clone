const express = require("express");
// this create a new Express server
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
// we are declaring out routes
const passport = require('passport');
const bodyParser = require('body-parser'); 
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
app.get("/", (req, res) => res.send("Hello World"));
app.use(passport.initialize());
require('./config/passport')(passport);
// this is a parser to parse the JSON we send to our frontend
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// this is middleware for our body parser
// we are telling out app which port to run on and if deployed to heroku run on "process.env.PORT"

app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
// this tells express to start a socket and listen to connection on the path.