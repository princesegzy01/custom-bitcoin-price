import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const gqlSchema = buildSchema(`
  type Query {
    hello: String
    calculatePrice(type : String!, margin: Float!, exchangeRate: Int!): String
  }
`);

module.exports = gqlSchema;
export default gqlSchema;
