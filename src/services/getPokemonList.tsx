import { ResponsePromise } from "../types/pokemons";
import axios from "axios";
export async function getPokemonList(url: string, offset?: number, limit?: number): Promise<ResponsePromise> {
    if(offset && limit) {
        return (await axios.get(`${process.env.REACT_APP_POKEMON_API}${url}/?offset=${offset}&limit=${limit}`));
    }
    return (await axios.get(`${process.env.REACT_APP_POKEMON_API}${url}/`));
}

export async function getNewPokemons(url: string): Promise<ResponsePromise> {
    return (await axios.get(`${url}`));
}

