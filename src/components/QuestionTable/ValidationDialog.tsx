import * as React from 'react'
import {
    Dialog,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    makeStyles,
    Input,
    shorthands,
} from '@fluentui/react-components'
import { ValidationRule } from '../../validations/validations'
import { isValidationTypeNumeric } from '../../model/form'

interface ValidationDialogProps {
    visible: boolean
    onClose: () => void
    onConfirm: (updatedValidation: ValidationRule) => void
    validation: ValidationRule // The validation to be edited
}

const useStyles = makeStyles({
    confirmDialogButton: {
        backgroundColor: 'green',
    },
    valueInput: {
        minWidth: '200px',
        ...shorthands.margin('2rem'),
    },
})

export const ValidationDialog: React.FC<ValidationDialogProps> = (props) => {
    const styles = useStyles()
    const [editedValidation, setEditedValidation] =
        React.useState<ValidationRule>(
            props.validation // Initialize with the current validation data
        )

    const handleFieldChange = (field: keyof ValidationRule, value: any) => {
        setEditedValidation({
            ...editedValidation,
            [field]: value,
        })
    }

    const handleConfirm = () => {
        // Call the onConfirm callback with the updated validation
        props.onConfirm(editedValidation)
    }
    return (
        <Dialog open={props.visible}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>{props.validation.message}</DialogTitle>
                    <DialogContent>
                        <Input
                            className={styles.valueInput}
                            size="medium"
                            type={
                                isValidationTypeNumeric(editedValidation.type)
                                    ? 'number'
                                    : 'text'
                            }
                            placeholder={props.validation.type}
                            onChange={(e) => {
                                handleFieldChange(
                                    isValidationTypeNumeric(
                                        editedValidation.type
                                    )
                                        ? 'numericValue'
                                        : 'textValue',
                                    e.target.value
                                )
                            }}
                        />
                        <Input
                            className={styles.valueInput}
                            size="medium"
                            type="text"
                            placeholder="Validation message"
                            onChange={(e) => {
                                handleFieldChange('message', e.target.value)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button appearance="secondary" onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button
                            className={styles.confirmDialogButton}
                            appearance="primary"
                            onClick={handleConfirm}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}
