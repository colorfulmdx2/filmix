import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleWare from 'redux-thunk';
import {searchReducer} from "../a1 - header/inner-components/Search/reducer-search";
import {darkThemeReducer} from "./dark-theme-reducer";
import {mainPageReducer} from "../a2 - main-page/reducer-main-page";
import {moviePageReducer} from "../a4 - movie-page/MoviePage_Reducer";
import {preloaderReducer} from "./preloader-reducer";
import {loginReducer} from "./login-reducer";




const reducers = combineReducers({
    searchReducer: searchReducer,
    darkThemeReducer: darkThemeReducer,
    mainPageReducer: mainPageReducer,
    moviePageReducer: moviePageReducer,
    preloaderReducer: preloaderReducer,
    loginReducer: loginReducer
})


export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
let store = createStore(reducers, composeEnhancers (applyMiddleware(thunkMiddleWare)));


// @ts-ignore
window.store =  store



export default store;
