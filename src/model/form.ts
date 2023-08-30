import { ValidationRule, ValidationType } from '../validations/validations'

export enum InputType {
    YesNo = 'Yes or No',
    Text = 'Text',
    Numeric = 'Numeric',
}

export type FormQuestion = {
    questionId: number
    type: InputType
    question: string
    validations?: ValidationRule[]
}

export type FormModel = {
    id: number
    name: string
    description?: string
    created: Date
    formQuestions: FormQuestion[]
}

export const mapInputTypeToValidationTypes = (type: InputType) => {
    switch (type) {
        case InputType.Numeric:
            return [ValidationType.GreaterThan, ValidationType.LessThan]
        case InputType.Text:
            return [ValidationType.ContainsText, ValidationType.StartsWithText]
    }
    return []
}
