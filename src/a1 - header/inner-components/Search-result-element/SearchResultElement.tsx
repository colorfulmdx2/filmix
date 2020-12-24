import React from "react";
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CardMedia, Grid, Link} from "@material-ui/core";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {grey, indigo} from "@material-ui/core/colors";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux-store/store";


type SearchResultElementType = {
    text: string
    searchResult: any
}

export const SearchResultElement = (props: SearchResultElementType) => {

    const darkMode = useSelector<AppStateType, boolean>(state => state.darkThemeReducer.darkMode)
    const isActive = useSelector<AppStateType, boolean>(state => state.searchReducer.isActive)


    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            height: 'max-content'
        },
        cardContent: {
            paddingBottom: '16px !important'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        pos: {
            marginBottom: 12,
        },
        media: {
            height: '200px',
            width: '100%'

        },

    });

    const Title = withStyles((theme: Theme) =>
        createStyles({
            root: {
                color: darkMode ? indigo[200] : theme.palette.secondary.light,
                fontSize: 25,
                fontWeight: 700
            },

        }),
    )(Typography);

    const Overview = withStyles((theme: Theme) =>
        createStyles({
            root: {
                fontSize: 14,
                color: darkMode ? grey[100] : theme.palette.common.black
            },

        }),
    )(Typography);

    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            {
                isActive
                    ? props.searchResult.map((e: any) =>
                        <Grid item xs={12} key={e.id}>
                            <Link style={{textDecoration: 'none'}} href={`/movie/${e.id}`}>
                                <Card className={classes.root} variant="outlined">

                                    <CardContent className={classes.cardContent}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                                {
                                                    e.backdrop_path
                                                        ? <CardMedia
                                                            className={classes.media}
                                                            image={e.backdrop_path && `https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}/>

                                                        : <PhotoCameraIcon style={{fontSize: 200}}/>
                                                }
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                                <Title color="secondary"
                                                       align={'left'}>
                                                    {e.title}
                                                </Title>

                                                <Overview align={'left'}>
                                                    {e.overview}
                                                </Overview>
                                            </Grid>


                                        </Grid>


                                    </CardContent>

                                </Card>
                            </Link>
                        </Grid>)
                    : null

            }
        </Grid>

    )
}
