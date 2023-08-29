import { useState } from 'react'

// Custom hook for managing local storage
export const useLocalStorage = (key: string, initialValue: any) => {
    const storedValue = localStorage.getItem(key)
    const initial = storedValue ? JSON.parse(storedValue) : initialValue
    const [value, setValue] = useState(initial)

    const setValueWithStorage = (newValue: string) => {
        localStorage.setItem(key, JSON.stringify(newValue))
        setValue(newValue)
    }

    return [value, setValueWithStorage]
}
