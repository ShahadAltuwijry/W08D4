const userModel = require("./../../db/module/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { request } = require("express");

dotenv.config();

const SECRETKEY = process.env.SECRETKEY;

passport.use(
  new GoogleStrategy(
    {
      //this was on local host if it crashed put it back
      callbackURL: process.env.AUTH_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log(profile._json.email);
      const email = profile._json.email;
      const userName = profile._json.name;

      try {
        const user = await userModel.findOne({
          $or: [{ userName }, { email }],
        });

        if (user) {
          const payload = {
            id: user._id,
            email: user.email,
            userName: user.userName,
            role: user.role,
            isDel: user.isDel,
          };

          const token = jwt.sign(payload, SECRETKEY);

          return done(null, { result: user, token });
        } else {
          const newUser = new userModel({
            email: email,
            password: userName,
            userName: userName,
            avatar: profile._json.picture,
            confirmed: true,
          });

          newUser.save().then(async (result) => {
            const res = await userModel.findOne({ _id: result._id });

            const payload = {
              id: res._id,
              email: res.email,
              userName: res.userName,
              isDel: res.isDel,
            };

            const token = jwt.sign(payload, SECRETKEY);

            return done(null, { result: res, token });
          });
        }
      } catch (error) {
        console.log("error is:", error.message);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// passport.use(new GoogleStrat({
//     callbackURL: "/login/redirect",
//     clientID: 186579919465-58fvchi49hbf0f62910cqndnuc4gjsgc.apps.googleusercontent.com,
//     clientSecret: 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,
// }))
