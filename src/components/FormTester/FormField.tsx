import React from 'react'
import { Field, Input, Switch } from '@fluentui/react-components'
import { FormQuestion, InputType } from '../../model/form'
import { Validator } from '../../infrastructure/validator'
import { ValidationType } from '../../validations/validations'

interface FormFieldProps {
    question: FormQuestion
    index: number
    validationState: boolean | undefined
    inputValue: any
    validationMessage: string | undefined
    onValidationChange: (
        index: number,
        isValid: boolean,
        message?: string
    ) => void
    onValueChange: (index: number, value: any) => void
}

const FormField: React.FC<FormFieldProps> = ({
    question,
    index,
    onValidationChange,
    onValueChange,
    inputValue,
    validationState,
    validationMessage,
}) => {
    const handleValidation = (value: any) => {
        const validationMessages = Validator.validate(
            value,
            question.validations || []
        )
        const isValid = validationMessages.length === 0
        onValidationChange(index, isValid, validationMessages.join(', '))
    }

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        onValueChange(index, value)
        handleValidation(value)
    }

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked
        onValidationChange(index, isChecked !== undefined)
        onValueChange(index, isChecked)

        const switchMesage = question.validations?.find(
            (fq) => fq.type === ValidationType.IsMandatory
        )?.message
        onValidationChange(index, isChecked !== undefined, switchMesage)
    }

    return (
        <div>
            <Field
                label={question.question}
                validationState={
                    validationState === undefined
                        ? 'none'
                        : validationState
                        ? 'success'
                        : 'error'
                }
                validationMessage={validationState ? '' : validationMessage}
            >
                {question.type === InputType.YesNo ? (
                    <Switch onChange={handleSwitchChange} value={inputValue} />
                ) : (
                    <Input
                        type={
                            question.type === InputType.Numeric
                                ? 'number'
                                : 'text'
                        }
                        onChange={handleFieldChange}
                        onBlur={(e) => {
                            handleValidation(e.target.value)
                        }}
                        value={inputValue || ''}
                    />
                )}
            </Field>
        </div>
    )
}

export default FormField
