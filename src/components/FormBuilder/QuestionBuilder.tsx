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
import { TypeSelectorDropdown } from '../Common/TypeSelectorDropdown'
import { useNewQuestionContext } from '../../contexts/NewQuestionContext'
import { useState } from 'react'
import { InputType } from '../../model/form'
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
    const [isInputValid, setIsInputValid] = useState(false)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuestion(value)
        setIsInputValid(value.trim() !== '')
    }
    const submitClicked = () => {
        setIsInputValid(false)
        addQuestionToForm()
        setType(question.type)
    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Subtitle1>Add new question to form</Subtitle1>
            </div>
            <div className={styles.item}>
                <TypeSelectorDropdown
                    label="Question type"
                    options={Object.values(InputType) as string[]}
                    onChange={(v) => setType(v[0])}
                    value={question.type}
                />
            </div>
            <div className={styles.item}>
                <Label htmlFor={questionInput}>Question</Label>
                <Input
                    id={questionInput}
                    size="medium"
                    value={question.question}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.item}>
                <Button
                    icon={<Add48Regular />}
                    iconPosition="before"
                    onClick={submitClicked}
                    disabled={!isInputValid}
                >
                    Add field to form
                </Button>
            </div>
        </div>
    )
}
