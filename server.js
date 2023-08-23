const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Maks:maks2002@cluster01.smaassk.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });