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
    Label,
    useId,
    Subtitle2,
} from '@fluentui/react-components'
import { ValidationRule, ValidationType } from '../../validations/validations'
import {
    isValidationOnlyOneInQuestion,
    isValidationTypeNumeric,
} from '../../model/form'
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
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
        minWidth: '400px',
    },
})

interface ValidationDialogProps {
    visible: boolean
    onClose: () => void
    onConfirm: (updatedValidation: ValidationRule) => void
    validation: ValidationRule
    isEditing?: boolean
}

export const ValidationDetailDialog: React.FC<ValidationDialogProps> = (
    props
) => {
    const styles = useStyles()
    const labelId = useId('typeLabel')
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

    const generateMessage = () => {
        const message = `${editedValidation.type} ${
            isValidationTypeNumeric(editedValidation.type)
                ? editedValidation.numericValue
                : editedValidation.textValue
        }`

        setEditedValidation({
            ...editedValidation,
            message,
        })
    }
    return (
        <Dialog open={props.visible}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        {!props.isEditing ? 'Create new ' : 'Edit '} validation
                    </DialogTitle>
                    <DialogContent>
                        <div className={styles.container}>
                            {!props.isEditing && (
                                <>
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
                                    {isValidationOnlyOneInQuestion(
                                        editedValidation.type
                                    ) && (
                                        <div className={styles.item}>
                                            <Subtitle2>
                                                This type of validation is
                                                singleton on question, if the
                                                same type exists on the
                                                question, this validation will
                                                replace it.
                                            </Subtitle2>
                                        </div>
                                    )}
                                </>
                            )}

                            {editedValidation.type !==
                                ValidationType.IsMandatory && (
                                <>
                                    <div className={styles.item}>
                                        <Label htmlFor={labelId}>
                                            {editedValidation.type}
                                        </Label>
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
                                        <Label htmlFor={labelId}>
                                            Validation Message if answer is not
                                            valid
                                        </Label>
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
                                        <Subtitle2>
                                            {validationMessage}
                                        </Subtitle2>
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
                            appearance="secondary"
                            onClick={generateMessage}
                        >
                            Generate message
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
