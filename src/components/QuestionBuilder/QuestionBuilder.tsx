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
import { useState } from 'react'
import { QuestionTypeSelector } from './QuiestionTypeSelector'
import { CreateValidationForField } from './QuestionValidationsSelector'
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
    const [question, setQuestion] = useState('')
    const [type, setType] = useState(InputType.Text)

    // bad solution, but I was stuck and did not waste time
    const convertStringToInputType = (s: string) => {
        switch (s) {
            case 'Yes or No':
                return InputType.YesNo
            case 'Text':
                return InputType.Text
            case 'Numeric':
                return InputType.Numeric
        }
        return InputType.YesNo
    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Subtitle1>Add new field to form</Subtitle1>
            </div>
            <div className={styles.item}>
                <QuestionTypeSelector
                    onChange={(v) => setType(convertStringToInputType(v[0]))}
                />
            </div>
            <div className={styles.item}>
                <Label htmlFor={questionInput}>Question</Label>
                <Input
                    id={questionInput}
                    size="medium"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <CreateValidationForField type={type} />
            </div>
            <div className={styles.item}>
                <Button icon={<Add48Regular />} iconPosition="before">
                    Add field to form
                </Button>
            </div>
        </div>
    )
}
