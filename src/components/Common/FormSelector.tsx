import { CompoundButton, makeStyles } from '@fluentui/react-components'
import { Form48Regular } from '@fluentui/react-icons'
import { FormModel } from '../../model/form'
import { useFormContext } from '../../contexts/FormContext'

const useStyles = makeStyles({
    menuItem: {
        marginBottom: '0.5rem',
        cursor: 'pointer',
        width: '100%',
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
})

interface FormSelectorProps {
    onSelect: (formId: string) => void
}

export const FormSelector: React.FC<FormSelectorProps> = (props) => {
    const styles = useStyles()
    const { forms } = useFormContext()

    return (
        <>
            {forms.map((form: FormModel) => (
                <CompoundButton
                    icon={<Form48Regular />}
                    secondaryContent={form.description || ''}
                    size="small"
                    className={styles.menuItem}
                    onClick={() => {
                        props.onSelect(form.id)
                    }}
                    key={form.id}
                >
                    {form.name}
                </CompoundButton>
            ))}
        </>
    )
}
