const { Schema, model } = require("mongoose");

const Calle = require("./calle");
const AnuncioSchema = Schema({
  titulo: {
    type: String,
    require: [true, "El titulo es obligatorio"],
  },
  direccion: [Calle],
  fotos: [{ titulo: String, URL: String }],
  descripcion: {
    type: String,
  },
  creacion: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Anuncio", AnuncioSchema);
