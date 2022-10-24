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
    try {
        res.send(
            `<h1 style="text-align: center">Bienvenido a mi nueva entrega! 😎</h1>`
        );
    } catch (error) {
        console.log(`Error cargando el proyecto: ${error}`);
    }
});

app.get("/productos", (req, res) => {
    const ejecutar = async () => {
        try {
            const arrayProductos = await productos.getAll();
            let card = ``;
            arrayProductos.map(
                item =>
                    (card += `<div style="background-color: black; color: white; text-align: center; height: auto; width: 300px"><h2>Nombre: ${item.title}</h2><h3>Precio: ${item.price}</h3><img style="margin-bottom: 10px" height="250px" src="${item.thumbnail}"></div>`)
            );
            res.send(
                `<h1 style="text-align: center">Todos los productos:</h1><section style="display: flex; justify-content: space-around">${card}</section>`
            );
        } catch (error) {
            console.log(`Error obteniendo todos los productos: ${error}`);
        }
    };
    ejecutar();
});

app.get("/random", (req, res) => {
    const ejecutar = async () => {
        try {
            const arrayProductos = await productos.getAll();
            let numero = Math.floor(Math.random() * arrayProductos.length);
            const producto = await productos.getById(numero + 1);
            let card = `<div style="background-color: black; color: white; text-align: center; height: auto; width: 300px"><h2>Nombre: ${producto[0].title}</h2> <h3>Precio: ${producto[0].price}</h3> <img style="margin-bottom: 10px"height="250px" src="${producto[0].thumbnail}"></div>`;
            res.send(
                `<h1 style="text-align: center">Producto al azar:</h1><section style="display: flex; justify-content: space-around">${card}</section>`
            );
        } catch (error) {
            console.log(`Error obteniendo un producto al azar: ${error}`);
        }
    };
    ejecutar();
});
