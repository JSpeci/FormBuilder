import {
    Checkbox,
    Input,
    Label,
    makeStyles,
    shorthands,
    useId,
} from '@fluentui/react-components'
import { InputType } from '../../model/form'
import { ValidationType } from '../../validations/validations'
import { useState } from 'react'

const validationSelectorTypes = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
    },
    valueInput: {
        minWidth: '200px',
    },
})

interface CreateValidationForFieldProps {
    type?: InputType
}

export const CreateValidationForField: React.FC<
    CreateValidationForFieldProps
> = (props) => {
    const questionType = useId('questionType')
    const styles = validationSelectorTypes()

    return (
        <>
            <div className={styles.root}>
                <Label htmlFor={questionType}>Question validations</Label>
                {props.type === InputType.Numeric && (
                    <>
                        <ValidationWithValueAddRow
                            label={ValidationType.GreaterThan}
                        >
                            <Input
                                className={styles.valueInput}
                                type="number"
                                // potrebuji komponentu, ktere predhodim validationrules[] a vybarvi se podle toho checkboxy
                            />
                        </ValidationWithValueAddRow>
                        <ValidationWithValueAddRow
                            label={ValidationType.LessThan}
                        >
                            <Input
                                className={styles.valueInput}
                                type="number"
                            />
                        </ValidationWithValueAddRow>
                    </>
                )}

                {props.type === InputType.Text && (
                    <>
                        <ValidationWithValueAddRow
                            label={ValidationType.StartsWithText}
                        >
                            <Input className={styles.valueInput} type="text" />
                        </ValidationWithValueAddRow>
                        <ValidationWithValueAddRow
                            label={ValidationType.ContainsText}
                        >
                            <Input className={styles.valueInput} type="text" />
                        </ValidationWithValueAddRow>
                    </>
                )}
                <ValidationWithValueAddRow label={ValidationType.IsMandatory} />
            </div>
        </>
    )
}

const validationAddRowStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
    },
})

interface ValidationAddRowProps {
    label: string
    children?: React.ReactNode
}

export const ValidationWithValueAddRow: React.FC<ValidationAddRowProps> = (
    props
) => {
    const styles = validationAddRowStyles()
    const [checked, setChecked] = useState(false)

    return (
        <div className={styles.root}>
            <Checkbox
                label={props.label}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
            {checked && props.children}
        </div>
    )
}
