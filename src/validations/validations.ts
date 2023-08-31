export enum ValidationType {
    IsMandatory = 'Is mandatory',
    GreaterThan = 'Greater than',
    LessThan = 'Less than',
    StartsWithText = 'Starts with',
    ContainsText = 'Contains text',
}

export interface ValidationRule {
    validationId: number
    type: ValidationType
    message: string
    textValue?: string
    numericValue?: number
}
