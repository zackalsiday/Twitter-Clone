const express = require("express");
// this create a new Express server
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
// we are declaring out routes
const bodyParser = require('body-parser'); 
// this is a parser to parse the JSON we send to our frontend
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// this is middleware for our body parser
const port = process.env.PORT || 8000;
// we are telling out app which port to run on and if deployed to heroku run on "process.env.PORT"

app.get("/", (req, res) => {
    res.send("Hel World")
})
app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.listen(port, () => console.log(`Server is running on port ${port}`));
// this tells express to start a socket and listen to connection on the path.