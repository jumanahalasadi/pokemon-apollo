"use client";

import InfoList from "./components/InfoList/InfoList";
import LoadingSkeleton from "./components/LoadingSkeleton/LoadingSkeleton";
import dynamic from "next/dynamic";
import useGetData from "./hooks/useGetData";
import { useContext } from "react";
import UserContext from "./context/userContext";
import { Heading } from "@chakra-ui/react";

const DynamicLoginModal = dynamic(
  () => import("./components/LoginModal/LoginModal"),
  {
    ssr: false,
  }
);

export default function Home() {
  const userCtx = useContext(UserContext);

  const { data } = useGetData();

  return (
    <main>
      <DynamicLoginModal></DynamicLoginModal>
      <Heading ml="3">Pokemon Apollo/GraphQL Demo</Heading>
      <Heading ml="3" as="h6" size="xs">
        Powered by PokeAPI (https://graphql-pokeapi.graphcdn.app/)
      </Heading>
      {userCtx.isLoggedIn ? <InfoList data={data} /> : <LoadingSkeleton />}
    </main>
  );
}
