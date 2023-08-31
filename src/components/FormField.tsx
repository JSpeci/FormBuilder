import React, { useState, useEffect } from 'react'
import { Field, Input, Switch } from '@fluentui/react-components'
import { FormQuestion, InputType } from '../model/form'
import { Validator } from '../infrastructure/validator'
import { ValidationType } from '../validations/validations'

interface FormFieldProps {
    question: FormQuestion
    index: number
    onValueChange: (index: number, isValid: boolean) => void
}

const FormField: React.FC<FormFieldProps> = ({
    question,
    index,
    onValueChange: onValidationChange,
}) => {
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined)
    const [validationMessage, setValidationMessage] = useState<string>('')

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        handleValidation(value)
    }

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked
        onValidationChange(index, isChecked !== undefined)

        const switchMesage = question.validations?.find(
            (fq) => fq.type === ValidationType.IsMandatory
        )?.message
        setIsValid(isChecked !== undefined)
        setValidationMessage(isChecked ? '' : switchMesage || '')
    }
    const handleValidation = (value: any) => {
        const validationMessages = Validator.validate(
            value,
            question.validations || []
        )
        const isValid = validationMessages.length === 0 // Use the updated value
        setIsValid(isValid)
        setValidationMessage(validationMessages.join(', '))
        onValidationChange(index, isValid) // Update validation state directly
    }

    // Handle validation when question.validations change
    useEffect(() => {
        if (question.type === InputType.YesNo) {
            setValidationMessage('')
        } else {
            handleValidation('')
        }
        setIsValid(undefined)
    }, [question.validations])

    return (
        <div>
            <Field
                label={question.question}
                validationState={
                    isValid === undefined
                        ? 'none'
                        : isValid
                        ? 'success'
                        : 'error'
                }
                validationMessage={isValid ? '' : validationMessage}
            >
                {question.type === InputType.YesNo ? (
                    <Switch
                        defaultChecked={undefined}
                        onChange={handleSwitchChange}
                    />
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
                    />
                )}
            </Field>
        </div>
    )
}

export default FormField
