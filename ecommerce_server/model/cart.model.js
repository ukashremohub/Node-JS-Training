const { mongo, Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {//typeScript style 
            cartID: Number,
            productID: Number,
            quantity: Number,
            totalPrice: Number
        }
    );

    //
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
                            //collections
    const Cart = mongoose.model("cart", schema);
    return Cart;

};