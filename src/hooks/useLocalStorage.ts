import { useEffect, useState } from 'react'

export const useLocalStorage = (key: string, initialValue: any) => {
    const storedValue = localStorage.getItem(key)
    const initial = storedValue ? JSON.parse(storedValue) : initialValue
    const [value, setValue] = useState(initial)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)), value
    })

    return [value, setValue]
}
