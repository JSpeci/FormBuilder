import {
    CompoundButton,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import {
    Home48Regular,
    QuestionCircle48Regular,
    Form48Regular,
    AddSquare48Regular,
} from '@fluentui/react-icons'
import { useNavigate } from 'react-router-dom'
import { PublicRoutes } from '../infrastructure/routes'
import { generateSomeRandomForms } from '../infrastructure/generator'
import { FormModel } from '../model/form'
import { useFormContext } from '../contexts/FormContext'
import { DangerDialog } from './DangerDialog'
import { useState } from 'react'

const useStyles = makeStyles({
    leftMenu: {
        width: '20%',
        backgroundColor: '#f0f0f0',
        ...shorthands.padding('1rem'),
    },
    menuItem: {
        marginBottom: '0.5rem',
        cursor: 'pointer',
        width: '100%',
    },
})

export const FormSelector = () => {
    const styles = useStyles()
    const navigate = useNavigate()
    const { dangerouslyRewriteForms } = useFormContext()
    const generateSomeRandomFormsForLocalStorage = () => {
        dangerouslyRewriteForms(generateSomeRandomForms(7))
        setVisibleDialog(false)
    }
    const { forms, setFormForEditing } = useFormContext()
    const [visibleDialog, setVisibleDialog] = useState(false)

    console.log(forms)
    return (
        <div className={styles.leftMenu}>
            <DangerDialog
                visible={visibleDialog}
                onConfirm={generateSomeRandomFormsForLocalStorage}
                onClose={() => setVisibleDialog(false)}
            />

            <CompoundButton
                icon={<Home48Regular />}
                secondaryContent=""
                size="small"
                onClick={() => navigate(PublicRoutes.Home)}
                iconPosition="before"
                className={styles.menuItem}
            >
                Home page
            </CompoundButton>
            <CompoundButton
                icon={<AddSquare48Regular />}
                secondaryContent=""
                size="small"
                onClick={() => {}}
                iconPosition="before"
                className={styles.menuItem}
            >
                Create new form
            </CompoundButton>
            <CompoundButton
                icon={<QuestionCircle48Regular />}
                secondaryContent="Generates random forms"
                size="small"
                onClick={() => setVisibleDialog(true)}
                iconPosition="before"
                className={styles.menuItem}
            >
                Generate random stuff
            </CompoundButton>
            {forms.map((form: FormModel) => (
                <CompoundButton
                    icon={<Form48Regular />}
                    secondaryContent={form.description || ''}
                    size="small"
                    iconPosition="before"
                    className={styles.menuItem}
                    onClick={() => {
                        setFormForEditing(form)
                    }}
                    key={form.name}
                >
                    {form.name}
                </CompoundButton>
            ))}
        </div>
    )
}
