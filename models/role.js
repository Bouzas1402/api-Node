const { Schema, model } = require("mongoose");
const { modelName } = require("./usuario");

const RoleSchema = Schema({
  rol: {
    type: String,
    require: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
