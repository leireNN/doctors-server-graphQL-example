import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import Schema from './schema'

const apolloServer = new ApolloServer(Schema)
const app = express()

apolloServer.applyMiddleware({ app })

app.listen({ port: 3000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:3000${apolloServer.graphqlPath}`,
  ),
)
