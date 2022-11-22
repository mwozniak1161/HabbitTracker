const express = require('express');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const cors = require("cors")

const { PORT, DB, corsOptions} = require("./config/config")
const userRoutes = require("./routes/User")

const app = express();

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/", userRoutes)


mongoose.connect(DB).then(() => { 
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
}).catch(() => { 
console.log("Cannot connect to DB!")
})
