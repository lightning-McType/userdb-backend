const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const secret = process.env.SECRET;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new JWTStrategy(options, (payload, done) => {
  try {
    done(null, true);
  } catch (err) {
    done(err, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
