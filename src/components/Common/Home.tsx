import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { CompoundButton, makeStyles } from '@fluentui/react-components'
import { AddSquare48Regular, Dentist48Regular } from '@fluentui/react-icons'
import { PublicRoutes } from '../../infrastructure/routes'

const useStyles = makeStyles({
    homeStack: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    item: {
        marginBottom: '1rem',
        minWidth: '17rem',
    },
    navContainer: {
        width: '100%',
        marginTop: '5rem',
    },
})

export const Home: React.FunctionComponent = () => {
    const navigate = useNavigate()
    const styles = useStyles()

    return (
        <nav className={styles.navContainer}>
            <div className={styles.homeStack}>
                <CompoundButton
                    icon={<AddSquare48Regular />}
                    secondaryContent="Lets build some awesome form"
                    size="large"
                    onClick={() => navigate(PublicRoutes.FormBuilder)}
                    iconPosition="before"
                    className={styles.item}
                >
                    Form Builder
                </CompoundButton>
                <CompoundButton
                    icon={<Dentist48Regular />}
                    secondaryContent="Lets test some amazing form"
                    size="large"
                    iconPosition="before"
                    onClick={() => navigate(PublicRoutes.FormTester)}
                    className={styles.item}
                >
                    Form Tester
                </CompoundButton>
            </div>
        </nav>
    )
}
