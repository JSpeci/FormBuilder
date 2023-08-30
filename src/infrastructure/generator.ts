import {
    FormQuestion,
    InputType,
    FormModel,
    inputTypesPossibleValidationTypes,
} from '../model/form'
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

const getRandomFieldFromArray = (values: string[]): any => {
    const randomIndex = Math.floor(Math.random() * values.length)
    return values[randomIndex]
}

const generateRandomValidations = (fieldType: InputType): ValidationRule[] => {
    const possibleValidationTypes = inputTypesPossibleValidationTypes(fieldType)
    const validations: ValidationRule[] = []

    // Ensure IsMandatory is included once
    if (possibleValidationTypes.includes(ValidationType.IsMandatory)) {
        const mandatoryValidation = generateValidationByType(
            ValidationType.IsMandatory
        )
        validations.push(mandatoryValidation)
    }

    // Generate additional random validations
    const additionalValidationTypes = possibleValidationTypes.filter(
        (type) => type !== ValidationType.IsMandatory
    )

    while (additionalValidationTypes.length > 0) {
        const randomValidationType = getRandomFieldFromArray(
            additionalValidationTypes
        )
        if (randomValidationType) {
            const validation = generateValidationByType(randomValidationType)
            validations.push(validation)
            additionalValidationTypes.splice(
                additionalValidationTypes.indexOf(randomValidationType),
                1
            )
        } else {
            break // No more validation types available
        }
    }

    return validations
}

const generateValidationByType = (
    validationType: ValidationType
): ValidationRule => {
    const validation: ValidationRule = {
        validationId: generateId(),
        type: validationType,
        message: `Answer ${validationType}`,
    }

    if (
        validationType === ValidationType.StartsWithText ||
        validationType === ValidationType.ContainsText
    ) {
        validation.textValue = 'SomeText'
        validation.message = `${validationType} ${validation.textValue}`
    } else if (
        validationType === ValidationType.GreaterThan ||
        validationType === ValidationType.LessThan
    ) {
        validation.numericValue = Math.floor(Math.random() * 100)
        validation.message = `${validationType} ${validation.numericValue}`
    }

    return validation
}

const generateRandomFormField = (): FormQuestion => {
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

    const formField: FormQuestion = {
        questionId: generateId(),
        type,
        question,
        validations: hasValidations ? generateRandomValidations(type) : [],
    }

    return formField
}

const generateRandomForm = (): FormModel => {
    const created = new Date()
    const formFields: FormQuestion[] = []
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
        formQuestions: formFields,
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
    'Can birds swim underwater?',
    'Is the sun made of cheese?',
    'Do horses have feathers?',
    'Are clouds made of marshmallows?',
    'Do frogs wear shoes?',
    'Do elephants have wings?',
    'Are trees made of chocolate?',
    'Can fish ride bicycles?',
    'Do clouds taste like cotton candy?',
    'Are rocks soft and squishy?',
]

const randomNumericQuestions = [
    'How much dog weights',
    'Kgs to overweight cat',
    'Parrots in one cage',
    'Geese eggs per year',
    'How many legs does an octopus have?',
    'What is the weight of an average pineapple?',
    'How many fingers does a human have?',
    'How tall is the Eiffel Tower in meters?',
    'How many days are there in a leap year?',
    'How many teeth does an adult human typically have?',
    'What is the distance from Earth to the Moon in kilometers?',
    'How many players are on a soccer team?',
    'What is the boiling point of water in degrees Celsius?',
    'How many planets are there in our solar system?',
]

const randomTextualQuestions = [
    'Explain us, how the dog sleeps throughout the day?',
    'Tell me the secret about cat feeding.',
    'Where can I buy these annoying parrots?',
    'Why are the geese eggs stored in the fridge?',
    'Describe your favorite type of weather.',
    'What is your favorite book and why?',
    'Share a childhood memory that makes you smile.',
    'If you could travel anywhere in the world, where would you go?',
    "What's the best piece of advice you've ever received?",
    "Tell us about a skill you'd like to learn.",
    "What's the most adventurous thing you've ever done?",
    'Describe a perfect day in your life.',
    'If you could have any superpower, what would it be?',
    "What's the most interesting place you've ever visited?",
    'Share a fun fact about yourself.',
    "What's the best meal you've ever had?",
    'Describe your dream job.',
    'If you could meet any historical figure, who would it be?',
    "What's your favorite type of music and why?",
    "Tell us about a hobby you're passionate about.",
]
