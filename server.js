const express = require("express");
const cors = require("cors");
const connectdb = require("./configs/dbconfig");

const app = express();
require("dotenv").config();
connectdb();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", require("./routes/authRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/product", require("./routes/productRoute"));

app.listen(process.env.PORT, () => {
  console.log(`server is listening to ${process.env.PORT}`);
});
