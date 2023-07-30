import {Link} from "react-router-dom";
import styled from "styled-components";

const StyledPokemonListTile = styled.div<{ color: string }>`
  display: flex;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 .25rem .5rem 0 rgba(0, 0, 0, 0.2), 0 .375rem 1.25rem 0 rgba(0, 0, 0, 0.19);
  background-color: ${props => props.color};
  height: 100%;
  box-sizing: border-box;
  color: white;
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border-radius: 1rem;

  &:focus, &:focus-visible {
    outline: .25rem solid #0065a5;
  }
`;

const FavoriteButton = styled.button`
  all: unset;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledNumber = styled.div`
  font-size: 1.5rem;
`;

const StyledName = styled.div`
  font-size: 2rem;
  text-transform: capitalize;
`;

const StyledTypes = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
`;

const TypeChip = styled.div`
  background-color: rgba(0, 0, 0, 0.18);
  padding: .25rem 1.25rem;
  margin-right: .5rem;
  text-align: center;
  border-radius: 2rem;
  font-size: 1rem;
  text-transform: capitalize;
`;

const PokemonImage = styled.img`
  width: 8rem;
  height: 8rem;
  margin-right: 1rem;
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
      <InfoGroup>
        <FavoriteButton>
          <span className="material-symbols-outlined">
            favorite
          </span>
        </FavoriteButton>
        <StyledNumber>#{id}</StyledNumber>
        <StyledName>{name}</StyledName>
        <StyledTypes>
          {types.map((type) => {
            return <TypeChip>{type}</TypeChip>;
          })}
        </StyledTypes>
      </InfoGroup>
      <PokemonImage src={imageUrl} alt={`${name} image}`}/>
    </StyledPokemonListTile>
  </StyledLink>
}
