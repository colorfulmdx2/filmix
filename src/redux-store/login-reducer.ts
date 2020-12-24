import firebase from "firebase";
import myFirebase from "../firebase/firebase";
import { db } from '../firebase/firebase'
import {setPreloader} from "./preloader-reducer";


type initialStateType = {
    isAuth: boolean
    user: {} | null
    isVerifying: boolean
    favoriteMovies: {} | null
    data: boolean
}

let initialState: initialStateType = {
    isAuth: false,
    user: null,
    isVerifying: false,
    favoriteMovies: {},
    data: false
}

export type isAuthType = ReturnType<typeof isAuth>
export type verifyRequestType = ReturnType<typeof verifyRequest>
export type verifySuccessType = ReturnType<typeof verifySuccess>
export type receiveLoginType = ReturnType<typeof receiveLogin>
export type setFavoritesMoviesType = ReturnType<typeof setFavoritesMovies>

type ActionType = isAuthType | verifyRequestType | verifySuccessType | receiveLoginType | setFavoritesMoviesType

export const loginReducer = (state = initialState, action: ActionType) => {

    switch (action.type) {
        case 'LOGIN/IS-AUTH': {
            return {...state, isAuth: action.payload.isAuth}
        }
        case 'LOGIN/SET-USER': {
            console.log(action.payload.user)
            return {...state, user: action.payload.user}
        }
        case 'LOGIN/VERIFY_SUCCESS':
            return {
                ...state,
                isVerifying: false
            }
        case 'LOGIN/VERIFY-REQUEST':
            return {
                ...state,
                isVerifying: true,
            }
        case 'LOGIN/GET_MOVIES_SUCCESS':
            return {
                ...state,
                favoriteMovies: action.payload.movies, data: true
            }
        default:
            return state;
    }
}

export const isAuth = (isAuth: boolean) => ({type: 'LOGIN/IS-AUTH', payload: {isAuth}} as const)
export const verifyRequest = () => ({type: 'LOGIN/VERIFY-REQUEST'} as const)
export const verifySuccess = () => ({type: 'LOGIN/VERIFY_SUCCESS'} as const)
export const receiveLogin = (user: any) => ({type: 'LOGIN/SET-USER', payload: {user}} as const)
export const setFavoritesMovies = (movies:any) => ({ type: 'LOGIN/GET_MOVIES_SUCCESS', payload: { movies } } as const)


export const login = () => async (dispatch: any) => {

    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    console.log(myFirebase)
    const result = await firebase.auth().signInWithPopup(provider)
    try {
        console.log(result)
        dispatch(isAuth(true))
        dispatch(receiveLogin(result.user))
        await dispatch(getFavoritesMovies())
        await dispatch(addMoviesListener())
    } catch (e) {

    } finally {

    }
}

export const logout = () => async (dispatch: any) => {

    await firebase.auth().signOut()
    dispatch(isAuth(false))
    dispatch(receiveLogin(null))
    dispatch(verifyAuth())

}

export const verifyAuth = () => async (dispatch: any) => {

    //dispatch(setPreloader(true))
    dispatch(verifyRequest());
    await firebase
        .auth()
        .onAuthStateChanged( async user => {
            console.log(user)
            if (user !== null) {
                dispatch(receiveLogin(user))
                await dispatch(getFavoritesMovies())
                await dispatch(addMoviesListener())
            }
           dispatch(verifySuccess())

        })
    //dispatch(setPreloader(false))
}

export const getFavoritesMovies = () => async (dispatch: any) => {

    const userId = firebase.auth().currentUser?.uid
    const moviesColl = db.collection('users').doc(`${userId}`).collection('movies')
    const documents = {}
    const doc = await moviesColl.get()


    doc.forEach((doc) => {
        // @ts-ignore
        documents[doc.id] = doc.data()
    })
    dispatch(setFavoritesMovies(documents))
    console.log(documents)

}

export const addMoviesListener = () => (dispatch:any) => {

    // @ts-ignore
    const userId = firebase.auth().currentUser.uid
    const moviesColl = db.collection('users').doc(`${userId}`).collection('movies')


    moviesColl.onSnapshot(async doc => {
        const moviesDocs = await moviesColl.get()
        const documents = {}

        moviesDocs.forEach(doc => {
            // @ts-ignore
            documents[doc.id] = doc.data()
        })
        dispatch(setFavoritesMovies(documents))

    })

}

export const deleteFirebaseItem = async (movie:any) => {
    // @ts-ignore
    const userId = firebase.auth().currentUser.uid
    await db.collection('users').doc(`${userId}`).collection('movies').doc(`${movie.id}`).delete()
}

export const removeMovieFromFavorite = (movie:any) => async (dispatch:any) => {

    try {
        await deleteFirebaseItem(movie)
        dispatch(getFavoritesMovies())
    } catch (err) {
        console.log(err)
    }

}

export const addFireBaseItem = async (movie:any) => {

    // @ts-ignore
    const userId = firebase.auth().currentUser.uid

    await db.collection('users').doc(`${userId}`).collection('movies').doc(`${movie.id}`).set({
        ...movie,
        atTime: firebase.firestore.Timestamp.fromDate(new Date())
    })
}

export const addMovieToFavorite = (movie:any) => async (dispatch:any) => {

    try {
        await addFireBaseItem(movie)
        dispatch(getFavoritesMovies())
    } catch (err) {
        console.log(err, 'add error')
    }

}
