import React from 'react'
import { Switch, Route, useLocation, withRouter} from "react-router-dom";
import {
    TransitionGroup,
    CSSTransition
  } from "react-transition-group";
import PokemonList from './components/PokemonList/PokemonList';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
      root: {
        ".fade-enter": {
            opacity: 0.01
        },
        ".fade-enter.fade-enter-active": {
            opacity: 1,
            transition: "opacity 300ms ease-in"
        },
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit.fade-exit-active": {
            opacity: 0.01,
            transition: "opacity 300ms ease-in"
        }
      },
    
  })
);

function Routes(): JSX.Element {
    let location = useLocation();
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <TransitionGroup>
                <CSSTransition 
                    classNames="fade"
                    timeout={{ enter: 300, exit: 300 }}
                    key={location.key}
                >
                    <Switch location={location}>
                        <Route path="/" exact>
                            <PokemonList></PokemonList>
                        </Route>
                        <Route path="/:pokemon" exact>
                            <PokemonDetail></PokemonDetail>
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default withRouter(Routes);