import React, { createContext, useContext, useState } from 'react'
import { ValidationRule } from '../validations/validations'

export type EditValidationContextType = {
    validation: ValidationRule | null
    isNewValidation: boolean
    startEditingValidation: (
        validation: ValidationRule | null,
        isNew: boolean
    ) => void
    stopEditingValidation: () => void
}

export const EditValidationContext =
    createContext<EditValidationContextType | null>(null)

interface EditValidationContextProviderProps {
    children: React.ReactNode
}

export const EditValidationContextProvider: React.FC<
    EditValidationContextProviderProps
> = (props: EditValidationContextProviderProps) => {
    const [validation, setValidation] = useState<ValidationRule | null>(null)
    const [isNewValidation, setIsNewValidation] = useState<boolean>(true)

    const startEditingValidation = (
        validation: ValidationRule | null,
        isNew: boolean
    ) => {
        setValidation(validation)
        setIsNewValidation(isNew)
    }

    const stopEditingValidation = () => {
        setValidation(null)
        setIsNewValidation(true)
    }

    const contextValue: EditValidationContextType = {
        validation,
        isNewValidation,
        startEditingValidation,
        stopEditingValidation,
    }

    return (
        <EditValidationContext.Provider value={contextValue}>
            {props.children}
        </EditValidationContext.Provider>
    )
}

export const useEditValidationContext = () => {
    const context = useContext(EditValidationContext)
    if (!context) {
        throw new Error(
            'useEditValidationContext must be used within an EditValidationContextProvider'
        )
    }
    return context
}
