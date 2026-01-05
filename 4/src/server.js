import fastify from "fastify";
import getCompanies from "./utils.js";

export default () => {
  const app = fastify();

  const companies = getCompanies();

  // BEGIN (write your solution here)
  app.get('/companies/:id', async (request, reply) => {
    const companyId = request.params.id;
    
    const company = companies.find(company => company.id === companyId);
    
    if (!company) {
      return reply.status(404).send('Company not found');
    }
    
    return reply.send(company);
  });

  // END

  return app;
};
