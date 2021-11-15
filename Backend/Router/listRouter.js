const express = require("express");

class ListRouter {
  constructor(listService, auth) {
    this.listService = listService;
    this.auth = auth;
  }

  router() {
    let router = express.Router();

    router.post("/signup", this.signup.bind(this));
    router.post("/login", this.login.bind(this));
    router.get(
      "/username/:id",
      this.auth.authenticate(),
      this.getUsername.bind(this)
    );
    router.get(
      "/todolist/:id",
      this.auth.authenticate(),
      this.getList.bind(this)
    );
    router.post(
      "/todolist/:id",
      this.auth.authenticate(),
      this.addList.bind(this)
    );
    router.put(
      "/todolist/:listId",
      this.auth.authenticate(),
      this.editList.bind(this)
    );
    router.delete(
      "/todolist/:listId",
      this.auth.authenticate(),
      this.deleteList.bind(this)
    );

    return router;
  }

  signup(req, res) {
    console.log("SIGNUP");
    return this.listService
      .signup(req.body.name, req.body.email, req.body.password)
      .then((id) => res.send(id));
  }

  login(req, res) {
    console.log("LOGIN");
    return this.listService
      .login(req.body.email, req.body.password)
      .then((token) => {
        if (token) {
          res.json(token);
        } else {
          res.sendStatus(401);
        }
      });
  }

  getUsername(req, res) {
    console.log("GET USERNAME");
    return this.listService
      .getUserInfo(req.params.id)
      .then((username) => {
        console.log(username);
        res.json(username);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  getList(req, res) {
    console.log("GET LIST");
    return this.listService
      .getToDoList(req.params.id)
      .then((todolist) => {
        console.log(todolist);
        res.json(todolist);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  addList(req, res) {
    console.log("ADD LIST");
    console.log(req.body.list);
    return this.listService
      .addToDoList(req.body.list, req.params.id)
      .then((todolist) => {
        console.log("List added", todolist);
        res.json(todolist);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  editList(req, res) {
    console.log("EDIT LIST");
    return this.listService
      .editToDoList(req.body.editedList, req.params.listId)
      .then((todolist) => {
        console.log("Edit list", todolist);
        res.json(todolist);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  deleteList(req, res) {
    console.log("DELETE LIST");
    return this.listService
      .deleteToDoList(req.params.listId)
      .then(() => {
        console.log("Delete list", req.params.listId);
        res.json(req.params.listId);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = ListRouter;
