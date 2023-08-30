import React, { createContext, useContext, useState } from 'react'
import { FormQuestion, InputType } from '../model/form'
import { useFormContext } from './FormContext'
import { generateId } from '../infrastructure/generateId'

export type NewQuestionContextType = {
    setQuestion: (n: string) => void
    setType: (t: InputType) => void
    addQuestionToForm: () => void
    question: FormQuestion
}

export const NewQuestionContext = createContext<NewQuestionContextType | null>(
    null
)

interface NewQuestionContextProviderProps {
    children: React.ReactNode
}

export const NewQuestionContextProvider: React.FC<
    NewQuestionContextProviderProps
> = (props: NewQuestionContextProviderProps) => {
    const emptyFormField: FormQuestion = {
        questionId: generateId(),
        question: '',
        type: InputType.YesNo,
        validations: [],
    }

    const [formField, setFormField] = useState<FormQuestion>(emptyFormField)
    const { selectedFormForEditing, updateExistingForm } = useFormContext()
    // bad solution, but I was stuck and did not waste time
    // to investigate how the fluentUI gives the enum from dropdown
    const convertStringToInputType = (s: string) => {
        switch (s) {
            case 'Yes or No':
                return InputType.YesNo
            case 'Text':
                return InputType.Text
            case 'Numeric':
                return InputType.Numeric
        }
        return InputType.YesNo
    }

    const setQuestion = (q: string) => {
        setFormField({ ...formField, question: q })
    }

    const setType = (t: string) => {
        setFormField({ ...formField, type: convertStringToInputType(t) })
    }

    const addQuestionToForm = () => {
        if (selectedFormForEditing) {
            const updated = { ...selectedFormForEditing }
            updated.formQuestions.push(formField)
            selectedFormForEditing &&
                updateExistingForm(selectedFormForEditing?.id, updated)
        }
        setFormField(emptyFormField)
    }

    const contextValue: NewQuestionContextType = {
        setQuestion,
        setType,
        addQuestionToForm,
        question: formField,
    }

    return (
        <NewQuestionContext.Provider value={contextValue}>
            {props.children}
        </NewQuestionContext.Provider>
    )
}
export const useNewQuestionContext = () => {
    const context = useContext(NewQuestionContext)
    if (!context) {
        throw new Error(
            'useNewQuestionContext must be used within a NewQuestionContextProvider'
        )
    }
    return context
}
