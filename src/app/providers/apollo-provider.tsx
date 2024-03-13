"use client";

import client from "../utils/apollo/apollo-client";
import { ApolloProvider } from "@apollo/client";

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
