const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

class ListService {
  constructor(knex) {
    this.knex = knex;
  }

  async signup(name, email, password) {
    console.log("Signup", name, email, password);
    let hashedPassword = await bcrypt.hash(password, 10);
    return this.knex("users").insert([
      {
        name: name,
        email: email,
        password: hashedPassword,
      },
    ]);
  }

  async login(email, password) {
    console.log("Login", email, password);
    let query = await this.knex("users")
      .select("*")
      .where("email", email)
      .then((data) => data[0]);
    console.log("Login query", query);

    if (await bcrypt.compare(password, query.password)) {
      let payload = {
        id: query.id,
      };
      console.log("Login payload", payload);
      let token = jwt.sign(payload, config.jwtSecret);
      console.log("Login token", token);
      return token;
    }
  }

  getUserInfo(userId) {
    return this.knex("users").select("users.name").where("users.id", userId);
  }

  getToDoList(userId) {
    return this.knex("lists")
      .select("*")
      .where("user_id", userId)
      .orderBy("lists.id");
  }

  addToDoList(list, userId) {
    return this.knex
      .insert({ content: list, user_id: userId })
      .into("lists")
      .returning("*");
  }

  editToDoList(editedList, listId) {
    return this.knex("lists")
      .where("id", listId)
      .update("content", editedList)
      .returning("*");
  }

  deleteToDoList(listId) {
    return this.knex("lists").where("id", listId).del();
  }
}

module.exports = ListService;
