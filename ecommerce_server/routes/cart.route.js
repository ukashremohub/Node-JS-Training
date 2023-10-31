//using express we can create the route
module.exports = app => {
    const cart = require("../controller/cart.controller.js");

    var router = require("express").Router(); //Access REST API methods(GET,POST,PUT,DELETE)
    
    //Create a new Cartss
    router.get("/", cart.showAll);
    router.post("/createcart", cart.create);
    router.put("/updatecart/:id", cart.update);
    router.delete("/deletecart/:id", cart.delete);
    router.delete("/deletecart", cart.deleteAll);

    app.use("/api/cart", router);

};