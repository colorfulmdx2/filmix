
type setDarkThemeType = ReturnType<typeof setDarkTheme>

let initialState = {
    darkMode: true
}

export const darkThemeReducer = (state = initialState, action: setDarkThemeType) => {

    switch (action.type) {
        case "SET-DARK-MODE": {
            return {...state, darkMode: action.darkMode}
        }
        default:
            return state;
    }
}
export const setDarkTheme = (darkMode: boolean) => ({type: 'SET-DARK-MODE', darkMode} as const);