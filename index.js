"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = __importDefault(require("express-graphql"));
var scheama_1 = __importDefault(require("./graphql/scheama"));
var resolver_1 = __importDefault(require("./graphql/resolver"));
var app = express_1.default();
app.use("/graphiql", express_graphql_1.default({
    schema: scheama_1.default,
    rootValue: resolver_1.default,
    graphiql: true,
}));
var host = '0.0.0.0';
var port = process.env.PORT || 3000;
app.listen(port, host, function () {
    console.log("Running a GraphQL API server at localhost:3000/graphiql");
});
