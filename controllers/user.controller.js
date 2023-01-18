const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUserDoc = new User({ ...req.body, password: hashedPassword });
    await newUserDoc.save();
    return res.status(201).json({ message: "User signup complete" });
  } catch (err) {
    return res.status(500).json({ message: "Email already exists" });
  }
};

const generateToken = (userId) => {
  const payload = { userId };
  const token = jwt.sign(payload, secret);
  return token;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User with the given credentials doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = generateToken(user._id);
      return res.json({ isLoggedIn: true, user, token });
    } else {
      return res.json({ isLoggedIn: false });
    }
  } catch (err) { 
    return res.sendStatus(500);
  }
};

module.exports = {
  signup,
  login,
};
