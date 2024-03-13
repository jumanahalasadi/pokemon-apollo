"use client";

import { ChakraProvider } from "@chakra-ui/react";
import ApolloProviderWrapper from "./apollo-provider";
import { UserContextProvider } from "../context/userContext";

/*
Combining all client side providers into one single provider which will wrap around the app
*/
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
      </UserContextProvider>
    </ChakraProvider>
  );
}
