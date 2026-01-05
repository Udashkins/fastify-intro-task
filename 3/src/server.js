import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get("/users", async (request, reply) => {
    const page = _.toInteger(request.query.page) || 1;
    const per = _.toInteger(request.query.per) || 5;
    
    // Используем lodash chain для более функционального подхода
    const paginatedUsers = _.chain(users)
      .slice((page - 1) * per, page * per) // Используем page*per вместо start+per
      .value();
    
    return paginatedUsers;
  });

  // END

  return app;
};
