const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy

// telling passport what strategy to use
// and email/password
passport.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true
        },
        function (email, password, done) {
            //when a user attempts to login, run this code
            db.User.findOne({ where: { email: email } }).then(function (dbUser) {
                // if there is no user, tell them no by user by that email registered
                if (!dbUser) {
                    return done(null, false, { message: "incorrect email" });
                }
                //
                else if (dbUser.verifyPassword(password)) {
                    return done(null, false, { message: "Incorrect message" });
                }
                // return done(null, dbUser);
                else {
                    //if theres no user create one
                    db.User.create({
                        nickname: req.nickname,
                        email: email,
                        password: password
                    }).then(function (newUser) {
                        if (!newUser) {
                            return done(null, false);
                        }
                    });




                    function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (!user) {
                            return done(null, false);
                        }
                        if (!user.verifyPassword(password)) {
                            return done(null, false);
                        }
                        return done(null, user);
                    };


                    passport.serializeUser(function (user, done) {
                        done(null, user);
                    });

                    passport.deserializeUser(function (user, done) {
                        done(null, user)
                    });

                }


                module.exports = passport;
