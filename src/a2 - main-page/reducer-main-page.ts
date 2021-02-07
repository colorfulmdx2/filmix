import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store/store";
import {MovieResponseType, moviesAPI} from "../api/movie-api";
import {setPreloader, setPreloaderType} from "../redux-store/preloader-reducer";

//types-----------------------------------------------------------------------------------------------------------------

type initialStateType = {
    sliderData: Array<MovieResponseType>
    movieData: Array<MovieResponseType>
    currentPage: number,
    totalPages: number

}

type setSliderDataType = ReturnType<typeof setSliderData>
type setLatestDataType = ReturnType<typeof setMovieData>
type setCurrentPageType = ReturnType<typeof setCurrentPage>
type setTotalPageType = ReturnType<typeof setTotalPages>
type setMoreMovieDataType = ReturnType<typeof setMoreMovieData>


type ActionsType = setSliderDataType
    | setLatestDataType
    | setCurrentPageType
    | setTotalPageType
    | setMoreMovieDataType
    | setPreloaderType


export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>


//state-----------------------------------------------------------------------------------------------------------------

let initialState: initialStateType = {
    sliderData: [],
    movieData: [],
    currentPage: 0,
    totalPages: 0

}

//reducer---------------------------------------------------------------------------------------------------------------

export const mainPageReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case 'MAIN-PAGE/SET-SLIDER-DATA': {
            return {...state, sliderData: action.payload.data}
        }
        case "MAIN-PAGE/SET-MOVIE-DATA": {
            return {...state, movieData: action.payload.data}
        }
        case "MAIN-PAGE/SET-CURRENT-PAGE": {
            return {...state, currentPage: action.payload.currentPage}
        }
        case "MAIN-PAGE/SET-TOTAL-PAGES": {
            return {...state, totalPages: action.payload.totalPages}
        }
        case "MAIN-PAGE/SET-MORE-MOVIE-DATA": {
            return {...state, movieData: [...state.movieData, ...action.payload.data]}
        }
        default:
            return state;
    }
}

//actions---------------------------------------------------------------------------------------------------------------

export const setSliderData = (data: any) => ({type: 'MAIN-PAGE/SET-SLIDER-DATA', payload: {data}} as const);
export const setMovieData = (data: any) => ({type: 'MAIN-PAGE/SET-MOVIE-DATA', payload: {data}} as const);
export const setMoreMovieData = (data: any) => ({type: 'MAIN-PAGE/SET-MORE-MOVIE-DATA', payload: {data}} as const);
export const setCurrentPage = (currentPage: number) => ({
    type: 'MAIN-PAGE/SET-CURRENT-PAGE',
    payload: {currentPage}
} as const);
export const setTotalPages = (totalPages: number) => ({
    type: 'MAIN-PAGE/SET-TOTAL-PAGES',
    payload: {totalPages}
} as const);


//thunks----------------------------------------------------------------------------------------------------------------

export const getMoviesTC = (page: number, query?: string): ThunkActionType => async (dispatch) => {

    dispatch(setPreloader(true))
    try {
        const response = await moviesAPI.getMovies(page, query)
        dispatch(page > 1 ? setMoreMovieData(response.results) : setMovieData(response.results))
        dispatch(setSliderData(response))
        dispatch(setCurrentPage(response.page))
        dispatch(setTotalPages(response.total_pages))
        dispatch(setPreloader(false))
    } catch (e) {
        console.log(e)
    }
}



