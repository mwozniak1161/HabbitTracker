const { Schema } = require("mongoose");
const { HabbitSchema } = require("./Habbit")

const DaySchema = new Schema({
    date: { type: String, required: true },
    habbits: { type:[HabbitSchema], required: false}
})

module.exports = { DaySchema }