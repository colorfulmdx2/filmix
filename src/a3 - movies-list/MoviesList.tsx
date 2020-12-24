import React, {useEffect} from "react";
import {getMoviesTC} from "../a2 - main-page/reducer-main-page";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux-store/store";
import {MovieResponseType} from "../api/movie-api";
import {MovieElement} from "../common-components/movie- element/MovieElement";
import {Grid, LinearProgress} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import {getFavoritesMovies} from "../redux-store/login-reducer";

type MovieListType = {
    query: string
}

export const MoviesList = (props: MovieListType) => {

    const dispatch = useDispatch()

    const moviesData = useSelector<AppStateType, Array<MovieResponseType>>(state => state.mainPageReducer.movieData)
    const favoritesMoviesData = useSelector<AppStateType, any>(state => state.loginReducer.favoriteMovies)
    const currentPage = useSelector<AppStateType, number>(state => state.mainPageReducer.currentPage)
    const preloader = useSelector<AppStateType, boolean>(state => state.preloaderReducer.preloader)

    useEffect(() => {
        if (props.query === 'favorites') {
            dispatch(getFavoritesMovies())
        } else {
            dispatch(getMoviesTC(1, props.query))
        }

    }, [])

    const movies = moviesData && moviesData.map(e => <Grid style={{minWidth: 360, paddingBottom: 10}} item>
        <MovieElement title={e.title}
                      overview={e.overview}
                      poster_path={e.poster_path}
                      release_date={e.release_date}
                      vote_average={e.vote_average}
                      id={e.id}
                      key={e.id}
                      movie={e}/>
    </Grid>)

    const favorites = Object.keys(favoritesMoviesData).length && Object.keys(favoritesMoviesData).sort((a, b) =>
        favoritesMoviesData[a]['atTime'] - favoritesMoviesData[b]['atTime'])
        .map((key) => {
            return <Grid style={{minWidth: 360, paddingBottom: 10}} item>
                <MovieElement title={favoritesMoviesData[key].title}
                              overview={favoritesMoviesData[key].overview}
                              poster_path={favoritesMoviesData[key].poster_path}
                              release_date={favoritesMoviesData[key].release_date}
                              vote_average={favoritesMoviesData[key].vote_average}
                              id={favoritesMoviesData[key].id}
                              key={favoritesMoviesData[key].id}
                              movie={favoritesMoviesData[key]}/>
            </Grid>
        })


    const getNewPage = () => {
        dispatch(getMoviesTC(currentPage + 1, props.query))
    }

    const objIsEmpty = (obj: any) => {
        return Object.entries(obj).length === 0 && obj.constructor === Object

    }

    /*if (preloader) {
        return <LinearProgress style={{marginTop: 2}} color="secondary"/>
    }*/

    return (

        <InfiniteScroll dataLength={moviesData.length}
                        next={getNewPage}
                        hasMore={true}
                        loader={''}
                        scrollThreshold={0.95}
                        style={{width: '100%', margin: '0 auto'}}
        >
            <Grid container justify="space-around" style={{width: '100%', marginTop: 10}}>
                {
                    (props.query === 'favorites')
                        ? objIsEmpty(favoritesMoviesData) ? 'Here is no favorites movies yet' : favorites
                        : movies
                }
            </Grid>
        </InfiniteScroll>
    )
}