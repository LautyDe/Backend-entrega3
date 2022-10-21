const express = require("express");
const Contenedor = require("./contenedor");
const productos = new Contenedor("./productos.json");
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});
server.on("error", error => console.log(`Error en servidor: ${error.message}`));

app.get("/", (req, res) => {
    res.send(
        `<h1 style="text-align: center">Bienvenido a mi nueva entrega! 😎</h1>`
    );
});

app.get("/productos", (req, res) => {
    const ejecutar = async () => {
        const arrayProductos = await productos.getAll();
        let card = ``;
        arrayProductos.map(
            item =>
                (card += `<div style="background-color: black; color: white; text-align: center; height: auto; width: 300px"><h2>Nombre: ${item.title}</h2><h3>Precio: ${item.price}</h3><img style="margin-bottom: 10px" height="250px" src="${item.thumbnail}"></div>`)
        );
        res.send(
            `<h1 style="text-align: center">Todos los productos:</h1><section style="display: flex; justify-content: space-around">${card}</section>`
        );
    };
    ejecutar();
});
