export interface IPokemon {
  abilities: IPokemonAbility[];
  base_experience: number;
  forms: Array<INamedApiResource>;
  game_indices: IVersionGameIndex[];
  height: number;
  held_items: IPokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IPokemonMove[];
  name: string;
  order: number;
  species: INamedApiResource;
  sprites: IPokemonSprites;
  stats: IPokemonStat[];
  types: IPokemonType[];
  weight: number;
}

export interface INamedApiResource {
  name: string;
  url: string;
}

export interface IPokemonAbility {
  ability: INamedApiResource;
  slot: number;
}

export interface IVersionGameIndex {
  game_index: number;
  version: INamedApiResource;
}

export interface IPokemonHeldItem {
  item: INamedApiResource;
  version_details: IPokemonHeldItemVersion[];
}

export interface IPokemonHeldItemVersion {
  version: INamedApiResource;
  rarity: number;
}

export interface IPokemonMove {
  move: INamedApiResource;
  version_group_details: IPokemonMoveVersion[];
}

export interface IPokemonMoveVersion {
  level_learned_at: number;
  move_learn_method: INamedApiResource;
  version_group: INamedApiResource;
}


export interface IPokemonStat {
  stat: INamedApiResource;
  effort: number;
  base_stat: number;
}

export interface IPokemonSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: IPokemonSpriteOther;
  versions: IPokemonSpriteVersion;
}

interface ISpriteVariant {
  back_default: string | null;
  back_female: string | null;
  back_gray: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_gray: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface IPokemonSpriteOther {
  dream_world: Pick<ISpriteVariant, "front_default" | "front_female">;
  home: {
    front_default: string;
    front_shiny: string;
  };
  "official-artwork": {
    front_default: string;
    front_shiny: string;
  };
}

interface IGeneration1Sprite {
  "red-blue": Pick<ISpriteVariant, "back_default" | "back_gray" | "front_default" | "front_gray">;
  yellow: Pick<ISpriteVariant, "back_default" | "back_gray" | "front_default" | "front_gray">;
}

interface IGeneration2Sprite {
  crystal: Pick<ISpriteVariant, "back_default" | "back_shiny" | "front_default" | "front_shiny">;
  gold: Pick<ISpriteVariant, "back_default" | "back_shiny" | "front_default" | "front_shiny">;
  silver: Pick<ISpriteVariant, "back_default" | "back_shiny" | "front_default" | "front_shiny">;
}

interface IGeneration3Sprite {
  emerald: Pick<ISpriteVariant, "front_default" | "front_shiny">;
  "firered-leafgreen": Pick<ISpriteVariant, "back_default" | "back_shiny" | "front_default" | "front_shiny">;
  "ruby-sapphire": Pick<ISpriteVariant, "back_default" | "back_shiny" | "front_default" | "front_shiny">;
}

interface IGeneration4Sprite {
  "diamond-pearl": Pick<
    ISpriteVariant,
    "back_default" |
    "back_female" |
    "back_shiny" |
    "back_shiny_female" |
    "front_default" |
    "front_female" |
    "front_shiny" |
    "front_shiny_female"
  >;
  "heartgold-soulsilver": Pick<
    ISpriteVariant,
    "back_default" |
    "back_female" |
    "back_shiny" |
    "back_shiny_female" |
    "front_default" |
    "front_female" |
    "front_shiny" |
    "front_shiny_female"
  >;
  platinum: Pick<
    ISpriteVariant,
    "back_default" |
    "back_female" |
    "back_shiny" |
    "back_shiny_female" |
    "front_default" |
    "front_female" |
    "front_shiny" |
    "front_shiny_female"
  >;
}

type IBlackWhiteSprite = Pick<
  ISpriteVariant,
  "back_default" |
  "back_female" |
  "back_shiny" |
  "back_shiny_female" |
  "front_default" |
  "front_female" |
  "front_shiny" |
  "front_shiny_female"
>;

interface IGeneration5Sprite {
  "black-white": IBlackWhiteSprite & { animated: IBlackWhiteSprite };
}

interface IGeneration6Sprite {
  "omegaruby-alphasapphire": Pick<
    ISpriteVariant,
    "front_default" |
    "front_female" |
    "front_shiny" |
    "front_shiny_female"
  >;
  "x-y": Pick<
    ISpriteVariant,
    "front_default" |
    "front_female" |
    "front_shiny" |
    "front_shiny_female"
  >;
}

interface IGeneration7Sprite {
  icons: Pick<ISpriteVariant, "front_default" | "front_female">;
  "ultra-sun-ultra-moon": Pick<
    ISpriteVariant,
    "front_default" |
    "front_female" |
    "front_shiny" |
    "front_shiny_female"
  >;
}

interface IGeneration8Sprite {
  icons: Pick<ISpriteVariant, "front_default" | "front_female">;
}

interface IPokemonSpriteVersion {
  "generation-i": IGeneration1Sprite;
  "generation-ii": IGeneration2Sprite;
  "generation-iii": IGeneration3Sprite;
  "generation-iv": IGeneration4Sprite;
  "generation-v": IGeneration5Sprite;
  "generation-vi": IGeneration6Sprite;
  "generation-vii": IGeneration7Sprite;
  "generation-viii": IGeneration8Sprite;
}

export interface IPokemonType {
  slot: number;
  type: INamedApiResource;
}
