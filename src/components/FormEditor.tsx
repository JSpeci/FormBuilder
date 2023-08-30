import React from 'react'
import {
    Divider,
    Subtitle1,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import { QuestionBuilder } from './QuestionBuilder/QuestionBuilder'
import { FormQuestions } from './FormQuestions'
import { useFormContext } from '../contexts/FormContext'
import { FormGeneralInfo } from './FormGeneralInfo'
import { NewQuestionContextProvider } from '../contexts/NewQuestionContext'

const useStyles = makeStyles({
    mainPanel: {
        width: '100%',
        ...shorthands.padding('1rem'),
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        marginBottom: '1rem',
        minWidth: '17rem',
        display: 'flex',
    },
})

export const FormEditor = () => {
    const styles = useStyles()
    const {
        selectedFormForEditing,
        updateExistingForm,
        deleteForm,
        setFormForEditing,
    } = useFormContext()

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
                            onDelete={(id: number) => {
                                deleteForm(id)
                                setFormForEditing(-1)
                            }}
                        />
                        <NewQuestionContextProvider>
                            <QuestionBuilder />
                        </NewQuestionContextProvider>
                    </div>
                    <div className={styles.item}>
                        <Divider appearance="strong" />
                    </div>
                    <div className={styles.item}>
                        {selectedFormForEditing && (
                            <FormQuestions
                                formQuestions={
                                    selectedFormForEditing.formQuestions
                                }
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
