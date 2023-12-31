import { makeStyles } from '@fluentui/react-components'
import { FormProvider } from '../../contexts/FormContext'
import { TestingSandbox } from './TestingSandbox'
import { FormTesterSideMenu } from './FormTesterSideMenu'

const useStyles = makeStyles({
    formBuilderContainer: {
        display: 'flex',
        height: '100vh',
    },
})

export const FormTester = () => {
    const styles = useStyles()

    return (
        <div className={styles.formBuilderContainer}>
            <FormProvider>
                <FormTesterSideMenu />
                <TestingSandbox />
            </FormProvider>
        </div>
    )
}
