const db = require("../model");
const Cart = db.cart;
//Retrive all carts from the database.
exports.showAll = (req, res) => {
   //const title = req.query.title;
   //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" };
    Cart.find({})
    .then(data => {  //.then is promise concept
    res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving Cart."                  
        });
    });
}

//Create a cart
exports.create = (req, res) => {
    if(!req.body.cartID){
        res.status(400).send({message:"cartID cannot be empty"})
        return;
    }
    const cart = new Cart({
        cartID:req.body.cartID,
        productID: req.body.productID,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice
    });
    cart.save()
    .then(data => {
    res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
         err.message || "Some error occurred while retrieving cart."
        });
    });
};

// Update a cart by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
    
    req.body.totalPrice *= req.body.quantity; //Totalprice will get updated according to the quantity

    Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update cart with id=${id}. Maybe cart was not found!`
          });
        } else res.send({ message: "cart was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating cart with id=" + id
        });
      });
  };
  
  // Delete a cart with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cart.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete cart with id=${id}. Maybe cart was not found!`
          });
        } else {
          res.send({
            message: "cart was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete cart with id=" + id
        });
      });
  };
  
  // Delete all cart from the database.
  exports.deleteAll = (req, res) => {
    Cart.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} cart were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cart."
        });
      });
  };