import express from "express";
import graphqlHTTP from "express-graphql";

import gqlSchema from "./graphql/scheama";
import resolver from "./graphql/resolver";

const app = express();
app.use(
  "/graphiql",
  graphqlHTTP({
    schema: gqlSchema,
    rootValue: resolver,
    graphiql: true,
  }),
);

const host = '0.0.0.0';
let portArg = process.env.PORT || "3000";
const port  = parseInt(portArg, 10)

app.listen(port, host, function(){
    console.log("Running a GraphQL API server at localhost:3000/graphiql");
});
