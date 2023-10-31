const express = require('express');
const cors = require('cors');

const app = express(); // to access rest api
const db = require("./model");
app.use(express.json());
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
//Access API URL
app.get("/", (req, res) => {
    res.json({message: "Welcome" });
});

//importing the route.js so that we can access
require("./routes/product.route.js")(app);
require("./routes/cart.route.js")(app);
//Set PORT, to listen for requests
// const PORT = process.env.PORT || 8083
const PORT = 8085
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}.`);
});