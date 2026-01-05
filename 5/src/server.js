import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
   app.get('/users', (request, reply) => {
    return reply.send(users);
  });

  app.get('/users/:id', (request, reply) => {
    const userId = request.params.id;
    
    const user = users.find(u => u.id === userId);
    
     if (!user) {
      return reply.code(404).send('User not found');
    }
    
    return reply.send(user);
  });

  // END

  return app;
};
