import * as React from 'react'
import {
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridProps,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
    Button,
    TableColumnSizingOptions,
} from '@fluentui/react-components'

import { Delete28Regular } from '@fluentui/react-icons'
import { ValidationRule } from '../../validations/validations'
import { FormQuestion } from '../../model/form'
import { useFormContext } from '../../contexts/FormContext'
import { QuestionValidationsCell } from './QuestionValidationsCell'

type TypeCell = {
    label: string
}

type QuestionCell = {
    label: string
}

type ValidationsCell = {
    label: string
    validations: ValidationRule[]
}

type Item = {
    type: TypeCell
    question: QuestionCell
    validations: ValidationsCell
}

const columns: TableColumnDefinition<FormQuestion>[] = [
    createTableColumn<FormQuestion>({
        columnId: 'type',
        compare: (a, b) => {
            return a.type.localeCompare(b.type)
        },
        renderHeaderCell: () => {
            return 'Type'
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.type}</TableCellLayout>
        },
    }),
    createTableColumn<FormQuestion>({
        columnId: 'question',
        compare: (a, b) => {
            return a.question.localeCompare(b.question)
        },
        renderHeaderCell: () => {
            return 'Question'
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.question}</TableCellLayout>
        },
    }),
    createTableColumn<FormQuestion>({
        columnId: 'validations',
        renderHeaderCell: () => {
            return 'Validations'
        },
        renderCell: (item) => {
            return (
                <QuestionValidationsCell
                    questionId={item.questionId}
                    validations={item.validations || []}
                />
            )
        },
    }),
    createTableColumn<FormQuestion>({
        columnId: 'action',
        renderHeaderCell: () => {
            return ''
        },
        renderCell: (item) => {
            const { deleteQuestionFromSelectedForm } = useFormContext()
            return (
                <TableCellLayout style={{ textAlign: 'end' }}>
                    <Button
                        appearance="transparent"
                        onClick={() => {
                            deleteQuestionFromSelectedForm(item.questionId)
                        }}
                    >
                        <Delete28Regular />
                    </Button>
                </TableCellLayout>
            )
        },
    }),
]

interface QuestionsTableProps {
    items: FormQuestion[]
}

const columnSizingOptions: TableColumnSizingOptions = {
    action: {
        minWidth: 80,
        defaultWidth: 50,
    },
    type: {
        defaultWidth: 100,
        minWidth: 80,
        idealWidth: 80,
    },
    question: {
        defaultWidth: 300,
        minWidth: 200,
        idealWidth: 250,
    },
    validations: {
        defaultWidth: 700,
        minWidth: 600,
        idealWidth: 750,
    },
}

export const QuestionsTable: React.FC<QuestionsTableProps> = (props) => {
    const defaultSortState = React.useMemo<
        Parameters<NonNullable<DataGridProps['onSortChange']>>[1]
    >(() => ({ sortColumn: 'type', sortDirection: 'ascending' }), [])

    return (
        <DataGrid
            items={props.items}
            columns={columns}
            sortable
            defaultSortState={defaultSortState}
            resizableColumns
            columnSizingOptions={columnSizingOptions}
        >
            <DataGridHeader>
                <DataGridRow>
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>
                            {renderHeaderCell()}
                        </DataGridHeaderCell>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<Item>>
                {({ item, rowId }) => (
                    <DataGridRow<Item> key={rowId}>
                        {({ renderCell }) => (
                            <DataGridCell>{renderCell(item)}</DataGridCell>
                        )}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
    )
}
