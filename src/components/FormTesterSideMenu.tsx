import {
    CompoundButton,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import { Home48Regular } from '@fluentui/react-icons'
import { useNavigate } from 'react-router-dom'
import { PublicRoutes } from '../infrastructure/routes'
import React from 'react'
import { FormSelector } from './FormSelector'
import { useFormContext } from '../contexts/FormContext'

const useStyles = makeStyles({
    leftMenu: {
        width: '20%',
        minWidth: '13rem',
        backgroundColor: '#f0f0f0',
        ...shorthands.padding('1rem'),
    },
    menuItem: {
        marginBottom: '0.5rem',
        cursor: 'pointer',
        width: '100%',
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
})

export const FormTesterSideMenu: React.FC = () => {
    const styles = useStyles()
    const navigate = useNavigate()
    const { setFormForTesting } = useFormContext()
    return (
        <div className={styles.leftMenu}>
            <CompoundButton
                icon={<Home48Regular />}
                secondaryContent=""
                size="small"
                onClick={() => navigate(PublicRoutes.Home)}
                className={styles.menuItem}
            >
                Home page
            </CompoundButton>
            <FormSelector onSelect={setFormForTesting} />
        </div>
    )
}
