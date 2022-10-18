const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
// this create a new Express server
const port = process.env.PORT || 8000;
// we are telling out app which port to run on and if deployed to heroku run on "process.env.PORT"

app.get("/", (req, res) => res.send("Hel World"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
// this tells express to start a socket and listen to connection on the path.