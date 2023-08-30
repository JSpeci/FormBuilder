import * as React from 'react'
import {
    Button,
    Input,
    Label,
    Subtitle1,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import { useId } from '@fluentui/react-components'
import { Add48Regular } from '@fluentui/react-icons'
import { QuestionTypeSelector } from './QuiestionTypeSelector'
import { CreateValidationsForField } from './CreateValidationsForField'
import { useNewQuestionContext } from '../../contexts/NewQuestionContext'
const useStyles = makeStyles({
    container: {
        ...shorthands.padding('1rem'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
    },
    item: {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('2px'),
        minWidth: '400px',
    },
})

export const QuestionBuilder: React.FunctionComponent = () => {
    const styles = useStyles()
    const questionInput = useId('questionInput')
    const { setType, question, setQuestion, addQuestionToForm } =
        useNewQuestionContext()

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Subtitle1>Add new field to form</Subtitle1>
            </div>
            <div className={styles.item}>
                <QuestionTypeSelector onChange={(v) => setType(v[0])} />
            </div>
            <div className={styles.item}>
                <Label htmlFor={questionInput}>Question</Label>
                <Input
                    id={questionInput}
                    size="medium"
                    value={question.question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <CreateValidationsForField type={question.type} />
            </div>
            <div className={styles.item}>
                <Button
                    icon={<Add48Regular />}
                    iconPosition="before"
                    onClick={addQuestionToForm}
                >
                    Add field to form
                </Button>
            </div>
        </div>
    )
}
