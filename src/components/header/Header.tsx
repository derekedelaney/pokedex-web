import pokedexLogo from '../../pokedex.png';
import styled from "styled-components";

const StyledHeader = styled.div`
  height: 8rem;
  background-color: #f93a3a;
  text-align: center;
  padding: 1rem;

  & > img {
    height: 8rem;
  }

  @media screen and (max-width: 720px) {
    height: 4rem;
  
    & > img {
      height: 4rem;
    }
  }
`;

export function Header() {
  return <StyledHeader><img src={pokedexLogo} alt="pokedex logo"/></StyledHeader>;
}