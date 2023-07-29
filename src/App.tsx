import React, {ChangeEvent, useState} from 'react';
import './App.css';
import pokedexLogo from './pokedex.png';
import {POKEMON_TYPE_COLORS} from "./const";
import {PokemonListTile} from './components';
import {gql, useQuery} from "@apollo/client";

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

function App() {
  const {data, loading, error} = useQuery(POKEMON_LIST_QUERY);
  const [searchText, setSearchText] = useState('');

  function handleSearchPokemon(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  return <>
    <div className="header"><img src={pokedexLogo} alt="pokedex logo"/></div>
    <div className="search-box">
      <input className="search-bar" placeholder="Search" value={searchText} onChange={handleSearchPokemon}/>
    </div>
    {loading && <div>Loading</div>}
    {error && <pre>{error.message}</pre>}
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
  </>;
}

function pokemonResponseParser(pokemonV2Data: any[], searchText: string): PokemonListData[] {
  if (!pokemonV2Data) return [];
  let filteredResults: PokemonListData[] = [];
  for (const pokemon of pokemonV2Data) {
    const imageUrlJson = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites);
    const imageNameSplit = imageUrlJson.other.home.front_default?.split('/')
    const imageName = imageNameSplit?.[imageNameSplit?.length - 1];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageName}`;

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
