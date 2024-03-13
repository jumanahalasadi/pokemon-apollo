import { ApolloClient, InMemoryCache } from "@apollo/client";

import { HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  headers: {},
  // additional options
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

console.log("GraphQL Apollo Client Ready");

export default client;
