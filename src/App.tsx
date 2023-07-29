import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {POKEMON_TYPE_COLORS} from "./const";
import {PokemonListTile} from './components';
import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";

interface PokemonListData {
  name: string;
  id: number;
  imageUrl: string;
  types: string[];
}

const getColorByPokemonType = (type: string) =>
  POKEMON_TYPE_COLORS[type.toLowerCase()];

const POKEMON_LIST_QUERY = gql`{
    pokemon_v2_pokemon {
        name
        id
        pokemon_v2_pokemonsprites {
            sprites
        }
        pokemon_v2_pokemontypes {
            pokemon_v2_type {
                name
            }
        }
    }
}
`;

const CircularProgressIndicator = styled.div`
  @property --progress-value {
    syntax: "<integer>";
    initial-value: 0;
    inherits: false;
  }

  @keyframes progress {
   to { --progress-value: 100; }
  }

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 25vh auto 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background:
    radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(#0065a5 calc(var(--progress-value) * 1%), #0065a588 0);
  animation: progress 1s 1 forwards;

  .&::before {
    counter-reset: percentage var(--progress-value);
    content: counter(percentage) '%';
    animation: progress 1s 1 forwards;
  }
`;

function App() {
  const {data, loading, error} = useQuery(POKEMON_LIST_QUERY);
  const [searchText, setSearchText] = useState('');

  function handleSearchPokemon(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  return <>
    <div className="search-box">
      <input className="search-bar"
             placeholder="Search"
             value={searchText}
             onChange={handleSearchPokemon}
      />
    </div>
    {loading && <div><CircularProgressIndicator/></div>}
    {error && <pre>{error.message}</pre>}
    <div className="pokemon-container">
      {(!loading || !error) &&
        pokemonResponseParser(data?.pokemon_v2_pokemon, searchText)
          .map(({
                  name,
                  id,
                  imageUrl,
                  types,
                }: any) => {
            return <PokemonListTile name={name} key={id} id={id}
                                    imageUrl={imageUrl}
                                    types={types}
                                    backgroundColor={getColorByPokemonType(types[0])}
            />
          })}
    </div>
  </>;
}

function pokemonResponseParser(pokemonV2Data: any[], searchText: string): PokemonListData[] {
  if (!pokemonV2Data) return [];
  let filteredResults: PokemonListData[] = [];
  for (const pokemon of pokemonV2Data) {
    const imageUrlJson = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites);
    const imageNameSplit = imageUrlJson.other.home.front_default?.split('/')
    const imageName = imageNameSplit?.[imageNameSplit?.length - 1];
    const imageUrl = imageName
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageName}`
      : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

    const types = pokemon.pokemon_v2_pokemontypes.map((type: any) => {
      return type.pokemon_v2_type.name;
    });

    if (searchText) {
      const typesMatcher = types.some((type: string) => type.toLowerCase().startsWith(searchText.toLowerCase()))
      const nameMatcher = pokemon.name.toLowerCase().startsWith(searchText.toLowerCase());
      const idMatcher = pokemon.id.toString().startsWith(searchText.toLowerCase());
      if (typesMatcher || nameMatcher || idMatcher) {
        filteredResults.push({
          id: pokemon.id,
          name: pokemon.name,
          imageUrl,
          types,
        });
      }
    } else {
      filteredResults.push({
        id: pokemon.id,
        name: pokemon.name,
        imageUrl,
        types,
      });
    }
  }
  return filteredResults;
}

export default App;
