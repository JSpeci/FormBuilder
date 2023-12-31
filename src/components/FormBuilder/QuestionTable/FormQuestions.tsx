import React from 'react'
import { Subtitle1, makeStyles, shorthands } from '@fluentui/react-components'
import { FormQuestion } from '../../../model/form'
import { QuestionsTable } from './QuestionsTable'
import { EditValidationContextProvider } from '../../../contexts/EditValidationContext'

const useStyles = makeStyles({
    questions: {
        width: '80%',
        ...shorthands.padding('1rem'),
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        marginBottom: '1rem',
    },
})

export interface FormToolProps {
    formQuestions: FormQuestion[]
}

export const FormQuestions: React.FunctionComponent<FormToolProps> = (
    props: FormToolProps
) => {
    const styles = useStyles()
    return (
        <div className={styles.questions}>
            <div className={styles.item}>
                <Subtitle1>Questions in form</Subtitle1>
            </div>
            <div className={styles.item}>
                <EditValidationContextProvider>
                    <QuestionsTable items={props.formQuestions} />
                </EditValidationContextProvider>
            </div>
        </div>
    )
}
