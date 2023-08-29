import React, { createContext, useContext, useState } from 'react'
import { FormModel } from '../model/form'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEY } from '../constants'

export type FormsContextType = {
    forms: FormModel[]
    dangerouslyRewriteForms: (forms: FormModel[]) => void
    selectedFormForEditing?: FormModel
    selectedFormForTesting?: FormModel
    setFormForEditing: (form: FormModel) => void
    setFormForTesting: (form: FormModel) => void
    createNewForm: (form: FormModel) => void
    updateExistingForm: (id: number) => void
}

export const FormContext = createContext<FormsContextType | null>(null)

interface FormProviderProps {
    children: React.ReactNode
}

export const FormProvider: React.FC<FormProviderProps> = (
    props: FormProviderProps
) => {
    const [forms, setForms] = useLocalStorage(LOCAL_STORAGE_KEY, [])
    const [selectedFormForEditing, setSelectedFormForEditing] = useState<
        FormModel | undefined
    >()
    const [selectedFormForTesting, setSelectedFormForTesting] = useState<
        FormModel | undefined
    >()

    const createNewForm = (form: FormModel) => {
        // Updates local storage when a new form is created
        setForms([...forms, form])
    }

    const updateExistingForm = (id: number) => {
        // update logic here
        console.log(id)
    }

    const setFormForTesting = (form: FormModel | undefined) => {
        setSelectedFormForTesting(form)
    }

    const setFormForEditing = (form: FormModel | undefined) => {
        setSelectedFormForEditing(form)
    }

    const dangerouslyRewriteForms = (forms: FormModel[]) => {
        setForms([...forms])
        setFormForEditing(undefined)
        setFormForTesting(undefined)
    }

    const contextValue: FormsContextType = {
        forms,
        dangerouslyRewriteForms,
        selectedFormForEditing,
        selectedFormForTesting,
        setFormForEditing,
        setFormForTesting,
        createNewForm,
        updateExistingForm,
    }

    return (
        <FormContext.Provider value={contextValue}>
            {props.children}
        </FormContext.Provider>
    )
}
export const useFormContext = () => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider')
    }
    return context
}
