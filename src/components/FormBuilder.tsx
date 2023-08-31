import { makeStyles } from '@fluentui/react-components'
import { FormEditor } from './FormEditor'
import { FormProvider } from '../contexts/FormContext'
import { FomBuilderSideMenu } from './FomBuilderSideMenu'

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
                <FomBuilderSideMenu />
                <FormEditor />
            </FormProvider>
        </div>
    )
}
