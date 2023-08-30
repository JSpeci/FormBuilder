import { CompoundButton, makeStyles } from '@fluentui/react-components'
import { Form48Regular } from '@fluentui/react-icons'
import { FormModel } from '../model/form'
import { useFormContext } from '../contexts/FormContext'

const useStyles = makeStyles({
    menuItem: {
        marginBottom: '0.5rem',
        cursor: 'pointer',
        width: '100%',
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
})

export const FormSelector = () => {
    const styles = useStyles()
    const { forms, setFormForEditing } = useFormContext()

    return (
        <>
            {forms.map((form: FormModel) => (
                <CompoundButton
                    icon={<Form48Regular />}
                    secondaryContent={form.description || ''}
                    size="small"
                    className={styles.menuItem}
                    onClick={() => {
                        setFormForEditing(form.id)
                    }}
                    key={form.id}
                >
                    {form.name}
                </CompoundButton>
            ))}
        </>
    )
}
