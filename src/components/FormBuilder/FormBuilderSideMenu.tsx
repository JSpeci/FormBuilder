import {
    CompoundButton,
    Divider,
    makeStyles,
    shorthands,
} from '@fluentui/react-components'
import {
    Home48Regular,
    QuestionCircle48Regular,
    AddSquare48Regular,
} from '@fluentui/react-icons'
import { useNavigate } from 'react-router-dom'
import { PublicRoutes } from '../../infrastructure/routes'
import { useFormContext } from '../../contexts/FormContext'
import { DangerDialog } from '../Common/DangerDialog'
import React, { useState } from 'react'
import { FormSelector } from '../Common/FormSelector'

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

export const FormBuilderSideMenu: React.FC = () => {
    const styles = useStyles()
    const navigate = useNavigate()
    const { createNewForm, dangerouslyRewriteForms, setFormForEditing } =
        useFormContext()
    const [visibleDialog, setVisibleDialog] = useState(false)

    return (
        <div className={styles.leftMenu}>
            <DangerDialog
                visible={visibleDialog}
                onConfirm={() => {
                    dangerouslyRewriteForms()
                    setVisibleDialog(false)
                }}
                onClose={() => setVisibleDialog(false)}
            />
            <CompoundButton
                icon={<Home48Regular />}
                secondaryContent=""
                size="small"
                onClick={() => navigate(PublicRoutes.Home)}
                className={styles.menuItem}
            >
                Home page
            </CompoundButton>
            <CompoundButton
                icon={<AddSquare48Regular />}
                secondaryContent=""
                size="small"
                onClick={() => {
                    createNewForm()
                }}
                className={styles.menuItem}
            >
                Create new form
            </CompoundButton>
            <CompoundButton
                icon={<QuestionCircle48Regular />}
                secondaryContent="Generates random forms to localStorage"
                size="small"
                onClick={() => setVisibleDialog(true)}
                className={styles.menuItem}
            >
                Generate random stuff
            </CompoundButton>
            <Divider className={styles.menuItem} appearance="strong" />
            <FormSelector onSelect={setFormForEditing} />
        </div>
    )
}
