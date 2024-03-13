import { Pokemon } from "@/app/constants/types";
import InfoCard from "../InfoCard/InfoCard";
import { SimpleGrid } from "@chakra-ui/react";
import PokemonModal from "../PokemonModal/PokemonModal";
import { useState } from "react";

export default function InfoList({ data }: { data: any }) {
  const [pokemonId, setPokemonId] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const pokemons = data ? data["pokemons"]["results"] : [];

  const handleOpenModal = (id: number) => {
    setPokemonId(id);
    setOpenModal(true);
  };

  const handleCloseModal = (id: number) => {
    setOpenModal(false);
  };

  return (
    <>
      <PokemonModal
        isOpenModal={openModal}
        handleCloseModal={handleCloseModal}
        pokemonId={pokemonId}
        pokemons={pokemons}
      />
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {pokemons.length > 0 &&
          pokemons.map((item: Pokemon) => (
            <InfoCard
              openModal={handleOpenModal}
              key={item.name}
              title={item.name}
              image={item.image}
              id={item.id}
            ></InfoCard>
          ))}
      </SimpleGrid>
    </>
  );
}
