import { makeStyles } from '@fluentui/react-components'
import { FormEditor } from './FormEditor'
import { FormBuilderSideMenu } from './FormBuilderSideMenu'
import { FormProvider } from '../../contexts/FormContext'

const useStyles = makeStyles({
    formBuilderContainer: {
        display: 'flex',
        height: '100vh',
    },
})

export const FormBuilder = () => {
    const styles = useStyles()

    return (
        <div className={styles.formBuilderContainer}>
            <FormProvider>
                <FormBuilderSideMenu />
                <FormEditor />
            </FormProvider>
        </div>
    )
}
