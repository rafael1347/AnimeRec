const express = require("express");
const bodyParser = require("express");
cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established");
});

const watchlistRouter = require("./routes/anime");
const userRouter = require("./routes/users");
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoute);

app.use("/anime", watchlistRouter);
app.use("/users", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port} `);
});
