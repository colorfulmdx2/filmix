import React from "react";
import {Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {amber} from "@material-ui/core/colors";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux-store/store";
import {Variant} from "@material-ui/core/styles/createTypography";

type HeadingPropsType = {
    variant: Variant | 'inherit';
    heading: string
}

export const Heading = (props: HeadingPropsType) => {

    const darkMode = useSelector<AppStateType, boolean>(state => state.darkThemeReducer.darkMode)

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            button: {
                color: amber[300]
            },
            title: {
                color: theme.palette.common.white,
                backgroundColor: darkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                width: 'max-content',
                padding: 10,
                marginBottom: 10
            }
        }),
    );

    const classes = useStyles();

    return (
        <Typography className={classes.title}
                    variant={props.variant}>
            {props.heading}
        </Typography>
    )
}