import { ValidationRule, ValidationType } from '../validations/validations'

export enum InputType {
    YesNo = 'Yes or No',
    Text = 'Text',
    Numeric = 'Numeric',
}

export type FormQuestion = {
    questionId: string
    type: InputType
    question: string
    validations?: ValidationRule[]
}

export type FormModel = {
    id: string
    name: string
    description?: string
    created: Date
    formQuestions: FormQuestion[]
}

export const inputTypesPossibleValidationTypes = (type: InputType) => {
    switch (type) {
        case InputType.Numeric:
            return [
                ValidationType.GreaterThan,
                ValidationType.LessThan,
                ValidationType.IsMandatory,
            ]
        case InputType.Text:
            return [
                ValidationType.ContainsText,
                ValidationType.StartsWithText,
                ValidationType.IsMandatory,
            ]
        case InputType.YesNo:
            return [ValidationType.IsMandatory]
    }
}

export const isValidationTypeNumeric = (
    validationType: ValidationType
): boolean => {
    const numericValidationTypes = [
        ValidationType.GreaterThan,
        ValidationType.LessThan,
    ]

    return numericValidationTypes.includes(validationType)
}

export const isValidationOnlyOneInQuestion = (
    validationType: ValidationType
): boolean => {
    const singletonValidationsOnQuestion = [
        ValidationType.GreaterThan,
        ValidationType.LessThan,
        ValidationType.IsMandatory,
        ValidationType.StartsWithText,
    ]

    return singletonValidationsOnQuestion.includes(validationType)
}
