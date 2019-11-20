// middleware that restricts user access
module.exports = function (res, req, next) {
    // if there is a user allow them to access the route they are heading
    if (req.user || req.session.user) {
        return next();
    }
    //if there is no user logged in redirect them to login
    return res.redirect("/user/login");
};