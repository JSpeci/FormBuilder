import * as React from 'react'
import {
    Button,
    Input,
    Subtitle1,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import type { DropdownProps } from '@fluentui/react-components'
import { Dropdown, Option, useId } from '@fluentui/react-components'
import { InputType } from '../model/form'
import { Add48Regular } from '@fluentui/react-icons'
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
        minWidth: '17rem',
    },
})

export const QuestionBuilder: React.FunctionComponent = () => {
    const styles = useStyles()
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Subtitle1>Add new field to form</Subtitle1>
            </div>
            <div className={styles.item}>
                <FieldTypeSelector />
            </div>
            <div className={styles.item}>
                <Input placeholder="Field question" />
            </div>
            <div className={styles.item}>
                <p>Validations</p>
            </div>
            <div className={styles.item}>
                <Button
                    appearance="primary"
                    icon={<Add48Regular />}
                    iconPosition="before"
                >
                    Add field to form
                </Button>
            </div>
        </div>
    )
}

const dropDownStyles = makeStyles({
    root: {
        display: 'grid',
        gridTemplateRows: 'repeat(1fr)',
        justifyItems: 'start',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
    },
})

export const FieldTypeSelector = (props: Partial<DropdownProps>) => {
    const dropdownId = useId('dropdown-default')
    const options: string[] = Object.values(InputType) as string[]
    const styles = dropDownStyles()
    return (
        <div className={styles.root}>
            <label id={dropdownId}>Field type</label>
            <Dropdown
                aria-labelledby={dropdownId}
                placeholder="Select a field type"
                {...props}
            >
                {options.map((option) => (
                    <Option key={option}>{option}</Option>
                ))}
            </Dropdown>
        </div>
    )
}
