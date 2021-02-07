import React, {ChangeEvent, useEffect, useState} from 'react';
import {createStyles, fade, makeStyles, Theme, withStyles,} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import {grey} from "@material-ui/core/colors";
import {searchMovieTC} from "./reducer-search";
import {useDispatch, useSelector} from 'react-redux'
import {SearchResultElement} from "../Search-result-element/SearchResultElement";
import {AppStateType} from "../../../redux-store/store";

type SearchType = {
    enable: boolean
    onCancel: any
    darkMode: boolean
}

export const Search = (props: SearchType) => {

    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const searchResult = useSelector<AppStateType, any>(state => state.searchReducer.search.results)

    useEffect(() => {
            dispatch(searchMovieTC(text, 1))
    }, [text, dispatch])


    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            modalContent: {
                width: '50%',
                margin: '100px auto 0 auto',
                transform: 'scale(0.5)',
                transition: '0.1s all',
                [theme.breakpoints.down('xs')]: {
                    width: '90%',
                },

            },
            active: {
                transform: 'scale(1)',
            },
            modal: {
                height: '100vh',
                width: '100vw',
                overflowY: 'scroll',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                position: 'fixed',
                top: 0,
                left: 0,
                opacity: 0,
                pointerEvents: 'none',
                transition: '0.5s',
                textAlign: 'center',
                zIndex: 1000,
            },
            modalActive: {
                opacity: 1,
                pointerEvents: 'all',
                paddingBottom: 20
            },
            modalContentActive: {
                transform: 'scale(1)',
            },
            container: {
                height: '100%',
            }
        }),
    );

    const BootstrapInput =  withStyles((theme: Theme) =>
        createStyles({
            root: {
                'label + &': {
                    marginTop: theme.spacing(3),
                },
            },
            input: {
                borderRadius: 4,
                position: 'relative',
                backgroundColor: props.darkMode ? grey[900] : theme.palette.common.white,
                border: 'none',
                fontSize: 16,
                width: '100%',
                padding: '10px 12px',
                transition: theme.transitions.create(['border-color', 'box-shadow']),
                boxShadow:
                    props.darkMode
                        ? `${fade(theme.palette.secondary.dark, 0.50)} 0 0 0 0.2rem`
                        : `${fade(theme.palette.secondary.light, 0.50)} 0 0 0 0.2rem`,
                // Use the system font instead of the default Roboto font.
                fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(','),
                '&:focus': {
                    /* boxShadow: `${fade(theme.palette.secondary.main, 0.50)} 0 0 0 0.2rem`,
                     borderColor: theme.palette.primary.main,*/
            },
                '.Mui-error': {
                    backgroundColor: 'red'
                },
                marginBottom: 20,
            },
        }),
    )(InputBase);

    const classes = useStyles()

    return (
        <div className={props.enable ? `${classes.modal} ${classes.modalActive}` : classes.modal}
             onClick={props.onCancel}>

            <FormControl className={`${classes.modalContent} ${classes.modalContentActive}`}
                         fullWidth={true}
                         onClick={e => e.stopPropagation()}
            >
                <BootstrapInput
                    onChange={onChangeHandler}
                    value={text}
                />

                <SearchResultElement text={text}
                                     searchResult={searchResult}
                />

            </FormControl>


        </div>
    )
}