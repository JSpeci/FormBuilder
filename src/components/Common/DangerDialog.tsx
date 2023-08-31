import * as React from 'react'
import {
    Dialog,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    makeStyles,
} from '@fluentui/react-components'

interface DangerDialogProps {
    onConfirm: () => void
    onClose: () => void
    visible: boolean
}

const useStyles = makeStyles({
    confirmDialogButton: {
        backgroundColor: 'red',
    },
})

export const DangerDialog: React.FC<DangerDialogProps> = (props) => {
    const styles = useStyles()
    return (
        <Dialog open={props.visible}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Danger ZONE</DialogTitle>
                    <DialogContent>
                        Hey! This is a danger action for developer purpose. If
                        you Accept it, this removes all state of application and
                        generates some random stuff
                    </DialogContent>
                    <DialogActions>
                        <Button appearance="secondary" onClick={props.onClose}>
                            Close
                        </Button>
                        <Button
                            className={styles.confirmDialogButton}
                            appearance="primary"
                            onClick={props.onConfirm}
                        >
                            Do the magic
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}
