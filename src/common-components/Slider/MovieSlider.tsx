import React, {useEffect, useState} from 'react';
import {ButtonBack, ButtonNext, CarouselProvider, Slider} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import style from './Slider.module.scss'
import {SliderElement} from "./slider-element/SliderElement";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {IconButton} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import {Heading} from "../Title/Title";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux-store/store";

type MovieSliderType = {
    sliderData: any
    naturalSlideWidth: number
    naturalSlideHeight: number
    totalSlides: number
    isPlaying: boolean
    interval: number
    touchEnabled: boolean

}


export const MovieSlider = (props: MovieSliderType) => {

    const [visibleSlides, setVisibleSlides] = useState(5)

    const darkMode = useSelector<AppStateType, boolean>(state => state.darkThemeReducer.darkMode)

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            button: {
                color: amber[300]
            },

        }),
    );

    useEffect(() => {
        if (window.screen.width < 1025) {
            setVisibleSlides(3)
        }
        if (window.screen.width < 600) {
            setVisibleSlides(2)
        }
        if (window.screen.width < 500) {
            setVisibleSlides(1)
        }
    }, [window.screen.width, visibleSlides])

    const classes = useStyles();

    const sliderElements = props.sliderData && props.sliderData.map((element: any, index: number) =>

            <SliderElement
                index={index}
                backdrop_path={element.backdrop_path}
                title={element.title}
                vote_average={element.vote_average}
                id={element.id}
                key={element.id}/>
        )

    return (
        <CarouselProvider
            naturalSlideWidth={props.naturalSlideWidth}
            naturalSlideHeight={props.naturalSlideHeight}
            totalSlides={props.totalSlides}
            isPlaying={props.isPlaying}
            interval={props.interval}
            touchEnabled={props.touchEnabled}
            visibleSlides={visibleSlides}>


            <Slider className={style.slider}>
                {sliderElements}
            </Slider>

            <div>

                <ButtonBack className={style.button}>
                    <IconButton className={classes.button} color={'primary'}>
                        <ArrowBackIosIcon fontSize={'large'}/>
                    </IconButton>
                </ButtonBack>

                <ButtonNext className={style.button}>
                    <IconButton className={classes.button} color={'primary'}>
                        <ArrowForwardIosIcon fontSize={'large'}/>
                    </IconButton>
                </ButtonNext>

            </div>

        </CarouselProvider>
    );
}