
export type PokemonListType = {
    name: string;
    url: string;
};
export type PokemonListResponse =  {
    count: number;
    next: string;
    previous: string;
    results: Array<PokemonListType>;
};

export type ResponsePromise = {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request: any;
};

export type State = {
    isLoading: boolean;
    pokemons?: PokemonListResponse;
    error?: string;
    offset?: number;
    limit?: number;
    pokemonDetails: any;
};

export type StateDetails = {
    isLoading: boolean;
    pokemonDetails?: any;
};

export type Action =  | { type: 'request' }
| { type: 'success', results: PokemonListResponse }
| { type: 'detail-success', detail: Pokemon }
| { type: 'next-pagination', offset: number }
| { type: 'previous-pagination', offset: number }
| { type: 'failure', error: string };

export type Pagination = {
    count: number; 
    page: number;
    rowsPerPage: number;
    onChangePage(event: any, newPage: number): void;
}

export type Pokemon = {
    abilities: Array<any>;
    forms: Array<any>;
    game_indices: Array<any>;
    height: number;
    held_items: Array<any>;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Array<any>;
    species: any;
    name: string;
    order: number;
    sprites: any;
    stats: Array<any>;
    types: Array<any>;
    weight: number;
}
