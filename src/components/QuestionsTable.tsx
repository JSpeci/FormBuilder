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
} from '@fluentui/react-components'

import { Delete28Regular } from '@fluentui/react-icons'
import { ValidationRule } from '../validations/validations'
import { FormQuestion } from '../model/form'
import { useFormContext } from '../contexts/FormContext'

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
            return item.validations?.length
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
                <TableCellLayout>
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
