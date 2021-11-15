const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require("../config");
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = (knex) => {
  const strategy = new passportJWT.Strategy(
    {
      secretOrKey: config.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      console.log("Payload", payload);
      let query = await knex.select("*").from("users").where("id", payload.id);
      await query;
      console.log("Query", query);
      let user = {
        id: query[0].id,
      };
      console.log("User", user);
      if (user) {
        return done(null, { id: user.id });
      } else {
        return done(new Error("User not found", null));
      }
    }
  );
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", config.jwtSession);
    },
  };
};
