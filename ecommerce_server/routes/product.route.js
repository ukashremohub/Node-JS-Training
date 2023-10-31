//using express we can create the route
module.exports = app => {
    const products = require("../controller/product.controller.js");

    var router = require("express").Router(); //Access REST API methods(GET,POST,PUT,DELETE)
    
    //Create a new Products
    router.get("/", products.showAll);
    router.post("/createproduct", products.create);
    router.put("/updateproduct/:id", products.update);
    router.delete("/deleteproduct/:id", products.delete);
    router.delete("/deleteproduct", products.deleteAll);

    app.use("/api/products", router);

};