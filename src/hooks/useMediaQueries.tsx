import { useEffect, useReducer } from 'react'

const initialState = { matches: false }

const reducer = (state: typeof initialState, action: any) => {
    if (action.type === 'setMatches') {
        return { matches: action.payload }
    } else {
        return state
    }
}

const useMediaQuery = (query: string) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== state.matches) {
            dispatch({ type: 'setMatches', payload: media.matches })
        }
        const listener = () => dispatch({ type: 'setMatches', payload: media.matches })
        window.addEventListener('resize', listener)
        return () => window.removeEventListener('resize', listener)
    }, [query, state.matches])

    return state.matches
}

export default useMediaQuery
