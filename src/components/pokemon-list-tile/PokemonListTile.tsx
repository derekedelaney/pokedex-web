import './index.css';

type PokemonListTileProps = {
  name: string;
  imageUrl: string;
  backgroundColor: string;
  types: string[];
  id: number;
};

export function PokemonListTile({name, imageUrl, backgroundColor, types, id}: PokemonListTileProps) {
  return <div style={{backgroundColor}} className="pokemonListTile" tabIndex={id}>
    <div className="pokemonNumber">#{id}</div>
    <div className="pokemonName">{name}</div>
    <div className="pokemonTypes">
      {types.map((type) => {
        return <TypeChip type={type}/>;
      })}
    </div>
    <img src={imageUrl} alt={`${name} image}`} className="pokemonListTileImg"/>
  </div>
}

function TypeChip({type}: { type: string }) {
  return <div className="typeChip">{type}</div>
}
