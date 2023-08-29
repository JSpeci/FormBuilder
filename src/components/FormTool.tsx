import React from 'react'
import { Subtitle1, makeStyles, shorthands } from '@fluentui/react-components'
import { ValidationRule, ValidationType } from '../validations/validations'
import { FormField, InputType } from '../model/form'

const useStyles = makeStyles({
    mainPanel: {
        width: '100%',
        ...shorthands.padding('1rem'),
        backgroundColor: '#ffffff',
        display: 'flex', // Set display to flex
        flexDirection: 'column', // Set flex direction to column
    },
    item: {
        marginBottom: '1rem',
        minWidth: '17rem',
    },
})

export interface FormToolProps {
    formFields: FormField[]
}

export const FormTool: React.FunctionComponent<FormToolProps> = (
    props: FormToolProps
) => {
    const renderInput = (field: FormField) => {
        switch (field.type) {
            case InputType.Text:
            case InputType.Numeric:
                return <input />
            case InputType.YesNo:
                return (
                    <select>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                )
            default:
                return null
        }
    }

    const renderValidation = (validation: ValidationRule) => {
        switch (validation.type) {
            case ValidationType.IsMandatory:
                return (
                    <p className="validation-message">{validation.message}</p>
                )
            case ValidationType.StartsWithText:
            case ValidationType.ContainsText:
                return (
                    <p className="validation-message">
                        {validation.message} ({validation.textValue})
                    </p>
                )
            case ValidationType.GreaterThan:
            case ValidationType.LessThan:
                return (
                    <p className="validation-message">
                        {validation.message} ({validation.numericValue})
                    </p>
                )
            default:
                return null
        }
    }

    const styles = useStyles()

    return (
        <div className={styles.mainPanel}>
            <div className={styles.item}>
                <Subtitle1>Form editing place</Subtitle1>
            </div>
            <div className={styles.item}>
                <form>
                    {props.formFields.map((field: FormField, index: number) => (
                        <div key={index}>
                            <label>{field.question}</label>
                            {renderInput(field)}
                            {field.validations &&
                                field.validations.map((validation, vIndex) => (
                                    <div key={vIndex}>
                                        {renderValidation(validation)}
                                    </div>
                                ))}
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}
