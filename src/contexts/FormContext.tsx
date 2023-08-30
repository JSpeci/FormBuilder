import React, { createContext, useContext, useState } from 'react'
import { FormModel } from '../model/form'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEY } from '../constants'
import { generateId } from '../infrastructure/generateId'
import { generateSomeRandomForms } from '../infrastructure/generator'

export type FormsContextType = {
    forms: FormModel[]
    dangerouslyRewriteForms: () => void
    selectedFormForEditing?: FormModel
    selectedFormForTesting?: FormModel
    setFormForEditing: (id: number) => void
    setFormForTesting: (id: number) => void
    createNewForm: () => number
    deleteForm: (id: number) => void
    updateExistingForm: (id: number, updated: FormModel) => void
    deleteQuestionFromSelectedForm: (questionId: number) => void
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

    const createNewForm = () => {
        // Updates local storage when a new form is created
        const id = generateId()
        const newForm: FormModel = {
            id,
            name: 'New form',
            description: 'Empty form to be filled up',
            created: new Date(),
            formQuestions: [],
        }
        setForms([newForm, ...forms])
        return id
    }

    const deleteForm = (id: number) => {
        const updatedArray = forms.filter((obj: FormModel) => obj.id !== id)
        setForms([...updatedArray])
    }

    const updateExistingForm = (id: number, updated: FormModel) => {
        const updatedArray = forms.map((obj: FormModel) =>
            obj.id === id ? updated : obj
        )
        setForms([...updatedArray])
    }

    const deleteQuestionFromSelectedForm = (questionId: number) => {
        const affectedForm: FormModel = forms.find((form: FormModel) =>
            form.formQuestions.some((q) => q.questionId === questionId)
        )
        const newQuestions = affectedForm.formQuestions.filter(
            (q) => q.questionId !== questionId
        )
        if (selectedFormForEditing) {
            const updated = { ...selectedFormForEditing }
            updated.formQuestions = newQuestions
            updateExistingForm(selectedFormForEditing?.id, updated)
            setSelectedFormForEditing({
                ...selectedFormForEditing,
                formQuestions: newQuestions,
            })
        }
    }

    const setFormForTesting = (id: number | undefined) => {
        const found = (forms as FormModel[]).find((f: FormModel) => f.id === id)
        found && setSelectedFormForTesting(found)
    }

    const setFormForEditing = (id: number | undefined) => {
        const found = (forms as FormModel[]).find((f: FormModel) => f.id === id)
        setSelectedFormForEditing(found)
    }

    const dangerouslyRewriteForms = () => {
        setForms([...generateSomeRandomForms(7)])
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
        deleteForm,
        updateExistingForm,
        deleteQuestionFromSelectedForm,
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
