import { useLoaderData } from 'react-router-dom';
import { IPokemon } from '../../models';
import styled from 'styled-components';
import { POKEMON_TYPE_COLORS } from '../../const';

const StyledPokemonDetail = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  font-size: 2rem;
  padding: 2rem;
  height: 100vh;
`;

const TopDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const FavoriteButton = styled.button`
  all: unset;
  cursor: pointer;
  height: 1.5rem;
`;

const PokemonImage = styled.img`
  margin: 0 auto;
  display: block;
  width: 20rem;
`;

const Name = styled.div`
  text-transform: capitalize;
  text-align: center;
`;

const TypeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Type = styled.div`
  background-color: rgba(0, 0, 0, 0.18);
  padding: 0.25rem 1.25rem;
  margin: 0.5rem;
  text-align: center;
  border-radius: 2rem;
  font-size: 1rem;
  text-transform: capitalize;
`;

const Card = styled.div`
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2),
    0 0.375rem 1.25rem 0 rgba(0, 0, 0, 0.19);
  background-color: #ffffff;
  margin: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  color: #111;
`;

const CardTable = styled.div<{ columns: number; fillLastRow?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns - 1}, auto) ${(
      props
    ) => (props.fillLastRow ? '1fr' : 'auto')};
  grid-row-gap: 1rem;
  grid-column-gap: 2rem;
  align-items: center;
`;

const TableHeader = styled.div`
  margin: 0;
  font-size: 2rem;
  justify-self: end;
`;

const TableLabel = styled.div`
  color: #666;
  text-transform: capitalize;
  font-size: 1.5rem;
  justify-self: end;
`;

const TableValue = styled.div`
  font-size: 1rem;
`;

const TableBarFill = styled.div<{ width: number }>`
  height: 0.5rem;
  border-radius: 1rem;
  background-color: #e3e3e3;

  &:after {
    content: '';
    display: block;
    background: orange;
    width: ${(props) => props.width}%;
    height: 100%;
    border-radius: 1rem;
  }
`;

const GridColumnSpacer = styled.div<{ start: number; end: number }>`
  grid-column-start: ${(props) => props.start};
  grid-column-end: ${(props) => props.end};
`;

const getColorByPokemonType = (type: string) =>
  POKEMON_TYPE_COLORS[type.toLowerCase()];

export function PokemonDetail() {
  const data = useLoaderData() as IPokemon;
  const maxStatsBase = Math.max(...data.stats.map((s) => s.base_stat), 100);

  return (
    <StyledPokemonDetail color={getColorByPokemonType(data.types[0].type.name)}>
      <TopDetails>
        <FavoriteButton>
          <span className="material-symbols-outlined">favorite</span>
        </FavoriteButton>
        <div>#{data.id}</div>
      </TopDetails>
      <PokemonImage
        src={data.sprites.other['official-artwork'].front_default}
      />
      <Name>{data.name}</Name>
      <TypeBox>
        {data.types.map((type) => (
          <Type key={type.type.name}>{type.type.name}</Type>
        ))}
      </TypeBox>
      <Card>
        <CardTable columns={2}>
          <TableHeader>Info</TableHeader>
          <div />
          <TableLabel>Height</TableLabel>
          <TableValue>{data.height}</TableValue>
          <TableLabel>Weight</TableLabel>
          <TableValue>{data.weight}</TableValue>
          <div></div>
        </CardTable>
      </Card>
      <Card>
        <CardTable columns={3} fillLastRow={true}>
          <TableHeader>Status</TableHeader>
          <GridColumnSpacer start={2} end={4} />
          {data.stats.map((stat) => [
            <TableLabel>{stat.stat.name}</TableLabel>,
            <TableValue> {stat.base_stat}</TableValue>,
            <TableBarFill width={(stat.base_stat / maxStatsBase) * 100} />,
          ])}
        </CardTable>
      </Card>
    </StyledPokemonDetail>
  );
}
