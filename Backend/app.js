// Set up express
const express = require("express");
const app = express();

// Set up cors
const cors = require("cors");
app.use(cors());

// Set up knex
const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up auth
const auth = require("./Auth/auth")(knex);
app.use(auth.initialize());

// Set up list service and router
const ListService = require("./Service/listService");
const ListRouter = require("./Router/listRouter");
const listService = new ListService(knex);
const listRouter = new ListRouter(listService, auth);

// Set up router
app.use("/", listRouter.router());

app.listen(8080, () => {
  console.log("Application listening to port 8080");
});
