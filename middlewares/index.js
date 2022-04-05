const validarCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const adminRol = require("../middlewares/validar-roles");
const tieneRole = require("../middlewares/validar-roles");
module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...adminRol,
  ...tieneRole,
};
