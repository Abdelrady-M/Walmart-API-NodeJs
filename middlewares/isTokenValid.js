const jwt = require("jsonwebtoken");

function tokenValidate(req, res, next) {
    let decoded = jwt.decode(req.headers.token, process.env.JWT_SECRET);
    decoded
        ? next()
        : res.status(401).json({ message: "Invalid token, logOut" });
}

module.exports = { tokenValidate };
