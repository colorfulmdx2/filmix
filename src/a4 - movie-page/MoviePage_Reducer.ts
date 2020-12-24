import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store/store";
import {MovieImagesResponseType, MovieResponseType, moviesAPI} from "../api/movie-api";
import {setPreloader, setPreloaderType} from "../redux-store/preloader-reducer";

//types-----------------------------------------------------------------------------------------------------------------

type initialStateType = {
    movieData: any
    images: MovieImagesResponseType
    similarMovies: Array<MovieResponseType>
    isData: boolean
}

type setMovieDataType = ReturnType<typeof setMovieData>
type setMovieImageDataType = ReturnType<typeof setMovieImageData>
type setSimilarMoviesDataType = ReturnType<typeof setSimilarMoviesData>
type setIsDataType = ReturnType<typeof setIsData>


type ActionsType = setMovieDataType | setMovieImageDataType | setSimilarMoviesDataType | setPreloaderType | setIsDataType


export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>


//state-----------------------------------------------------------------------------------------------------------------

let initialState: initialStateType = {
    movieData: [],
    images: {} as MovieImagesResponseType,
    similarMovies: [],
    isData: false
}

//reducer---------------------------------------------------------------------------------------------------------------

export const moviePageReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case "MOVIE-PAGE/SET-MOVIE-DATA": {
            return {...state, movieData: action.payload.data}
        }
        case "MOVIE-PAGE/SET-MOVIE-IMAGES-DATA": {
            return {...state, images: action.payload.data}
        }
        case "MOVIE-PAGE/SET-SIMILAR-MOVIES-DATA": {
            return {...state, similarMovies: action.payload.data}
        }
        case "MOVIE-PAGE/SET-IS-DATA": {
            return {...state, isData: action.payload.data}
        }
        default:
            return state;
    }
}

//actions---------------------------------------------------------------------------------------------------------------

export const setMovieData = (data: any) => ({type: 'MOVIE-PAGE/SET-MOVIE-DATA', payload: {data}} as const);
export const setIsData = (data: boolean) => ({type: 'MOVIE-PAGE/SET-IS-DATA', payload: {data}} as const);
export const setMovieImageData = (data: any) => ({type: 'MOVIE-PAGE/SET-MOVIE-IMAGES-DATA', payload: {data}} as const);
export const setSimilarMoviesData = (data: any) => ({
    type: 'MOVIE-PAGE/SET-SIMILAR-MOVIES-DATA',
    payload: {data}
} as const);


//thunks----------------------------------------------------------------------------------------------------------------

export const getMoviesPageDataTC = (movie_id: number): ThunkActionType => async (dispatch) => {

    try {
        dispatch(setPreloader(true))
        await dispatch(getMovieDataTC(movie_id))
        await dispatch(getMovieImageDataTC(movie_id))
        await dispatch(getSimilarMoviesDataTC(movie_id))
        await dispatch(setIsData(true))
        dispatch(setPreloader(false))
    } catch (e) {
        console.log(e)
    } finally {

    }
}

export const getMovieDataTC = (movie_id: number): ThunkActionType => async (dispatch) => {
    try {
        const response = await moviesAPI.getMovie(movie_id)
        dispatch(setMovieData(response))
    } catch (e) {
        console.log(e)
    }
}

export const getMovieImageDataTC = (movie_id: number): ThunkActionType => async (dispatch) => {
    try {
        const response = await moviesAPI.getMovieImages(movie_id)
        dispatch(setMovieImageData(response))
    } catch (e) {
        console.log(e)
    }
}

export const getSimilarMoviesDataTC = (movie_id: number): ThunkActionType => async (dispatch) => {
    try {
        const response = await moviesAPI.getSimilarMovies(movie_id)
        dispatch(setSimilarMoviesData(response.results))
    } catch (e) {
        console.log(e)
    }
}



