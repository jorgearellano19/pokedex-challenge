import * as React from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { Pokemon, StateDetails, Action } from '../../types/pokemons';
import { Grid, Typography, CircularProgress, TableContainer,Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import { getPokemonDetail } from '../../services/getPokemonDetail';

function reducer(state: StateDetails, action: Action): StateDetails {
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
                pokemonDetails: action.results
            }
        default: 
            return state;
        
    }
}
function PokemonDetail() {
    const params: any = useParams();
    const id = params.pokemon;
    let history = useHistory();
    const initialState: StateDetails = {
        isLoading: true
    };

    const [state, dispatch] = React.useReducer(reducer, initialState);


    React.useEffect(() => {
        fetchData(id);
    }, []);

    async function fetchData(id: number) {
        dispatch({type: 'request'});
        const response = await getPokemonDetail(id);
        if(response.status === 200) {
            dispatch({type:'success', results: response.data});
        }      
    }

    function goBack() {
        history.push('/');
    }

    return(
            state.isLoading ? 
            <CircularProgress/> :
            <Grid container justify="center" direction="column">
                <Grid item>
                    <Typography gutterBottom variant="h5" component="h2">
                        {state.pokemonDetails.name}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <img
                    alt="pokemon"
                    src={state.pokemonDetails.sprites.front_shiny}
                    />
                </Grid>
            <Grid>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Abilities: {
                        state.pokemonDetails.abilities.map((e: any) => `${e.ability.name}`).join(', ')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       Height: {state.pokemonDetails.height}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Weight: {state.pokemonDetails.weight}
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Stat</TableCell>
                                    <TableCell>Base Stat</TableCell>
                                    <TableCell>Effort</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.pokemonDetails.stats.map((stat: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{stat.stat.name}</TableCell>
                                        <TableCell>{stat.base_stat}</TableCell>
                                        <TableCell>{stat.effort}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Grid>
            <Grid container direction="row-reverse">
                <Button color="primary" onClick={goBack} variant="contained">Back to list</Button>
            </Grid>
        </Grid>
    )
}

export default PokemonDetail;