const { Schema } = require("mongoose");

const HabbitSchema = new Schema({
    name: { type: String, required: true},
    started: { type: String, required: true },
    info:{ type: String, required: false},
    ended: {type: String, required:false},
    done:{ type: Boolean, required:true}
})

module.exports = { HabbitSchema }