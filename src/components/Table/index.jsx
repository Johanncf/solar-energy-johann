import TableButton from "../TableButton"
import { TableContainer, TableTitle, Td, Th, Tr, UnitsTable } from "./styled.elements"

export default function Table({
    title,
    columns,
    data,
    functions,
}) {
    return (
        <TableContainer>
            <TableTitle>{title}</TableTitle>
            <UnitsTable>
                <thead>
                    <Tr>
                        {
                            columns.map((column, index) => {
                                return (
                                    <Th key={`col_${index}`}>{column}</Th>
                                )
                            })
                        }
                    </Tr>
                </thead>
                <tbody>
                    {
                        data && data.map((item, index) => {
                            return (
                                <Tr key={`produto_${index}`}>
                                    {
                                        columns.map((colName, index) => {
                                            if (colName === 'id') return (
                                                <Td key={`produto_${item}_col${colName}`}>
                                                    {
                                                        (item[colName]).toString().slice(0, 4)
                                                    }
                                                </Td>
                                            )

                                            if (!colName && index === (columns.length - 1)) return (
                                                <Td key={`remove_button${index}`}>
                                                    <TableButton action="remove" row={item["id"]} onclick={functions}>Remover</TableButton>
                                                </Td>
                                            )
                                            if (!colName) return (
                                                <Td key={`remove_button${index}`}>
                                                    <TableButton action="edit" row={item["id"]} onclick={functions}>Editar</TableButton>
                                                </Td>
                                            )
                                            return (
                                                <Td key={`produto_${item}_col${colName}`}>
                                                    {
                                                        item[colName]
                                                    }
                                                </Td>
                                            )
                                        })
                                    }
                                </Tr>
                            )
                        })
                    }
                </tbody>
            </UnitsTable>
        </TableContainer>
    )
}