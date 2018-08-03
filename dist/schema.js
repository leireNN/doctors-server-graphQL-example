"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  type Query {\n    hello: String\n    doctor(id: Int): Doctor\n    doctor(name: String): Doctor\n    doctors: [Doctor]\n    patients: [Patient]\n  }\n\n  type Doctor {\n    # A nice name\n    name: String\n    lastName: String\n    patients(name: String): [Patient]\n  }\n\n  type Patient {\n    # A nice name\n    name: String\n    lastName: String\n    doctor: Int\n    # doctors: [Doctors]\n  }\n"], ["\n  type Query {\n    hello: String\n    doctor(id: Int): Doctor\n    doctor(name: String): Doctor\n    doctors: [Doctor]\n    patients: [Patient]\n  }\n\n  type Doctor {\n    # A nice name\n    name: String\n    lastName: String\n    patients(name: String): [Patient]\n  }\n\n  type Patient {\n    # A nice name\n    name: String\n    lastName: String\n    doctor: Int\n    # doctors: [Doctors]\n  }\n"]); // graphql-tools combines a schema string with resolvers.
// import { makeExecutableSchema } from 'graphql-tools'


var _apolloServerExpress = require("apollo-server-express");

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

// const doctors = {
//   1: {
//     name: 'Jason',
//   },
// }

var _doctors = [{ id: 1, name: "Jason", lastName: "Foo" }, { id: 2, name: "Bar", lastName: "Bar" }];

var _patients = [{ id: 1, name: "Leire", lastName: "Polo", doctor: 2 }, { id: 2, name: "Alice", lastName: "Mao", doctor: 1 }];

// Construct a schema, using GraphQL schema language

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject);

// Provide resolver functions for your schema fields
var resolvers = {
  Query: {
    hello: function hello(root, args, context) {
      return "Hello world!";
    },
    doctors: function doctors() {
      return _doctors;
    },
    doctor: function doctor(root, _ref, context) {
      var id = _ref.id;
      return _doctors.filter(function (doctor) {
        return doctor.id == id;
      })[0];
    },
    patients: function patients(root, _ref2, context) {
      var name = _ref2.name;
      return _patients;
    }
  },
  Doctor: {
    patients: function patients(root, _ref3, context, info) {
      var name = _ref3.name;

      var doctorId = _doctors.filter(function (doctor) {
        return doctor.name == name;
      })[0].id;
      return _patients.filter(function (patient) {
        return patient.doctor == doctorId;
      });
      // return patients;
    }
    // Patient: {
    //   patients: (root, args, context, info) => [{ name: "Foo" }]
    // }
  } };

// Required: Export the GraphQL.js schema object as "schema"
exports.default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
// export function context(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };

// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
//# sourceMappingURL=schema.js.map