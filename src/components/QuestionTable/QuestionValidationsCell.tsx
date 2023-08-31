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
import { ValidationDetailDialog } from './ValidationDetailDialog'
import { generateId } from '../../infrastructure/generateId'
import { InputType, inputTypesPossibleValidationTypes } from '../../model/form'
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
    },
    validationRectangle: {
        ...shorthands.padding('0.5rem'),
    },
})

interface QuestionValidationsCellProps {
    questionId: number
    inputType: InputType
    validations: ValidationRule[]
}

export const QuestionValidationsCell: React.FunctionComponent<
    QuestionValidationsCellProps
> = (props) => {
    const styles = useStyles()
    const { deleteValidationFromSelectedForm } = useFormContext()

    const {
        validation,
        startEditingValidation,
        isNewValidation,
        stopEditingValidation,
    } = useEditValidationContext()
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const handleEditClick = (validation: ValidationRule) => {
        startEditingValidation(validation, false)
        setIsEditDialogOpen(true)
    }
    const { editValidationInSelectedForm, addValidationToSelectedForm } =
        useFormContext()

    const handleEditDialogConfirm = (validation: ValidationRule) => {
        if (isNewValidation) {
            addValidationToSelectedForm(props.questionId, validation)
        } else {
            editValidationInSelectedForm(props.questionId, validation)
        }
        setIsEditDialogOpen(false)
        stopEditingValidation()
    }

    const handleCreateNewValidation = () => {
        const newValidation: ValidationRule = {
            type: ValidationType.IsMandatory,
            message: 'Answer is mandatory',
            validationId: generateId(),
            numericValue: undefined,
            textValue: '',
        }
        startEditingValidation(newValidation, true)
        setIsEditDialogOpen(true)
    }

    return (
        <div className={styles.container}>
            <div className={styles.validationRectangle}>
                <Button onClick={handleCreateNewValidation}>
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
                <ValidationDetailDialog
                    visible={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    onConfirm={handleEditDialogConfirm}
                    validation={validation}
                    isEditing={!isNewValidation}
                    possibleValidationTypes={inputTypesPossibleValidationTypes(
                        props.inputType
                    )}
                />
            )}
        </div>
    )
}
