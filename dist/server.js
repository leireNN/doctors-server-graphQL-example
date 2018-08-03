"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const PORT = 3000;

var apolloServer = new _apolloServerExpress.ApolloServer(_schema2.default);
var app = (0, _express2.default)();

// const schemaFunction =
//   Schema.schemaFunction ||
//   function() {
//     return Schema.schema
//   }
// let schema
// const rootFunction =
//   Schema.rootFunction ||
//   function() {
//     return schema.rootValue
//   }
// const contextFunction =
//   Schema.context ||
//   function(headers, secrets) {
//     return Object.assign(
//       {
//         headers: headers,
//       },
//       secrets,
//     )
//   }

apolloServer.applyMiddleware({ app: app });

app.listen({ port: 3000 }, function () {
  return console.log("\uD83D\uDE80 Server ready at http://localhost:3000" + apolloServer.graphqlPath);
});
//# sourceMappingURL=server.js.map