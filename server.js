const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

// used to connect DB
console.log("DB Connection is in progress");
connectDb();

const app = express();

// this is middeleware which is used to parse the incoming data from client to convert to js object
// express.json is a built in middleware
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${port}`);
});
