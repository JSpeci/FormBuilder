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
import { useEffect, useState } from 'react'

interface ValidationDialogProps {
    visible: boolean
    onClose: () => void
    onConfirm: (updatedValidation: ValidationRule) => void
    validation: ValidationRule
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
        React.useState<ValidationRule>(props.validation)
    const [isInputValid, setIsInputValid] = useState(false)
    useEffect(() => {
        console.log(editedValidation.textValue === '')
        const isValid =
            editedValidation.message.trim() !== '' &&
            ((!isValidationTypeNumeric(editedValidation.type) &&
                editedValidation.textValue?.trim() !== '') ||
                (isValidationTypeNumeric(editedValidation.type) &&
                    editedValidation.numericValue !== undefined))
        setIsInputValid(isValid)
    }, [editedValidation])

    const handleFieldChange = (field: keyof ValidationRule, value: any) => {
        // Fix of strange behaviour of Fluent UI numeric input
        if (field === 'numericValue' && value === '') {
            value = undefined
        }
        setEditedValidation({
            ...editedValidation,
            [field]: value,
        })
    }
    const handleConfirm = () => {
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
                            value={String(
                                isValidationTypeNumeric(editedValidation.type)
                                    ? editedValidation.numericValue
                                    : editedValidation.textValue
                            )}
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
                            value={editedValidation.message}
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
                            disabled={!isInputValid}
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
