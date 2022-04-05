const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, contraseña } = req.body;

  try {
    // Verificar si el email existe

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / contraseña no son correctos - correo",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario no es correcto por que el estado es false - usuario",
      });
    }

    const constraseñaValida = bcryptjs.compareSync(
      contraseña,
      usuario.contraseña
    );
    if (!constraseñaValida) {
      return res.status(400).json({
        msg: "Usuario / contraseña no son correctos - contraseña",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      contraseña,
      correo,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hable con el administrador" });
  }
};

module.exports = { login };
