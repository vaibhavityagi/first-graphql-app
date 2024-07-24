const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyparser = require("body-parser");
const cors = require("cors");

const { TODOS } = require("./todo");
const { USERS } = require("./user");

// ! means the particular field is mandatory
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
  }
  
  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
  }

  type Query {
    todos: [Todo]
    users: [User]
    userById(id: ID!): User
  }`;

const resolvers = {
  Todo: {
    user: (todo) => {
      return USERS.find((user) => user.id == todo.id);
    },
  },
  Query: {
    // perform database operations inside these functions
    todos: () => TODOS,
    users: () => USERS,
    userById: (parent, { id }) => {
      console.log(parent);
      return USERS.find((user) => user.id == id);
    },
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(cors());
  app.use(bodyparser.json());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(3000, () => console.log("listening on port 3000"));
}

startServer();

// graphql server se kuch lena h toh Query ie get requests
// graphql ke server ko kuch dena h toh Mutations ie post, put requests
// logic is written inside resolvers
