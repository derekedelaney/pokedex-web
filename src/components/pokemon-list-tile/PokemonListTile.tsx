import './index.css';
import {Link} from "react-router-dom";
import styled from "styled-components";

const StyledPokemonListTile = styled.div<{ color: string }>`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  border-radius: 1rem;
  padding: .5rem;
  align-items: center;
  box-shadow: 0 .25rem .5rem 0 rgba(0, 0, 0, 0.2), 0 .375rem 1.25rem 0 rgba(0, 0, 0, 0.19);
  background-color: ${props => props.color};
  height: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 720px) {
    grid-template-columns: .5fr 2fr 1.5fr 1fr;
    grid-template-rows: none;
    grid-gap: .25rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border-radius: 1rem;

  &:focus, &:focus-visible {
    outline: .5rem solid #0065a5;
  }

  @media screen and (max-width: 720px) {
    &:focus, &:focus-visible {
      outline: .25rem solid #0065a5;
    }
  }
`;

type PokemonListTileProps = {
  name: string;
  imageUrl: string;
  backgroundColor: string;
  types: string[];
  id: number;
};

export function PokemonListTile({name, imageUrl, backgroundColor, types, id}: PokemonListTileProps) {
  return <StyledLink to={`pokemon/${id}`} tabIndex={id}>
    <StyledPokemonListTile color={backgroundColor}>
      <code className="pokemon-number"><span style={{fontSize: '2rem'}}>#</span>{id}</code>
      <div className="pokemon-name">{name}</div>
      <div className="pokemon-types">
        {types.map((type) => {
          return <TypeChip type={type}/>;
        })}
      </div>
      <img src={imageUrl} alt={`${name} image}`} className="pokemon-list-tile-img"/>
    </StyledPokemonListTile>
  </StyledLink>
}

function TypeChip({type}: { type: string }) {
  return <div className="type-chip">{type}</div>
}
