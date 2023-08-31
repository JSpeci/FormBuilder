import React, { useState, useEffect } from 'react'
import {
    Subtitle1,
    makeStyles,
    shorthands,
    Button,
} from '@fluentui/react-components'
import { useFormContext } from '../contexts/FormContext'
import FormField from './FormField'

const useStyles = makeStyles({
    mainPanel: {
        width: '30%',
        minWidth: '400px',
        ...shorthands.padding('1rem'),
        display: 'flex',
        flexDirection: 'column',
    },
    formRow: {
        marginBottom: '2rem',
    },
    chooseSubtitle: {
        ...shorthands.padding('1rem'),
    },
})

export const TestingSandbox = () => {
    const styles = useStyles()
    const { selectedFormForTesting } = useFormContext()

    const [validationStates, setValidationStates] = useState<
        (boolean | undefined)[]
    >(
        selectedFormForTesting
            ? selectedFormForTesting.formQuestions.map(() => undefined)
            : []
    )

    // Update validationStates when selectedFormForTesting changes
    useEffect(() => {
        if (selectedFormForTesting) {
            setValidationStates(
                selectedFormForTesting.formQuestions.map(() => undefined)
            )
        }
    }, [selectedFormForTesting])

    const handleFieldValidation = (index: number, isValid: boolean) => {
        setValidationStates((prevStates) => {
            const updatedStates = [...prevStates]
            updatedStates[index] = isValid
            return updatedStates
        })
    }

    const [allFieldsValid, setAllFieldsValid] = useState<boolean>(false)

    useEffect(() => {
        setAllFieldsValid(validationStates.every((state) => state))
    }, [validationStates])

    const handleSubmit = () => {
        if (validationStates.every((v) => v === true)) {
            alert('All is VALID')
        } else {
            alert('NOT VALIID')
        }
    }

    const handleClear = () => {
        setValidationStates(
            selectedFormForTesting?.formQuestions.map(() => undefined) || []
        )

        // If you have controlled components (like Input fields) in FormField component,
        // you need to clear their values as well
        selectedFormForTesting?.formQuestions.forEach((fq, index) => {
            handleFieldValidation(index, false) // Reset validation state to false
        })
    }

    return (
        <div className={styles.mainPanel}>
            <div className={styles.formRow}>
                <Subtitle1>{selectedFormForTesting?.name}</Subtitle1>
            </div>

            {selectedFormForTesting ? (
                <>
                    {selectedFormForTesting.formQuestions.map((fq, index) => (
                        <div className={styles.formRow}>
                            <FormField
                                key={index}
                                question={fq}
                                index={index}
                                onValueChange={handleFieldValidation}
                            />
                        </div>
                    ))}
                    <div className={styles.formRow}>
                        <Button
                            disabled={!allFieldsValid}
                            onClick={handleSubmit}
                        >
                            Send It !!
                        </Button>
                    </div>
                    <div className={styles.formRow}>
                        <Button onClick={handleClear}>Clear form</Button>
                    </div>
                </>
            ) : (
                <div>
                    <Subtitle1>Choose some formular</Subtitle1>
                </div>
            )}
        </div>
    )
}
