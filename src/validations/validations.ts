export enum ValidationType {
    IsMandatory = 'Is mandatory',
    GreaterThan = 'Greater than',
    LessThan = 'Less than',
    StartsWithText = 'Starts with',
    ContainsText = 'Contains text',
}

export interface ValidationRule {
    type: ValidationType
    message: string
    textValue?: string
    numericValue?: number
}

export class Validator {
    static validate(value: any, rules: ValidationRule[]): string | null {
        for (const rule of rules) {
            switch (rule.type) {
                case ValidationType.IsMandatory:
                    if (!value) {
                        return rule.message
                    }
                    break
                case ValidationType.StartsWithText:
                    if (
                        rule.textValue &&
                        !new RegExp(`^${rule.textValue}`).test(value)
                    ) {
                        return rule.message
                    }
                    break
                case ValidationType.ContainsText:
                    if (
                        rule.textValue &&
                        !new RegExp(rule.textValue).test(value)
                    ) {
                        return rule.message
                    }
                    break
                case ValidationType.GreaterThan:
                    if (rule.numericValue && value > rule.numericValue) {
                        return rule.message
                    }
                    break
                case ValidationType.LessThan:
                    if (rule.numericValue && value < rule.numericValue) {
                        return rule.message
                    }
                    break
                // Add cases for other validation types
                default:
                    break
            }
        }
        return null
    }
}

// Example usage
const rules: ValidationRule[] = [
    { type: ValidationType.IsMandatory, message: 'Field is mandatory.' },
    {
        type: ValidationType.StartsWithText,
        message: "Field must start with 'ABC'.",
        textValue: 'ABC',
    },
    // Add more validation rules here
]

const valueToValidate = 'ABCD' // Example value
const validationMessage = Validator.validate(valueToValidate, rules)
if (validationMessage) {
    console.log(validationMessage)
} else {
    console.log('Validation passed.')
}
