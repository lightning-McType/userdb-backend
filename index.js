require("dotenv").config();

const passport = require("passport");
const configurePassport = require("./config/passport");
configurePassport(passport);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server stated to lister on ${process.env.PORT}`);
});
