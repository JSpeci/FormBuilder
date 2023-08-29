import React from 'react'
import {
    Divider,
    Subtitle1,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import { QuestionBuilder } from './QuestionBuilder'
import { FormQuestions } from './FormQuestions'
import { useFormContext } from '../contexts/FormContext'
import { FormGeneralInfo } from './FormGeneralInfo'

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

export const FormEditor = () => {
    const styles = useStyles()
    const { selectedFormForEditing, updateExistingForm } = useFormContext()
    return (
        <div className={styles.mainPanel}>
            {selectedFormForEditing ? (
                <>
                    <div className={styles.item}>
                        <FormGeneralInfo
                            model={selectedFormForEditing}
                            onSave={(n, d) => {
                                const updated = { ...selectedFormForEditing }
                                updated.description = d
                                updated.name = n
                                updateExistingForm(
                                    selectedFormForEditing.id,
                                    updated
                                )
                            }}
                        />
                    </div>
                    <div className={styles.item}>
                        <Divider appearance="strong" />
                    </div>
                    <div className={styles.item}>
                        <QuestionBuilder />
                    </div>
                    <div className={styles.item}>
                        <Divider appearance="strong" />
                    </div>
                    <div className={styles.item}>
                        {selectedFormForEditing && (
                            <FormQuestions
                                formFields={selectedFormForEditing?.formFields}
                            />
                        )}
                    </div>
                </>
            ) : (
                <div className={styles.item}>
                    <Subtitle1>Choose some formular</Subtitle1>
                </div>
            )}
        </div>
    )
}
