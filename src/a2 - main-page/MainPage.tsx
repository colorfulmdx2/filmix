import React, {useEffect} from "react";
import {MovieSlider} from "../common-components/Slider/MovieSlider";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux-store/store";
import {getMoviesTC} from "./reducer-main-page";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, LinearProgress} from "@material-ui/core";
import {MovieSelection} from "../common-components/MovieSelection/MovieSelection";
import avengers from '../assets/images/avengers.jpg'
import joker from '../assets/images/joker.jpg'
import tenet from '../assets/images/tenet.jpg'
import batman from '../assets/images/batman.jpg'
import ring from '../assets/images/ring.jpg'
import fast from '../assets/images/fast.jpg'

export const MainPage = () => {

    const dispatch = useDispatch()

    const sliderData = useSelector<AppStateType>(state => state.mainPageReducer.sliderData.results)
    const preloader = useSelector<AppStateType, boolean>(state => state.preloaderReducer.preloader)


    useEffect(() => {
        dispatch(getMoviesTC(1))
    }, [])

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                padding: 10
            }
        }),
    );

    const classes = useStyles();


    return (
       <>
           {
                <div className={classes.container}>
                   <MovieSlider sliderData={sliderData}
                                naturalSlideWidth={150}
                                naturalSlideHeight={20}
                                totalSlides={20}
                                isPlaying={true}
                                interval={4000}
                                touchEnabled={true}/>

                   <Grid container spacing={1} style={{width: '100%', marginTop: 10}}>
                       <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                           <MovieSelection title={'Weekly trends'}
                                           backgroundImage={avengers}
                                           href={'/upcoming'}
                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                           <MovieSelection title={'Latest'}
                                           backgroundImage={joker}
                                           href={'/popular'}
                           />
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                           <MovieSelection title={'Upcoming'}
                                           backgroundImage={fast}
                                           href={'/upcoming'}/>
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                           <MovieSelection title={'Popular'}
                                           backgroundImage={batman}
                                           href={'/popular'}/>
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                           <MovieSelection title={'Top Rated'}
                                           backgroundImage={ring}
                                           href={'/top-rated'}/>
                       </Grid>
                       <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                           <MovieSelection title={'Now Playing'}
                                           backgroundImage={tenet}
                                           href={'/now-playing'}
                           />
                       </Grid>

                   </Grid>
               </div>
           }</>

    )
}