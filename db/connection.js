const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("Conectado a MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión a MongoDB:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Desconectado de MongoDB");
});
