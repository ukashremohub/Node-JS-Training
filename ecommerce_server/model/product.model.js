const { mongo, Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {//typeScript style 
            title: String,
            description: String,
            price: Number,
            model: String
        }
    );

    //
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
                            //collections
    const Product = mongoose.model("product", schema);
    return Product;

};