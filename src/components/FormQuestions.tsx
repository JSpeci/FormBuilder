import React from 'react'
import { Subtitle1, makeStyles, shorthands } from '@fluentui/react-components'
import { FormQuestion } from '../model/form'
import { QuestionsTable } from './QuestionsTable'

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

export interface FormToolProps {
    formQuestions: FormQuestion[]
}

export const FormQuestions: React.FunctionComponent<FormToolProps> = (
    props: FormToolProps
) => {
    const styles = useStyles()
    return (
        <div className={styles.mainPanel}>
            <div className={styles.item}>
                <Subtitle1>Questions in form</Subtitle1>
            </div>
            <div className={styles.item}>
                <QuestionsTable items={props.formQuestions} />
            </div>
        </div>
    )
}
