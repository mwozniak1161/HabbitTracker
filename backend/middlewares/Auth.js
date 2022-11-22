const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config')

const authenticateToken = (req, res, next)=>{
    const authToken = req.cookies.jwt
    if (authToken == null) return res.status(401).send({ data: "No user logged in!" })
    jwt.verify(authToken, JWT_SECRET, (err) => {
        if (err) return res.status(403).send({ data: "Operation failed! " })
        next()
    })
}

module.exports = { authenticateToken }