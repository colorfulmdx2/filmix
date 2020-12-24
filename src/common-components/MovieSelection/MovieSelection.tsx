import React, {useEffect} from "react";
import {Card, CardActionArea, CardContent, Link, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


type MovieSelectionType = {
    title: string
    backgroundImage: any
    href: string
}

export const MovieSelection = (props: MovieSelectionType) => {

    useEffect(() => {

    }, [])

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            card: {
                boxShadow: 'none',
                borderRadius: 0,
                //backgroundColor: darkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                width: '100%',
                height: 210,
                backgroundImage: `url(${props.backgroundImage})`,
                backgroundPosition: '25% 15%',
                '&:after': {
                    height: '100%',
                    width: '100%',
                    backgroundColor: theme.palette.common.black,
                    opacity: 0.3,
                }
            },
            cardActionArea: {
                width: '100%',
                height: 210,

            },
            link: {},
            title: {
                textAlign: 'center',
                fontSize: 60,
                color: theme.palette.common.white,
                zIndex: 1111,
                marginTop: 30,
                [theme.breakpoints.down('sm')]: {
                    fontSize: 40,
                    marginTop: 40,
                },

            },
            titleWrapper: {
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.common.black,
                opacity: 0.7
            }
        }),
    );

    const classes = useStyles();

    return (
        <Link style={{textDecoration: 'none'}} href={props.href}>
            <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>

                    {/*<div className={classes.titleWrapper}>*/}
                    <CardContent className={classes.titleWrapper}>
                        <Typography className={classes.title}>{props.title}</Typography>
                    </CardContent>

                  {/*  </div>*/}

                </CardActionArea>
            </Card>
        </Link>
    )
}