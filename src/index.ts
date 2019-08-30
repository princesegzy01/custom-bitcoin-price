import express from "express";
import graphqlHTTP from "express-graphql";
import resolver from "./graphql/resolver";
import gqlSchema from "./graphql/scheama";

const exports = (module.exports = {});

const app = express();
app.use(
	"/graphiql",
	graphqlHTTP({
		schema: gqlSchema,
		rootValue: resolver,
		graphiql: true,
	}),
);

const host = "0.0.0.0";
const port: any = process.env.PORT || 3000;

const server = app.listen(port, host, () => {
	console.log("Running a GraphQL API server at localhost:3000/graphiql");
});

exports.closeServer = () => {
	server.close();
};
