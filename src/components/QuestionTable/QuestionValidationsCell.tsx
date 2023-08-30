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
import { useState } from 'react'
import { useEditValidationContext } from '../../contexts/EditValidationContext'
import { ValidationDialog } from './ValidationDialog'
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

    const { validation, startEditingValidation } = useEditValidationContext()
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const handleEditClick = (validation: ValidationRule) => {
        startEditingValidation(validation, false)
        setIsEditDialogOpen(true)
    }

    const handleEditDialogConfirm = (updatedValidation: ValidationRule) => {
        // Apply the changes to your data or context state
        // Close the edit dialog
        console.log(updatedValidation)

        setIsEditDialogOpen(false)
    }

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
                                    <MenuItem
                                        onClick={() =>
                                            handleEditClick(validation)
                                        }
                                    >
                                        Edit
                                    </MenuItem>
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
            {isEditDialogOpen && validation && (
                <ValidationDialog
                    visible={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    onConfirm={handleEditDialogConfirm}
                    validation={validation}
                />
            )}
        </div>
    )
}
