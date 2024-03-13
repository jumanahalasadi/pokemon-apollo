"use client";
import { useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import UserContext from "@/app/context/userContext";
import { Pokemon } from "@/app/constants/types";

export default function PokemonModal({
  pokemonId,
  isOpenModal,
  handleCloseModal,
  pokemons,
}: {
  pokemonId: number;
  isOpenModal: boolean;
  handleCloseModal: any;
  pokemons: Array<Pokemon>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure({});

  const pokemonById = pokemons.find((p: Pokemon) => {
    return p.id == pokemonId;
  });

  useEffect(() => {
    if (isOpenModal) onOpen();
    else onClose();
  }, [isOpenModal]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleCloseModal();
        }}
      >
        <ModalOverlay />
        <ModalContent
          width={{ md: "75%", base: "75%" }}
          height={{ md: "500px", base: "500px" }}
        >
          <ModalHeader>{pokemonById?.name.toUpperCase()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            POKEDEX #: {pokemonById?.id}
            <Image
              src={pokemonById?.artwork}
              alt={`Artwork of of ${pokemonById?.name}`}
              borderRadius="lg"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
