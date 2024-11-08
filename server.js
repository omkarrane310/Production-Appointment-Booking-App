const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));


// static file deploy
app.use(express.static(path.join(__dirname,'./client/build')))

app.get("*",function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} Mode on port ${port}`.bgCyan.white);
});
