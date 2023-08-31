import React, { useState, useEffect } from 'react'
import {
    Subtitle1,
    makeStyles,
    shorthands,
    Button,
} from '@fluentui/react-components'
import { useFormContext } from '../../contexts/FormContext'
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

interface ValidationState {
    isValid: boolean | undefined
    message: string | undefined
}

export const TestingSandbox = () => {
    const styles = useStyles()
    const { selectedFormForTesting } = useFormContext()

    const getEmptyValidatonStates = () =>
        selectedFormForTesting
            ? selectedFormForTesting.formQuestions.map(() => {
                  return {
                      isValid: undefined,
                      message: undefined,
                  }
              })
            : []

    const [validationStates, setValidationStates] = useState<ValidationState[]>(
        getEmptyValidatonStates()
    )

    const [values, setValues] = useState<string[]>(
        selectedFormForTesting
            ? selectedFormForTesting.formQuestions.map(() => '')
            : []
    )

    // Update validationStates when selectedFormForTesting changes
    useEffect(() => {
        if (selectedFormForTesting) {
            setValidationStates(getEmptyValidatonStates())
        }
    }, [selectedFormForTesting])

    const handleFieldValidation = (
        index: number,
        isValid: boolean | undefined,
        message: string | undefined
    ) => {
        setValidationStates((prevStates) => {
            const updatedStates = [...prevStates]
            updatedStates[index] = { isValid, message }
            return updatedStates
        })
    }

    const handleValueChanged = (index: number, value: string) => {
        setValues((prevValues) => {
            const updatedValues = [...prevValues]
            updatedValues[index] = value
            return updatedValues
        })
    }

    const [allFieldsValid, setAllFieldsValid] = useState<boolean>(false)

    useEffect(() => {
        setAllFieldsValid(validationStates.every((state) => state))
    }, [validationStates])

    const handleSubmit = () => {
        if (validationStates.every((v) => v.isValid === true)) {
            alert('All is VALID')
        } else {
            alert('NOT VALIID')
        }
    }

    const handleClear = () => {
        setValidationStates(getEmptyValidatonStates())
        setValues([])
    }

    return (
        <div className={styles.mainPanel}>
            <div className={styles.formRow}>
                <Subtitle1>{selectedFormForTesting?.name}</Subtitle1>
            </div>

            {selectedFormForTesting ? (
                <>
                    {selectedFormForTesting.formQuestions.map((fq, index) => (
                        <div className={styles.formRow} key={index}>
                            <FormField
                                question={fq}
                                index={index}
                                onValidationChange={handleFieldValidation}
                                validationState={
                                    validationStates[index]?.isValid
                                }
                                validationMessage={
                                    validationStates[index]?.message
                                }
                                inputValue={values[index]}
                                onValueChange={handleValueChanged}
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
