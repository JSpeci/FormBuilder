import {
    Checkbox,
    Input,
    Label,
    makeStyles,
    shorthands,
    useId,
} from '@fluentui/react-components'
import { InputType, mapInputTypeToValidationTypes } from '../../model/form'
import { useState } from 'react'
import { useNewQuestionContext } from '../../contexts/NewQuestionContext'
import { ValidationRule, ValidationType } from '../../validations/validations'

const validationSelectorTypes = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
    },
})

interface CreateValidationForFieldProps {
    type: InputType
}

export const CreateValidationsForField: React.FC<
    CreateValidationForFieldProps
> = (props) => {
    const questionType = useId('questionType')
    const styles = validationSelectorTypes()

    const { addOrChangeValidationRule } = useNewQuestionContext()

    return (
        <>
            <div className={styles.root}>
                <Label htmlFor={questionType}>Question validations</Label>
                {mapInputTypeToValidationTypes(props.type).map(
                    (validationType) => (
                        <ValidationWithValueAddRow
                            label={validationType}
                            type={validationType}
                            inputType={props.type}
                            onValidationChange={(v) =>
                                addOrChangeValidationRule(v)
                            }
                            key={validationType}
                        />
                    )
                )}
            </div>
        </>
    )
}

const validationAddRowStyles = makeStyles({
    validationInputRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
    },
    valueInputs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
        minWidth: '200px',
    },
    valueInput: {
        minWidth: '200px',
    },
})

interface ValidationAddRowProps {
    label: string
    type: ValidationType
    inputType: InputType
    onValidationChange: (vr: ValidationRule) => void
}

export const ValidationWithValueAddRow: React.FC<ValidationAddRowProps> = (
    props
) => {
    const styles = validationAddRowStyles()
    const [checked, setChecked] = useState(false)
    const [message, setMessage] = useState('')
    const [value, setValue] = useState('')

    const isValid = () => {
        return checked && value && value !== '' && message && message !== ''
    }

    const shouldFireChange = () => {
        if (isValid()) {
            props.onValidationChange({
                message: message || `${props.type} ${value}`,
                type: props.type,
                numericValue:
                    props.inputType === InputType.Numeric
                        ? Number(value)
                        : undefined,
                textValue:
                    props.inputType === InputType.Text ? value : undefined,
            })
        }
    }

    return (
        <div className={styles.valueInputs}>
            <Checkbox
                label={props.label}
                checked={checked}
                onChange={(e) => {
                    setChecked(e.target.checked)
                }}
            />
            {checked && (
                <div className={styles.validationInputRow}>
                    <Input
                        className={styles.valueInput}
                        size="medium"
                        type={
                            props.inputType === InputType.Numeric
                                ? 'number'
                                : 'text'
                        }
                        placeholder={props.type}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                        onBlur={() => shouldFireChange()}
                    />
                    <Input
                        className={styles.valueInput}
                        size="medium"
                        type="text"
                        placeholder="Validation message"
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                        onBlur={() => shouldFireChange()}
                    />
                </div>
            )}
        </div>
    )
}
