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
import { ValidationRule, ValidationType } from '../../validations/validations'
import { Add16Regular } from '@fluentui/react-icons'
import { useFormContext } from '../../contexts/FormContext'
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
    const { deleteValidationFromSelectedForm } = useFormContext()

    return (
        <div className={styles.container}>
            <div className={styles.validationRectangle}>
                <Button>
                    <Add16Regular />
                </Button>
            </div>
            {props.validations.map((validation, index) => (
                <div key={index} className={styles.validationRectangle}>
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <MenuButton>{validation.message}</MenuButton>
                        </MenuTrigger>

                        <MenuPopover>
                            <MenuList>
                                {validation.type !==
                                    ValidationType.IsMandatory && (
                                    <MenuItem>Edit</MenuItem>
                                )}
                                <MenuItem
                                    onClick={() =>
                                        deleteValidationFromSelectedForm(
                                            validation.validationId
                                        )
                                    }
                                >
                                    Remove
                                </MenuItem>
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                </div>
            ))}
        </div>
    )
}
