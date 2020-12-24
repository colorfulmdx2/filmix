import React, {useEffect} from 'react';
import Header from "./a1 - header/Header";
import {CircularProgress, createMuiTheme, LinearProgress, Paper, ThemeProvider} from "@material-ui/core";
import {grey, indigo} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux-store/store";
import 'pure-react-carousel/dist/react-carousel.es.css';
import {Redirect, Route} from "react-router-dom";
import {MainPage} from "./a2 - main-page/MainPage";
import {MoviesList} from "./a3 - movies-list/MoviesList";
import {MoviePage} from "./a4 - movie-page/MoviePage";
import {getFavoritesMovies, verifyAuth} from "./redux-store/login-reducer";


function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(verifyAuth())
    }, [verifyAuth])


    const darkMode = useSelector<AppStateType, boolean>(state => state.darkThemeReducer.darkMode)
    const preloader = useSelector<AppStateType, boolean>(state => state.preloaderReducer.preloader)
    const isVerifying = useSelector<AppStateType, boolean>(state => state.loginReducer.isVerifying)

    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
            primary: {
                dark: grey[900],
                light: indigo[500],
                main: darkMode ? grey[900] : indigo[500],


            },
            secondary: {
                dark: indigo[500],
                light: indigo[500],
                main: darkMode ? indigo[500] : indigo[500],
            }
        }
    })





    return (
        <ThemeProvider theme={theme}>
            <Paper style={{minHeight: '100vh'}}>
                {
                    isVerifying ? <CircularProgress style={{position: "absolute", top: 50, left: '50%'}} color="secondary" />
                        : <div>
                            <Header/>
                            <div>
                                <Route path='/movie/:id' render={() => <MoviePage/>}/>
                                <Route exact path='/' render={() => <MainPage/>}/>
                                <Route path='/weekly-trends' render={() => <MoviesList query={'latest'}/>}/>
                                <Route path='/latest' render={() => <MoviesList query={'latest'}/>}/>
                                <Route path='/now-playing' render={() => <MoviesList query={'now_playing'}/>}/>
                                <Route path='/popular' render={() => <MoviesList query={'popular'}/>}/>
                                <Route path='/top-rated' render={() => <MoviesList query={'top_rated'}/>}/>
                                <Route path='/upcoming' render={() => <MoviesList query={'upcoming'}/>}/>
                                <Route path='/favorites' render={() => <MoviesList query={'favorites'}/>}/>
                            </div>

                        </div>
                }
            </Paper>

        </ThemeProvider>


    );
}

export default App;
