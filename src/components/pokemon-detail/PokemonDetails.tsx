import {useLoaderData} from "react-router-dom";
import {IPokemon} from "../../models";
import styled from "styled-components";
import {POKEMON_TYPE_COLORS} from '../../const';

const StyledPokemonDetail = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  color: white;
  font-size: 2rem;
  padding: 2rem;
  height: 100vh;
`;

const PokemonImage = styled.img`
  margin: 0 auto;
  display:block;
`;

const Name = styled.div`
  text-transform: capitalize;
`;

const TypeBox = styled.div`
  display: flex;
  align-items: center;
`;

const Type = styled.div`
  padding: .75rem;
  margin: .5rem;
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 2rem;
  text-align: center;
  text-transform: capitalize;
  font-size: 1.5rem;
`;

const getColorByPokemonType = (type: string) =>
  POKEMON_TYPE_COLORS[type.toLowerCase()];

export function PokemonDetail() {
  const data = useLoaderData() as IPokemon;

  return <StyledPokemonDetail color={getColorByPokemonType(data.types[0].type.name)}>
    <PokemonImage src={data.sprites.other["official-artwork"].front_default}/>
    <div>#{data.id}</div>
    <Name>Name: {data.name}</Name>
    <TypeBox>Type: {data.types.map((type) => <Type>{type.type.name}</Type>)}</TypeBox>
    <div>Stats: {data.stats.map((stat) => <div>{stat.stat.name}: {stat.base_stat}</div>)}</div>
  </StyledPokemonDetail>
}
