const { Router } = require("express");
const { check } = require("express-validator");

const Role = require("../models/role");

const {
  validarCampos,
  validarJWT,
  adminRol,
  tieneRole,
} = require("../middlewares");
const {
  esRolValido,
  esEmailValido,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "contraseña",
      "La contraseña es obligatoria y mayor a 6 letras"
    ).isLength({ min: 6 }),
    check("correo").custom(esEmailValido),
    check("rol").custom(esRolValido),
    //  check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuariosPost
);
router.delete(
  "/:id",
  [
    validarJWT,
    //adminRol,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);

module.exports = router;
