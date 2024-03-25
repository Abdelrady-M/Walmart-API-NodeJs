// const passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         if (err) {
//           console.log("error from findOrCreate method", user);
//           return cb(err, null);
//         }

//         // If user is found or created successfully, save additional user data
//         user.username = profile.displayName;
//         user.avatar = profile.photos[0];
//         user.save();

//         return cb(null, user);
//       });
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
