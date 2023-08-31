import React, { useState } from 'react'
import {
    Subtitle1,
    Field,
    Input,
    Switch,
    makeStyles,
    shorthands,
    Button,
} from '@fluentui/react-components'
import { useFormContext } from '../contexts/FormContext'
import { InputType } from '../model/form'
const useStyles = makeStyles({
    mainPanel: {
        width: '30%',
        minWidth: '400px',
        ...shorthands.padding('1rem'),
        display: 'flex',
        flexDirection: 'column',
    },
    chooseSubtitle: {
        ...shorthands.padding('1rem'),
    },
})

export const TestingSandbox = () => {
    const styles = useStyles()
    const { selectedFormForTesting } = useFormContext()

    const [validationStates, setValidationStates] = useState(
        selectedFormForTesting
            ? selectedFormForTesting.formQuestions.map(() => true)
            : []
    )

    const handleFieldValidation = (index: number, isValid: boolean) => {
        const updatedStates = [...validationStates]
        updatedStates[index] = isValid
        setValidationStates(updatedStates)
    }

    const handleSubmit = () => {
        const allFieldsValid = validationStates.every((state) => state)
        if (allFieldsValid) {
            // Perform your submit logic
        } else {
            // Show error message or take appropriate action
        }
    }

    return (
        <div className={styles.mainPanel}>
            <Button onClick={handleSubmit}>Submit</Button>
            {selectedFormForTesting ? (
                selectedFormForTesting.formQuestions.map((fq, index) => (
                    <div key={index}>
                        <Field
                            label={fq.question}
                            validationState={
                                validationStates[index] ? 'success' : 'error'
                            }
                            validationMessage={
                                validationStates[index]
                                    ? ''
                                    : 'This is an error message.'
                            }
                        >
                            {fq.type === InputType.YesNo ? (
                                <Switch
                                    onChange={(e) =>
                                        handleFieldValidation(
                                            index,
                                            e.target.checked
                                        )
                                    }
                                />
                            ) : (
                                <Input
                                    type={
                                        fq.type === InputType.Numeric
                                            ? 'number'
                                            : 'text'
                                    }
                                    onChange={(e) =>
                                        handleFieldValidation(
                                            index,
                                            e.target.value.trim() !== ''
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </div>
                ))
            ) : (
                <div>
                    <Subtitle1>Choose some formular</Subtitle1>
                </div>
            )}
        </div>
    )
}
