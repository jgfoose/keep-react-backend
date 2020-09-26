const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./models/Cards");
require("./models/Labels");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.set("useUnifiedTopology", true);

//Create express app
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//pass express app to routes functions
require("./routes/authRoutes")(app);
require("./routes/cardRoutes")(app);

const PORT = process.env.PORT || 5000; //Find what port is being used or use port 5000.
app.listen(PORT);
