const express = require("express");
const connectDB = require("./config/db");
const user = require("./routes/api/users");
const profile = require("./routes/api/profile");
const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");

const app = express();

//Connect Database
connectDB();

//Init Middlewares
app.use(express.json({ extended: false })); //extended false to get the body in any type if true means will get only array or string

//Define Routes
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
