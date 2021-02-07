import {moviesAPI} from "../../../api/movie-api";
import {AppStateType} from "../../../redux-store/store";
import {ThunkAction} from "redux-thunk";

//types-----------------------------------------------------------------------------------------------------------------

type initialStateType = {
    search: Array<SearchResultsElementType>,
    searchName: string,
    searchError: boolean,
    totalPages: number | null,
    currentPage: number | null,
    isActive: boolean
}

type setSearchResult = ReturnType<typeof setSearchResult>

type ActionsType = setSearchResult

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

type SearchResultsElementType = {
    adult: boolean
    backdrop_path: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

//state-----------------------------------------------------------------------------------------------------------------

let initialState: initialStateType = {
    search: [],
    searchError: false,
    searchName: '',
    totalPages: null,
    currentPage: 1,
    isActive: false
}

//reducer---------------------------------------------------------------------------------------------------------------

export const searchReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case 'SEARCH/SET-SEARCH-RESULT': {
            return {...state,
                search: action.payload.search,
                isActive: true
            }
        }
        default:
            return state;
    }
}

//actions---------------------------------------------------------------------------------------------------------------

export const setSearchResult = (search: any) => ({type: 'SEARCH/SET-SEARCH-RESULT', payload: {search}} as const);

//thunks----------------------------------------------------------------------------------------------------------------

export const searchMovieTC = (query: string, page: number): ThunkActionType => async (dispatch) => {
    try {
        const response = await moviesAPI.searchMovie(query, page)
        dispatch(setSearchResult(response))
    } catch (e) {
        console.log(e)
    }
}