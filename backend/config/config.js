const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 8080
const DB = process.env.DB;
const JWT_SECRET = process.env.JWT_SECRET
const FRONTEND = process.env.FRONTEND

const corsOptions = {
    origin:FRONTEND,
    credentials:true
}


module.exports = { PORT, DB, JWT_SECRET, FRONTEND, corsOptions}