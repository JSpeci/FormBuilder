import * as React from 'react'
import {
    Button,
    CompoundButton,
    Input,
    Label,
    Subtitle1,
    Subtitle2,
    Textarea,
    makeStyles,
    shorthands,
    useId,
} from '@fluentui/react-components'
import { Delete28Regular } from '@fluentui/react-icons'
import { FormModel } from '../../model/form'
import { useEffect, useState } from 'react'
import { formatDateTime } from '../../infrastructure/helpers'

const useStyles = makeStyles({
    mainPanel: {
        width: '100%',
        ...shorthands.padding('1rem'),
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        marginBottom: '1rem',
        minWidth: '17rem',
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('2px'),
        maxWidth: '400px',
    },
})

interface FormDetailProps {
    model: FormModel
    onSave: (name: string, description: string) => void
    onDelete: (id: number) => void
}

export const FormGeneralInfo: React.FunctionComponent<FormDetailProps> = (
    props
) => {
    const styles = useStyles()
    const nameInput = useId('nameInput')
    const descriptionInput = useId('descriptionInput')
    const { model } = props

    const [name, setName] = useState(model.name)
    const [description, setDescription] = useState(model.description)
    const [isInputValid, setIsInputValid] = useState(false)

    useEffect(() => {
        setName(model.name)
        setDescription(model.description || '')
    }, [model])

    useEffect(() => {
        setIsInputValid(name.trim() !== '')
    }, [name, description])

    return (
        <div className={styles.mainPanel}>
            <div className={styles.item}>
                <Subtitle1>Form detail</Subtitle1>
            </div>
            <div className={styles.item}>
                <Label htmlFor={nameInput}>Form name</Label>
                <Input
                    id={nameInput}
                    size="medium"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <Label htmlFor={descriptionInput}>Description</Label>
                <Textarea
                    id={descriptionInput}
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <Subtitle2>
                    Created at {formatDateTime(new Date(model.created))}
                </Subtitle2>
            </div>
            <div className={styles.item}>
                <Subtitle2>With id {model.id}</Subtitle2>
            </div>
            <div className={styles.item}>
                <Button
                    disabled={!isInputValid}
                    onClick={() => props.onSave(name, description || '')}
                >
                    Save Changes
                </Button>
            </div>
            <div className={styles.item}>
                <CompoundButton
                    icon={<Delete28Regular />}
                    secondaryContent="Assure yourself to do it"
                    size="small"
                    onClick={() => {
                        props.onDelete(model.id)
                    }}
                >
                    Delete this form
                </CompoundButton>
            </div>
        </div>
    )
}
