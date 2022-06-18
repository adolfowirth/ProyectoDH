const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const { validationResult } = require("express-validator");

const productsController = {
  index: (req, res) => {
    res.render("index", { titulo: "Mundo Mascota DH" });
  },

  todosLosProductos: (req, res) => {
    const todosLosProductos = JSON.parse(
      fs.readFileSync(productsFilePath, "utf-8")
    );
    res.render("todosLosProductos", {
      titulo: "Mundo Mascota DH-Productos",
      todosLosProductos,
    });
  },

  productDetail: (req, res) => {
    const todosLosProductos = JSON.parse(
      fs.readFileSync(productsFilePath, "utf-8")
    );
    let id = req.params.id;
    let product = todosLosProductos.find((product) => product.id == id);
    res.render("productDetail", {
      titulo: "Mundo Mascota DH-Detalle Producto",
      product,
    });
  },

  productCart: (req, res) => {
    res.render("productCart", { titulo: "Mundo Mascota DH-Carrito" });
  },

  sucursales: (req, res) => {
    res.render("sucursales", { titulo: "Mundo Mascota DH-Sucursales" });
  },

  productAdmin: (req, res) => {
    const todosLosProductos = JSON.parse(
      fs.readFileSync(productsFilePath, "utf-8")
    );
    res.render("productAdmin", {
      titulo: "Mundo Mascota DH-Productos Admin",
      todosLosProductos,
    });
  },

  New: (req, res) => {
    res.render("productNew", { titulo: "Mundo Mascota DH-Alta Producto" });
  },

  create: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const allProducts = JSON.parse(
        fs.readFileSync(productsFilePath, "utf-8")
      );
      let newProduct = {
        id: parseInt(allProducts[allProducts.length - 1].id) + 1,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        familia: req.body.familia,
        precio: parseFloat(req.body.precio),
        descuento: parseFloat(req.body.descuento),
        activo: req.body.activo == "SI" ? 1 : 0,
        imagen: "/img/products/" +  req.file.filename,
        usuario: "Admin",
      };
      allProducts.push(newProduct);
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(allProducts, null, " ")
      );
      res.redirect("/products/productAdmin");
    } else {
      const alert = errors.array();
      return res.render("productNew", {
        titulo: "Mundo Mascota DH-Alta Producto",
        alert,
        old: req.body,
      });
    }
  },

  Edit: (req, res) => {
    const allProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let productToEdit = allProducts.find((user) => req.params.id == user.id);
    res.render("productEdit", {
      titulo: "Mundo Mascota DH-Editar Producto",
      productToEdit,
    });
  },

  update: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const allProducts = JSON.parse(
        fs.readFileSync(productsFilePath, "utf-8")
      );
      let productToEdit = allProducts.find((prod) => req.params.id == prod.id);
      let editedProduct = {
        id: parseInt(req.params.id),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.file ? req.file.filename : productToEdit.imagen,
        categoria: req.body.categoria,
        familia: req.body.familia,
        precio: parseFloat(req.body.precio),
        descuento: parseFloat(req.body.descuento),
        fecha: req.body.fecha,
        usuario: "Admin",
        activo: req.body.activo == "SI" ? 1 : 0,
      };
      let indice = allProducts.findIndex((prod) => prod.id == req.params.id);
      allProducts[indice] = editedProduct;
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(allProducts, null, " ")
      );
      res.redirect("/products/productAdmin");
    // }else {
    //     const alert = errors.array();
    //     return res.render("productEdit", {
    //       titulo: "Mundo Mascota DH-Editar Producto",
    //       alert,
    //       old: req.body,
    //     });
      }
  },

  inactivar: (req, res) => {
    const todosLosProductos = JSON.parse(
      fs.readFileSync(productsFilePath, "utf-8")
    );
    let unProd = todosLosProductos.filter(
      (product) => product.id == req.params.id
    );

    let editProducto = {
      id: req.params.id,
      nombre: unProd[0].nombre,
      descripcion: unProd[0].descripcion,
      imagen: unProd[0].imagen,
      categoria: unProd[0].categoria,
      familia: unProd[0].familia,
      precio: unProd[0].precio,
      descuento: unProd[0].descuento,
      fecha: unProd[0].fecha,
      usuario: unProd[0].usuario,
      activo: 0,
    };
    let indice = todosLosProductos.findIndex(
      (product) => product.id == req.params.id
    );
    todosLosProductos[indice] = editProducto;
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(todosLosProductos, null, " ")
    );

    res.redirect("/products/productAdmin");
  },

  activar: (req, res) => {
    const todosLosProductos = JSON.parse(
      fs.readFileSync(productsFilePath, "utf-8")
    );
    let unProd = todosLosProductos.filter(
      (product) => product.id == req.params.id
    );

    let editProducto = {
      id: req.params.id,
      nombre: unProd[0].nombre,
      descripcion: unProd[0].descripcion,
      imagen: unProd[0].imagen,
      categoria: unProd[0].categoria,
      familia: unProd[0].familia,
      precio: unProd[0].precio,
      descuento: unProd[0].descuento,
      fecha: unProd[0].fecha,
      usuario: unProd[0].usuario,
      activo: 1,
    };
    let indice = todosLosProductos.findIndex(
      (product) => product.id == req.params.id
    );
    todosLosProductos[indice] = editProducto;
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(todosLosProductos, null, " ")
    );

    res.redirect("/products/productAdmin");
  },
};
module.exports = productsController;
