import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// eslint-disable-next-line 
const Datatable = ({ columnsNames = [], rows = [], headersColumn = []}) => {
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 220 }}>
                <Table stickyHeader aria-label="collapsible sticky table">
                    <TableHead>
                        <TableRow key={'tableHeaderRow'}>
                            {columnsNames.map((columnName) => (
                                <TableCell key={columnName}
                                    align='center'
                                    className='fw-bold'>{columnName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={'tableBodyRow-' + index}>
                                {headersColumn.map(
                                    (headerColumn, indexCol) =>
                                        <TableCell
                                            align='center'
                                            key={`tableCell-${index}-${indexCol}`}>
                                            <span
                                                key={`tableCell-span-${index}-${indexCol}`}
                                                className={headerColumn.toUpperCase() === 'ESTADO' && `cellWithStatus ${row[headerColumn]}`}>
                                                {row[headerColumn]}
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