import * as React from 'react'
import {
    makeStyles,
    shorthands,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Button,
} from '@fluentui/react-components'
import { ValidationRule } from '../../validations/validations'
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    validationRectangle: {
        ...shorthands.padding('0.5rem'),
    },
})

interface QuestionValidationsCellProps {
    validations: ValidationRule[]
}

export const QuestionValidationsCell: React.FunctionComponent<
    QuestionValidationsCellProps
> = (props) => {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <div className={styles.validationRectangle}>
                <Button>+</Button>
            </div>
            {props.validations.map((validation, index) => (
                <div key={index} className={styles.validationRectangle}>
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <MenuButton>{validation.message}</MenuButton>
                        </MenuTrigger>

                        <MenuPopover>
                            <MenuList>
                                <MenuItem>Remove</MenuItem>
                                <MenuItem>Edit</MenuItem>
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                </div>
            ))}
        </div>
    )
}
