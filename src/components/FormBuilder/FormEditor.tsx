import React from 'react'
import {
    Divider,
    Subtitle1,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import { useFormContext } from '../../contexts/FormContext'
import { NewQuestionContextProvider } from '../../contexts/NewQuestionContext'
import { QuestionBuilder } from './QuestionBuilder'
import { FormQuestions } from './QuestionTable/FormQuestions'
import { FormGeneralInfo } from './FormGeneralInfo'

const useStyles = makeStyles({
    mainPanel: {
        width: '100%',
        ...shorthands.padding('1rem'),
        display: 'flex',
        flexDirection: 'column',
    },
    chooseSubtitle: {
        ...shorthands.padding('1rem'),
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
                    <Divider appearance="strong" />
                    <NewQuestionContextProvider>
                        <QuestionBuilder />
                    </NewQuestionContextProvider>

                    {selectedFormForEditing && (
                        <>
                            <Divider appearance="strong" />
                            <FormQuestions
                                formQuestions={
                                    selectedFormForEditing.formQuestions
                                }
                            />
                        </>
                    )}
                </>
            ) : (
                <div className={styles.chooseSubtitle}>
                    <Subtitle1>Choose some formular</Subtitle1>
                </div>
            )}
        </div>
    )
}
