import { ValidationRule, ValidationType } from '../validations/validations'

export class Validator {
    static validate(value: any, rules: ValidationRule[]): string[] {
        const validationMessages: string[] = []

        for (const rule of rules) {
            switch (rule.type) {
                case ValidationType.IsMandatory:
                    if (!value) {
                        validationMessages.push(rule.message)
                    }
                    break
                case ValidationType.StartsWithText:
                    if (
                        rule.textValue &&
                        !new RegExp(`^${rule.textValue}`).test(value)
                    ) {
                        validationMessages.push(rule.message)
                    }
                    break
                case ValidationType.ContainsText:
                    if (
                        rule.textValue &&
                        !new RegExp(rule.textValue).test(value)
                    ) {
                        validationMessages.push(rule.message)
                    }
                    break
                case ValidationType.GreaterThan:
                    if (rule.numericValue && value <= rule.numericValue) {
                        validationMessages.push(rule.message)
                    }
                    break
                case ValidationType.LessThan:
                    if (rule.numericValue && value >= rule.numericValue) {
                        validationMessages.push(rule.message)
                    }
                    break
                // Add cases for other validation types
                default:
                    break
            }
        }

        return validationMessages
    }
}
