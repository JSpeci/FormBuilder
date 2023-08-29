import React from 'react'
import {
    Divider,
    Title1,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import { QuestionBuilder } from './QuestionBuilder'
import { FormTool } from './FormTool'
import { useFormContext } from '../contexts/FormContext'

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
    const { selectedFormForEditing } = useFormContext()
    return (
        <div className={styles.mainPanel}>
            <div className={styles.item}>
                <Title1>Let's build some form</Title1>
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
                    <FormTool formFields={selectedFormForEditing?.formFields} />
                )}
            </div>
        </div>
    )
}
