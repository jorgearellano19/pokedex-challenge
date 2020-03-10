import axios from "axios";

export async function getPokemon(url: string) : Promise<any> {
    return (await axios.get(`${url}`));
}

export async function getPokemonDetail(id: number) : Promise<any> {
    return (await axios.get(`${process.env.REACT_APP_POKEMON_API}pokemon/${id}/`));
}