import React, { useState } from 'react'
import { Pokemon } from '../../types/pokemons';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";

function PokeInfo(pokemon: Pokemon) {
    const [elevation, setElevation] = useState(0);
    const history = useHistory();
    function handlePokemonDetail(id: number) { 
        history.push(`/${id}`);
    }
    return(
        <Card elevation={elevation} onMouseMove={e => setElevation(10)} onMouseLeave={e => setElevation(1)}>
            <CardActionArea>
                <CardMedia
                style={{width: 'auto'}}
                component="img"
                alt="PokemonInfo"
                height="100"
                image={pokemon.sprites.front_shiny}
                title={pokemon.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {pokemon.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Types: {
                        pokemon.types.map(e => `${e.type.name}`).join(', ')}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={e => handlePokemonDetail(pokemon.id)} size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

export default PokeInfo;