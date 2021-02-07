import React from "react";
import {useDispatch, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/styles/createStyles/createStyles";
import purple from "@material-ui/core/colors/purple";
import {grey, lightBlue, pink} from "@material-ui/core/colors";
import Card from "@material-ui/core/Card/Card";
import {NavLink} from "react-router-dom";
import {CardActionArea} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {AppStateType} from "../../redux-store/store";
import {addMovieToFavorite, removeMovieFromFavorite} from "../../redux-store/login-reducer";

type PropsType = {
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
    id: number
    movie?: any
}

export const MovieElement = (props: PropsType) => {

    const darkMode = useSelector<AppStateType, boolean>(state => state.darkThemeReducer.darkMode)
    const favoritesMoviesData = useSelector<AppStateType, any>(state => state.loginReducer.favoriteMovies)
    const user = useSelector<AppStateType, any>(state => state.loginReducer.user)
    const isVerifying = useSelector<AppStateType, boolean>(state => state.loginReducer.isVerifying)

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                maxWidth: 350,
                overflow: 'visible'
            },
            buttons: {
                justifyContent: 'space-around'
            },
            title: {
                maxHeight: '35px',
                minHeight: '35px',
                textAlign: 'center',
                overflow: 'hidden'
            },
            overview: {
                maxHeight: '100px',
                minHeight: '100px',
                color: darkMode ? grey[400] : theme.palette.common.black
            },
            vote: {
                backgroundColor: darkMode ? purple[900] : lightBlue[800],
                width: 40,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                position: 'absolute',
                top: 20,
                left: -5,
                borderRadius: 3
            },
            removeButton: {
               backgroundColor: pink[900],

            }

        }),
    );

    const classes = useStyles();
    const dispatch = useDispatch();

    const addMovieToFavoriteHandler = (movie: any)=> {

        dispatch(addMovieToFavorite(movie))
    }

    const removeMovieFromFavoriteHandler = (movie: any)=> {

        dispatch(removeMovieFromFavorite(movie))
    }


    return (
        <Card
            className={classes.root}
        >
            <NavLink to={`/movie/${props.id}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="430"
                        width="250"
                        image={`${props.poster_path ? `https://image.tmdb.org/t/p/w500/${props.poster_path}` : 'noPoster'}`}
                        title={props.title}

                    />
                    <div className={classes.vote}>{props.vote_average} </div>
                </CardActionArea>
            </NavLink>

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>

                    {props.title.length > 25 ? `${props.title.slice(0, 20) + '...'}` : props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.overview}>
                    {props.overview.length > 200 ? `${props.overview.slice(0, 200) + '...'}` : props.overview}
                </Typography>
            </CardContent>

            <CardActions className={classes.buttons}>
                {
                    user !== null
                        ? favoritesMoviesData[props.id]
                            ? <Button className={classes.removeButton} onClick={() => { removeMovieFromFavoriteHandler(props.movie) }} size="medium" color="primary" variant={"contained"}>
                                Remove from Favorites
                            </Button>
                            : <Button onClick={() => { addMovieToFavoriteHandler(props.movie) }} size="medium" color="secondary" variant={"contained"}>
                                Add to Favorites
                            </Button>

                        : <Button disabled size="medium" color="secondary" variant={"contained"}>
                            Add to Favorites no login
                        </Button>
                }
            </CardActions>


        </Card>
    );
};