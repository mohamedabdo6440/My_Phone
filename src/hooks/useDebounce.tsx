import { useEffect, useState } from 'react'

const useDebounce = <T,>(value: T, delay = 500) => {
    const [debounceValue, setDebounceValue] = useState<T>(value)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => clearTimeout(timerId)
    }, [value, delay])

    return debounceValue
}

export default useDebounce
