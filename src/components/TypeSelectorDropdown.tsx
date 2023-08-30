import {
    makeStyles,
    shorthands,
    Label,
    Dropdown,
    useId,
    Option,
} from '@fluentui/react-components'

const dropDownStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
    },
})

interface TypeSelectorDropdownProps {
    onChange: (v: any) => void
    options: string[]
    label: string
    value: string
}

export const TypeSelectorDropdown: React.FC<TypeSelectorDropdownProps> = (
    props
) => {
    const labelId = useId('dropdownLabel')
    const styles = dropDownStyles()
    return (
        <div className={styles.root}>
            <Label htmlFor={labelId}>{props.label}</Label>
            <Dropdown
                aria-labelledby={labelId}
                value={props.value}
                onOptionSelect={(ev: any, data: any) => {
                    props.onChange(data.selectedOptions)
                }}
            >
                {props.options.map((option) => (
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                ))}
            </Dropdown>
        </div>
    )
}
