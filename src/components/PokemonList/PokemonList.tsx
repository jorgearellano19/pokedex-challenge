import React, {useEffect, useReducer, Fragment} from 'react'
import { Grid, Typography, Paper, CardActions, CircularProgress, Button } from "@material-ui/core";
import { PokemonListResponse, State, Action, PokemonListType, Pokemon } from '../../types/pokemons';
import { getPokemonList, getNewPokemons } from "../../services/getPokemonList";
import { getPokemonDetail, getPokemon } from '../../services/getPokemonDetail';
import PokeInfo from './_PokeInfo';

function reducer(state: State, action: Action): State {
    switch(action.type) {
        case 'request':
            return {
                ...state,
                isLoading: true
            };
        case 'success':
            return {
                ...state,
                isLoading: false,
                pokemons: action.results
            }
        case 'detail-success':
            return {
                ...state,
                pokemonDetails: [
                    ...state.pokemonDetails,
                    action.detail
                ]
            }
        case 'next-pagination':
            return {
                ...state,
                pokemonDetails: [],
                offset: action.offset
            }
        case 'previous-pagination':
                return {
                    ...state,
                    pokemonDetails: [],
                    offset: action.offset
                }
        default: 
            return state;
        
    }
}



const PokemonList: React.FC = () => {

    const initialState: State = {
        isLoading: true,
        pokemonDetails: [],
        offset: 0,
        limit: 20
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(url: string = 'pokemon', offset? : number, limit? : number) {
        dispatch({type: 'request'});
        let response;
        if (offset && limit) {
            response = await getPokemonList(url, offset, limit);
        }
        else {
            response = await getPokemonList(url);
        }
        if(response.status === 200) {
            dispatch({type:'success', results: response.data});
        }
        response.data.results.map(async (pokemon: PokemonListType) => {
            const detailPokemon = await getPokemon(pokemon.url);
            dispatch({type:'detail-success', detail: detailPokemon.data});
        })
        
    }

    async function handleNext(e: any) {
        e.preventDefault();
        const newOffset = state.offset! + 20;
        dispatch({type: 'next-pagination', offset: newOffset})
        fetchData('pokemon', newOffset, 20);
    }

    async function handlePrevious(e: any) {
        e.preventDefault();
        const newOffset = state.offset! - 20;
        dispatch({type: 'next-pagination', offset: newOffset})
        fetchData('pokemon', newOffset, 20);
    }

    return(
        <Grid container direction="column" justify="center" alignContent="center">
            <Grid item xs={12}>
                <Typography variant={'h2'}>Pokemon List</Typography>
            </Grid>
            {
            state.isLoading? 
            <CircularProgress /> :
            <Fragment>
            <Grid item container xs={12}>
                {
                state.pokemonDetails.map((pokemon: Pokemon, index: number) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <PokeInfo {...pokemon} ></PokeInfo>
                    </Grid>
                ))
                }
            </Grid>
            <Grid container justify="flex-end">
                <Button onClick={handlePrevious} disabled={state.offset === 0}>Back</Button>
                <Button disabled={(state.offset! + state.limit!) === state.pokemons?.count} onClick={handleNext}>Next</Button>
            </Grid> 
            </Fragment>
            }
        </Grid>
    )
};

export default PokemonList;