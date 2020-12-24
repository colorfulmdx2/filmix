import React, {useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesPageDataTC, setIsData, setSimilarMoviesData} from "./MoviePage_Reducer";
import {AppStateType} from "../redux-store/store";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia, Divider,
    Grid,
    LinearProgress,
    Link,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {createStyles, Theme} from "@material-ui/core/styles";
import {MovieImagesArrayResponseType} from "../api/movie-api";
import {pink} from "@material-ui/core/colors";
import {addMovieToFavorite, removeMovieFromFavorite} from "../redux-store/login-reducer";


export const MoviePage = () => {

    const params = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const {images, movieData, similarMovies, isData} = useSelector<AppStateType, any>(state => state.moviePageReducer)
    const darkMode = useSelector<AppStateType, boolean>(state => state.darkThemeReducer.darkMode)
    const favoritesMoviesData = useSelector<AppStateType, any>(state => state.loginReducer.favoriteMovies)
    const user = useSelector<AppStateType, any>(state => state.loginReducer.user)

    console.log(movieData, 'dataaaaaa')

    useEffect(() => {
        dispatch(getMoviesPageDataTC(Number(params.id)))
        return () => {
            dispatch(setIsData(false))
        }
    }, [params.id])

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                width: '60%',
                margin: '20px auto 20px auto',
                [theme.breakpoints.down('sm')]: {
                    width: '90%',
                },
                [theme.breakpoints.down('md')]: {
                    width: '90%',
                },
            },
            img: {
                height: 513,
                width: 342,


            },
            card: {
                boxShadow: 'none',
                borderRadius: 0,
                width: 342,
                [theme.breakpoints.down('sm')]: {
                    margin: '0 auto',
                },
            },
            button: {
                width: '100%',
                marginTop: 10
            },
            title: {
                fontSize: 40
            },
            imageLink: {
                textAlign: "right",
                color: darkMode ? theme.palette.common.white : theme.palette.secondary.light
            },
            movieImage: {
                height: 100,
                width: 180,
                [theme.breakpoints.down('sm')]: {
                    height: 200,
                    width: 330,
                },
            },
            divider: {
                margin: theme.spacing(2, 0),
                width: '100%'
            },
            movieImageCard: {
                boxShadow: 'none',
                borderRadius: 0,
                width: 'max-content',
                margin: '0px auto'
            },
            similarImage: {
                width: '200px',
                height: '300px',
            },
            removeButton: {
                backgroundColor: pink[900],
                width: '100%',
                marginTop: 10
            }
        }),
    );

    const classes = useStyles();

    const movieImages = isData && images.backdrops.map((element: MovieImagesArrayResponseType, index: number) =>
        index <= 3 && <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <Card className={classes.movieImageCard}>
                <CardActionArea>
                    <CardMedia className={classes.movieImage}
                               image={`https://image.tmdb.org/t/p/w500/${element.file_path}`}/>
                </CardActionArea>
            </Card>
        </Grid>
    )

    const similar = isData && similarMovies.map((element: any) =>
        <Grid item>
            <NavLink to={`/movie/${element.id}`}>
                <Card style={{width: "max-content"}} className={classes.card}>
                    <CardActionArea>
                        <CardMedia className={classes.similarImage}
                                   image={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}/>
                    </CardActionArea>
                </Card>
            </NavLink>
        </Grid>
    )

    const addMovieToFavoriteHandler = (movie: any)=> {

        dispatch(addMovieToFavorite(movie))
    }

    const removeMovieFromFavoriteHandler = (movie: any)=> {

        dispatch(removeMovieFromFavorite(movie))
    }

    if (!isData) {
        return <LinearProgress style={{marginTop: 3}} color={"secondary"}/>
    }

    return (
        <>
            {
                isData && <Grid container className={classes.container}>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <Card className={classes.card}>
                            {
                                isData
                                    ? <CardMedia className={classes.img}
                                                 image={images.posters.length > 1 ? `https://image.tmdb.org/t/p/w500/${images.posters[1].file_path}` : `https://image.tmdb.org/t/p/w500/${images.posters[0].file_path}`}
                                                 title={movieData.title}/>
                                    : <PhotoCameraIcon style={{fontSize: 200}}/>
                            }
                            {
                                user !== null
                                    ? favoritesMoviesData[movieData.data.id]
                                    ? <Button className={classes.removeButton} onClick={() => { removeMovieFromFavoriteHandler(movieData.data) }} size="medium" color="primary" variant={"contained"}>
                                        Remove from Favorites
                                    </Button>
                                    : <Button className={classes.button} onClick={() => { addMovieToFavoriteHandler(movieData.data) }} size="medium" color="secondary" variant={"contained"}>
                                        Add to Favorites
                                    </Button>

                                    : <Button className={classes.button} disabled size="medium" color="secondary" variant={"contained"}>
                                        Add to Favorites
                                    </Button>
                            }
                        </Card>
                    </Grid>

                    <Grid container justify="flex-start" xs={12} sm={12} md={6} lg={8} xl={8}
                          style={{height: "max-content"}}>

                        <Grid xs={12} item><Typography
                            className={classes.title}>{movieData.data.title}</Typography></Grid>

                        <Grid item container spacing={1} style={{height: "max-content"}}>
                            <Grid item xs={6}><Typography>Images gallery</Typography></Grid>
                            <Grid item xs={6} style={{textAlign: "right"}}><Button className={classes.imageLink}>Show
                                more images</Button></Grid>

                            <Grid item container spacing={1} justify={'space-between'} alignItems={'center'}>
                                {
                                    movieImages
                                }
                            </Grid>
                            <Grid item container style={{marginTop: 10}}>
                                <Grid item container xs={12}>
                                    <Grid item xs={4}><Typography>{'Tagline:'}</Typography></Grid>
                                    <Grid item xs={8}><Typography>{movieData.data.tagline}</Typography></Grid>
                                </Grid>
                                <Divider className={classes.divider}/>

                                <Grid item container xs={12}>
                                    <Grid item xs={4}><Typography>{'Rating:'}</Typography></Grid>
                                    <Grid item xs={8}><Typography>{movieData.data.vote_average}</Typography></Grid>
                                </Grid>
                                <Divider className={classes.divider}/>

                                <Grid item container xs={12}>
                                    <Grid item xs={4}><Typography>{'Realised date'}</Typography></Grid>
                                    <Grid item xs={8}><Typography>{movieData.data.release_date}</Typography></Grid>
                                </Grid>
                                <Divider className={classes.divider}/>

                                <Grid item container xs={12}>
                                    <Grid item xs={4}><Typography>{'Genres'}</Typography></Grid>
                                    <Grid item
                                          xs={8}><Typography>{movieData.data.genres.map((element: any) => element.name).join(' ')}</Typography></Grid>
                                </Grid>
                                <Divider className={classes.divider}/>

                                <Grid item container xs={12}>
                                    <Grid item xs={4}><Typography>{'Run time'}</Typography></Grid>
                                    <Grid item
                                          xs={8}><Typography>{movieData.data.runtime + ' minutes'}</Typography></Grid>
                                </Grid>
                                <Divider className={classes.divider}/>

                                <Grid item container xs={12}>
                                    <Grid item xs={4}><Typography>{'Budget'}</Typography></Grid>
                                    <Grid item xs={8}><Typography>{movieData.data.budget + ' $'}</Typography></Grid>
                                </Grid>
                                <Divider className={classes.divider}/>

                                <Grid item>
                                    <Typography>{movieData.data.overview}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid style={{margin: '20px 0px'}} item xs={12}>
                        <Typography className={classes.title}>Similar movies</Typography>
                    </Grid>

                    <Grid style={{marginBottom: 20}} item container spacing={3} justify={'center'} xs={12}>
                        {similar}
                    </Grid>

                </Grid>
            }
        </>
    )
}