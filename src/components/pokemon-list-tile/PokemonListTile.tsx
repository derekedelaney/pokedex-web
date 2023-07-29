import './index.css';

type PokemonListTileProps = {
  name: string;
  imageUrl: string;
  backgroundColor: string;
  types: string[];
  id: number;
};

export function PokemonListTile({name, imageUrl, backgroundColor, types, id}: PokemonListTileProps) {
  return <div style={{backgroundColor}} className="pokemon-list-tile" tabIndex={id}>
    <div className="pokemon-number">#{id}</div>
    <div className="pokemon-name">{name}</div>
    <div className="pokemon-types">
      {types.map((type) => {
        return <TypeChip type={type}/>;
      })}
    </div>
    <img src={imageUrl} alt={`${name} image}`} className="pokemon-list-tile-img"/>
  </div>
}

function TypeChip({type}: { type: string }) {
  return <div className="type-chip">{type}</div>
}
