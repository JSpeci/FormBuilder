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
    Subtitle1,
} from '@fluentui/react-components'
import { ValidationRule, ValidationType } from '../../validations/validations'
import { isValidationTypeNumeric } from '../../model/form'
import { useEffect, useState } from 'react'
import { TypeSelectorDropdown } from '../TypeSelectorDropdown'

const useStyles = makeStyles({
    confirmDialogButton: {
        backgroundColor: 'green',
    },
    valueInput: {
        minWidth: '400px',
    },
    container: {
        ...shorthands.padding('1rem'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
    },
    item: {
        marginBottom: '1rem',
        minWidth: '400px',
    },
})

interface ValidationDialogProps {
    visible: boolean
    onClose: () => void
    onConfirm: (updatedValidation: ValidationRule) => void
    validation: ValidationRule
}

export const ValidationDetailDialog: React.FC<ValidationDialogProps> = (
    props
) => {
    const styles = useStyles()
    const [editedValidation, setEditedValidation] = useState<ValidationRule>(
        props.validation
    )
    const [isInputValid, setIsInputValid] = useState(false)
    const [validationMessage, setValidationMessage] = useState('')
    useEffect(() => {
        let isValid = true
        if (editedValidation.type !== ValidationType.IsMandatory) {
            isValid =
                editedValidation.message.trim() !== '' &&
                ((!isValidationTypeNumeric(editedValidation.type) &&
                    editedValidation.textValue?.trim() !== '') ||
                    (isValidationTypeNumeric(editedValidation.type) &&
                        editedValidation.numericValue !== undefined))
        }
        setIsInputValid(isValid)
        if (isValid) {
            setValidationMessage('')
        } else {
            setValidationMessage('No empty inputs please.')
        }
    }, [editedValidation])

    const handleFieldChange = (field: keyof ValidationRule, value: any) => {
        // Fix of strange behaviour of Fluent UI numeric input
        if (field === 'numericValue' && value === '') {
            value = undefined
        }
        if (field === 'type' && value === ValidationType.IsMandatory) {
            editedValidation.message = 'Answer is mandatory'
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
                        <div className={styles.container}>
                            <div className={styles.item}>
                                <TypeSelectorDropdown
                                    label="Validation type"
                                    options={
                                        Object.values(
                                            ValidationType
                                        ) as string[]
                                    }
                                    onChange={(v) =>
                                        handleFieldChange('type', v[0])
                                    }
                                    value={editedValidation.type}
                                />
                            </div>
                            {editedValidation.type !==
                                ValidationType.IsMandatory && (
                                <>
                                    <div className={styles.item}>
                                        <Input
                                            className={styles.valueInput}
                                            size="medium"
                                            value={String(
                                                isValidationTypeNumeric(
                                                    editedValidation.type
                                                )
                                                    ? editedValidation.numericValue
                                                    : editedValidation.textValue
                                            )}
                                            type={
                                                isValidationTypeNumeric(
                                                    editedValidation.type
                                                )
                                                    ? 'number'
                                                    : 'text'
                                            }
                                            placeholder={editedValidation.type}
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
                                    </div>
                                    <div className={styles.item}>
                                        <Input
                                            className={styles.valueInput}
                                            size="medium"
                                            type="text"
                                            value={editedValidation.message}
                                            placeholder="Validation message"
                                            onChange={(e) => {
                                                handleFieldChange(
                                                    'message',
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className={styles.item}>
                                        <Subtitle1>
                                            {validationMessage}
                                        </Subtitle1>
                                    </div>
                                </>
                            )}
                        </div>
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
