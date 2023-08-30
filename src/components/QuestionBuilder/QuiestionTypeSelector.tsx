import {
    makeStyles,
    shorthands,
    Label,
    Dropdown,
    useId,
    Option,
} from '@fluentui/react-components'
import { InputType } from '../../model/form'

const dropDownStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
    },
})

interface QuestionTypeSelectorProps {
    onChange: (v: any) => void
}

export const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = (
    props
) => {
    const questionType = useId('questionType')
    const options: string[] = Object.values(InputType) as string[]
    const styles = dropDownStyles()
    return (
        <div className={styles.root}>
            <Label htmlFor={questionType}>Question type</Label>
            <Dropdown
                aria-labelledby={questionType}
                placeholder="Select a question type"
                defaultValue={options[0]}
                onOptionSelect={(ev: any, data: any) => {
                    props.onChange(data.selectedOptions)
                }}
            >
                {options.map((option) => (
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                ))}
            </Dropdown>
        </div>
    )
}
