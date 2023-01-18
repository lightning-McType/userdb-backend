const router = require("express").Router();
const products = require("../products.json");
const passport = require("passport");

const middleware = passport.authenticate("jwt", { session: false });

router.get("/allProducts", middleware, (req, res) => {
  res.json(products);
});

module.exports = router;
