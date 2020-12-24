type initialStateType = {
   preloader: boolean
}

let initialState: initialStateType = {
    preloader: false
}

export type setPreloaderType = ReturnType<typeof setPreloader>

export const preloaderReducer = (state = initialState, action: setPreloaderType) => {

    switch (action.type) {
        case "PRELOADER/SET-PRELOADER": {
            return {...state, preloader: action.payload.value}
        }
        default:
            return state;
    }
}

export const setPreloader = (value: boolean) => ({type: 'PRELOADER/SET-PRELOADER', payload: {value}} as const);