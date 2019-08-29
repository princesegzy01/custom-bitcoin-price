"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
// Construct a schema, using GraphQL schema language
var gqlSchema = graphql_1.buildSchema("\n  type Query {\n    hello: String\n    calculatePrice(type : String!, margin: Float!, exchangeRate: Int!): String\n  }\n");
module.exports = gqlSchema;
exports.default = gqlSchema;
