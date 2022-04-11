const express = require("express");
const fs = require("fs")

class Contenedor {
  constructor(producto) {
    this.producto = producto;
  }
  leer = async () => {
    try {
      const data = fs.readFileSync(this.producto, "utf-8");
      console.log(JSON.parse(data));
      return JSON.parse(data);
    } catch (e) {
      console.log("Este array está vacío...");
      return [];
    }
  };
}

const app = express();
const PORT = 8080;
const http = require("http").Server(app);

let server;
server = http.listen(PORT, () =>
  console.log(`Servidor HTTP escuando en el puerto ${PORT}`)
);

app.get("/", (req, res) => {
  const objRes = { msg: "Sitio principal de productos" };
  res.json(objRes);
});

app.get("/productos", (req, res) => {
  const archivo = new Contenedor("./productos.json");
  archivo.leer().then((producto)=>{
    res.json(producto)
  });
});

app.get("/productoRandom", (req, res) => {
  const archivo = new Contenedor("./productos.json");
  archivo.leer().then((producto) => {
    let productos = producto[Math.floor(Math.random() * producto.length)];
    res.json(productos);
  });
});
