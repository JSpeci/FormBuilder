import * as React from 'react'
import { makeStyles, shorthands } from '@fluentui/react-components'
import { ValidationRule } from '../../validations/validations'
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    validationRectangle: {
        ...shorthands.padding('0.5rem'),
    },
})

interface QuestionValidationsCellProps {
    validations: ValidationRule[] // Pass the validation rules as a prop
}

export const QuestionValidationsCell: React.FunctionComponent<
    QuestionValidationsCellProps
> = (props) => {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            {props.validations.map((validation, index) => (
                <div key={index} className={styles.validationRectangle}>
                    {validation.message}
                </div>
            ))}
        </div>
    )
}
