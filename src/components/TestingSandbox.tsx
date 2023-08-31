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

    return (
        <div className={styles.mainPanel}>
            <Subtitle1>{selectedFormForTesting?.name}</Subtitle1>
            {selectedFormForTesting ? (
                <>
                    {selectedFormForTesting.formQuestions.map((fq, index) => (
                        <FormField
                            key={index}
                            question={fq}
                            index={index}
                            onValueChange={handleFieldValidation}
                        />
                    ))}
                    <Button disabled={!allFieldsValid} onClick={handleSubmit}>
                        Send It !!
                    </Button>
                </>
            ) : (
                <div>
                    <Subtitle1>Choose some formular</Subtitle1>
                </div>
            )}
        </div>
    )
}
