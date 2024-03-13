"use client";

import { ChakraProvider } from "@chakra-ui/react";
import ApolloProviderWrapper from "./apollo-provider";
import { UserContextProvider } from "../context/userContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
      </UserContextProvider>
    </ChakraProvider>
  );
}
