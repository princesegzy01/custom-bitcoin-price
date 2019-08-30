"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = __importDefault(require("express-graphql"));
var resolver_1 = __importDefault(require("./graphql/resolver"));
var scheama_1 = __importDefault(require("./graphql/scheama"));
var exports = (module.exports = {});
var app = express_1.default();
app.use("/graphiql", express_graphql_1.default({
    schema: scheama_1.default,
    rootValue: resolver_1.default,
    graphiql: true,
}));
var host = "0.0.0.0";
var port = process.env.PORT || 3000;
var server = app.listen(port, host, function () {
    console.log("Running a GraphQL API server at localhost:3000/graphiql");
});
exports.closeServer = function () {
    server.close();
};
