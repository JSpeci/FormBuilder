import { ValidationRule } from '../validations/validations'

export enum InputType {
    YesNo = 'Yes or No',
    Text = 'Text',
    Numeric = 'Numeric',
}

export type FormField = {
    type: InputType
    question: string
    validations?: ValidationRule[]
}

export type FormModel = {
    id: number
    name: string
    description?: string
    created: Date
    formFields: FormField[]
}
