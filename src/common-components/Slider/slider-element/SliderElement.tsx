import React from "react";
import {Slide} from "pure-react-carousel";
import style from './SliderElement.module.scss'
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {amber, indigo} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux-store/store";
import {Card, CardActionArea} from "@material-ui/core";
import {NavLink} from "react-router-dom";

type SliderElementType = {
    index: number
    backdrop_path: string
    title: string
    vote_average: number
    id: number
}

export const SliderElement = (props: SliderElementType) => {

    const darkMode = useSelector<AppStateType, boolean>(state => state.darkThemeReducer.darkMode)

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            slide: {
                height: 400
            },
            img: {
                objectFit: 'cover',
                width: '100%',
                height: '100%',
            },
            title: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                textAlign: 'center',
                background: theme.palette.primary.dark,
                height: 38,
                width: '90%',
                zIndex: 1,
            },
            vote: {
                position: 'absolute',
                background: '#01C03A',
                boxShadow: '0 5px 5px 0 rgba(0,0,0,.15)',
                width: 50,
                textAlign: 'center',
                top: 10,
                left: 0,
                zIndex: 1,
            },
            cardAction: {
                height: 400,
                padding: '0 10px'
            },
            card: {
                boxShadow: 'none',
                borderRadius: 0
            }
        }),
    );

    const classes = useStyles();

    const Title = withStyles((theme: Theme) =>
        createStyles({
            root: {
                color: darkMode ? indigo[200] : theme.palette.common.white,
                fontSize: 25,
                fontWeight: 700
            },

        }),
    )(Typography);

    return (
        <Slide index={props.index} className={classes.slide}>
            <NavLink to={`/movie/${props.id}`}>
                <Card className={classes.card}>
                    <CardActionArea className={classes.cardAction}>
                        <img className={classes.img}
                             src={props.backdrop_path && `https://image.tmdb.org/t/p/w500/${props.backdrop_path}`}
                             alt=""/>
                        <Title className={classes.title}>{props.title}</Title>
                        <div className={classes.vote}>{props.vote_average}</div>
                    </CardActionArea>
                </Card>
            </NavLink>
        </Slide>
    )
}