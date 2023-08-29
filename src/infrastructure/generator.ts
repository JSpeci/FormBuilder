import { FormField, InputType, FormModel } from '../model/form'
import { ValidationRule, ValidationType } from '../validations/validations'
import { generateId } from './generateId'

export const generateSomeRandomForms = (howManyForms = 7) => {
    // Example usage
    const numberOfFormsToGenerate = howManyForms
    const generatedForms = generateRandomFormsCollection(
        numberOfFormsToGenerate
    )
    return generatedForms
}

const getRandomEnumValue = (enumType: any): any => {
    const values = Object.values(enumType)
    const randomIndex = Math.floor(Math.random() * values.length)
    return values[randomIndex]
}

const getRandomValidationForInputType = (
    fieldType: InputType
): ValidationType => {
    switch (fieldType) {
        case InputType.Numeric:
            return Math.floor(Math.random() * 2) % 2 === 0
                ? ValidationType.GreaterThan
                : ValidationType.LessThan
        case InputType.Text:
            return Math.floor(Math.random() * 2) % 2 === 0
                ? ValidationType.ContainsText
                : ValidationType.StartsWithText
        case InputType.YesNo:
            return ValidationType.IsMandatory
    }
}

const getRandomFieldFromArray = (values: string[]): any => {
    const randomIndex = Math.floor(Math.random() * values.length)
    return values[randomIndex]
}

const generateRandomValidation = (fieldType: InputType): ValidationRule => {
    const validationType = getRandomValidationForInputType(fieldType)
    const validation: ValidationRule = {
        type: validationType,
        message: `answer ${validationType} `,
    }

    if (
        validationType === ValidationType.StartsWithText ||
        validationType === ValidationType.ContainsText
    ) {
        validation.textValue = 'SomeText'
        validation.message = `answer ${validationType} ${validation.textValue}`
    } else if (
        validationType === ValidationType.GreaterThan ||
        validationType === ValidationType.LessThan
    ) {
        validation.numericValue = Math.floor(Math.random() * 100)
        validation.message = `answer ${validationType} ${validation.numericValue}`
    } else if (validationType === ValidationType.IsMandatory) {
        validation.message = `answer ${validationType} `
    }

    return validation
}

const generateRandomFormField = (): FormField => {
    const type = getRandomEnumValue(InputType)
    let question = ''
    switch (type) {
        case InputType.Numeric:
            question = getRandomFieldFromArray(randomNumericQuestions)
            break
        case InputType.YesNo:
            question = getRandomFieldFromArray(randomYesNos)
            break
        case InputType.Text:
            question = getRandomFieldFromArray(randomTextualQuestions)
            break
    }

    const hasValidations = Math.random() < 0.5

    const formField: FormField = {
        type,
        question,
        validations: hasValidations ? [generateRandomValidation(type)] : [],
    }

    return formField
}

const generateRandomForm = (): FormModel => {
    const created = new Date()
    const formFields: FormField[] = []
    const name = `Random form ${Math.floor(Math.random() * 100)}`
    const id = generateId()
    const description =
        Math.random() < 0.5 ? 'Description of my formular is short' : undefined

    for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
        formFields.push(generateRandomFormField())
    }

    const form: FormModel = {
        id,
        name,
        description,
        created,
        formFields,
    }

    return form
}

const generateRandomFormsCollection = (count: number): FormModel[] => {
    const forms: FormModel[] = []

    for (let i = 0; i < count; i++) {
        forms.push(generateRandomForm())
    }

    return forms
}

const randomYesNos = [
    'Is dog blackwhite?',
    'Has cat green eyes?',
    'Does parrot screamy noise?',
    'Is geese goog flyer?',
]

const randomNumericQuestions = [
    'How much dog weights',
    'Kgs to overweight cat',
    'Parrots in one cage',
    'Geese eggs per year',
]

const randomTextualQuestions = [
    'Explain us, how th dog sleeps troughout the day?',
    'Tell me the secret about cat feeding.',
    'Where I can buy these anoying parrots?',
    'Why are the geese eggs storen in fridge?',
]
