exports.up = function (knex) {
  return knex.schema.createTable("lists", (table) => {
    table.increments();
    table.string("content").notNullable();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("lists");
};
