const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const user = require("./routes/api/users");
const profile = require("./routes/api/profile");
const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");
const path = require("path");

const app = express();

//Connect Database
connectDB();

//Init Middlewares
app.use(express.json({ extended: false })); //extended false to get the body in any type if true means will get only array or string
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Define Routes
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
