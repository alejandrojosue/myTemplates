import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'


const Datatable = ({ columnsNames = [], rows = [] }) => {

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 220 }}>
                <Table stickyHeader aria-label="collapsible sticky table">
                    <TableHead>
                        <TableRow key={'tableHeaderRow'}>
                            {columnsNames.map(columnName => (
                                <TableCell key={columnName}
                                    align='center'
                                    className='fw-bold'>{columnName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={'tableBodyRow-' + index}>
                                {columnsNames.map(
                                    (columnName, indexCol) =>
                                        <TableCell
                                            align='center'
                                            key={`tableCell-${index}-${indexCol}`}>
                                            <span
                                                key={`tableCell-span-${index}-${indexCol}`}
                                                className={columnName.toUpperCase() === 'ESTADO' && `cellWithStatus ${row[columnName]}`}>
                                                {row[columnName]}
                                            </span>
                                        </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default Datatable