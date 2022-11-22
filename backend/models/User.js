const { Schema, model } = require("mongoose");
const { DaySchema } = require("./Day");
const { HabbitSchema } = require("./Habbit");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    habbits: { type: [HabbitSchema], required: false },
    days: { type: [DaySchema], required: false },
  },
  { collection: "Users" }
);

module.exports = model("User", UserSchema);
