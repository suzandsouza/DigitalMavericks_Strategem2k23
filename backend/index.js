const express = require("express");
// const connectDB = require("./config/db");
const { urlencoded } = require("express");
const cors = require("cors");
const dotenv=require('dotenv')
const connectDatabase=require('./config/database')
const app = express();

// connectDB();

app.use(urlencoded({ extended: true }));
app.use(express.json({ extended: false })); //bodyParser
app.use(cors());
dotenv.config({path:'./config/.env'})

connectDatabase()

app.get("/", (req, res) => res.send("API RUNNING"));
app.use("/api/users", require('./routes/userRoutes'));

//Define Routes
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/classroom", require("./routes/api/classroom"));
const PORT = process.env.PORT || 5000;
