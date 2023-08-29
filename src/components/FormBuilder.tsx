import * as React from 'react'
import {
    Divider,
    makeStyles,
    shorthands,
    Subtitle1,
    Title1,
} from '@fluentui/react-components'
import type { DropdownProps } from '@fluentui/react-components'
import { Dropdown, Option, useId } from '@fluentui/react-components'
import { InputType } from '../model/form'
const useStyles = makeStyles({
    container: {
        ...shorthands.margin('5rem'),
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

export const FormBuilder: React.FunctionComponent = () => {
    const styles = useStyles()
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Title1>Let's build some form</Title1>
            </div>
            <div className={styles.item}>
                <Divider appearance="strong" />
            </div>
            <div className={styles.item}>
                <Subtitle1>Add a form fields here!</Subtitle1>
            </div>
            <div className={styles.item}>
                <FieldTypeSelector />
            </div>
        </div>
    )
}

const dropDownStyles = makeStyles({
    root: {
        // Stack the label above the field with a gap
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
