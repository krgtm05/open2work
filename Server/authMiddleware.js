const jwt = require('jsonwebtoken');
const JWT_SECRET = "whocares";

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData) {
        req.userId = decodedData.id;
        next();
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
}
module.exports = {
    auth,
    JWT_SECRET,
    jwt
}