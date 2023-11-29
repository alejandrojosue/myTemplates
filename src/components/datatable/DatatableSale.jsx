import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TablePagination from '@mui/material/TablePagination';
import useFetch from '../../hooks/useFetch'
import { saleMapper } from '../../maper/mapper'
import { fetchDataFromAPI } from '../../util/api'

function Row(props) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center" className="tableCell">{row.noInvoice}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.customerName}</TableCell>
                <TableCell className="tableCell">{row.sellerName}</TableCell>
                <TableCell align="center" className="tableCell">{row.status}</TableCell>
                <TableCell align="center" className="tableCell">{row.payMethod}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalle de Venta
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Código</TableCell>
                                        <TableCell>Nombre Producto</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell align="right">Precio Unitario (L)</TableCell>
                                        <TableCell align="center">Descuento</TableCell>
                                        <TableCell align="center">ISV</TableCell>
                                        <TableCell align="right">Monto Total (L)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detail) => (
                                        <TableRow key={detail.id}>
                                            <TableCell component="th" scope="row">{detail.productSku}</TableCell>
                                            <TableCell>{detail.productName}</TableCell>
                                            <TableCell align="right">
                                                {detail.quantity}
                                            </TableCell>
                                            <TableCell align="right">{detail.unitPrice}</TableCell>
                                            <TableCell align="center">{detail.discount * 100}%</TableCell>
                                            <TableCell align="center">{detail.tax * 100}%</TableCell>
                                            <TableCell align="right">
                                                {(detail.unitPrice * detail.quantity * (1 + detail.tax - detail.discount)).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        noInvoice: PropTypes.number.isRequired,
        details: PropTypes.arrayOf(
            PropTypes.shape({
                quantity: PropTypes.number.isRequired,
                unitPrice: PropTypes.number.isRequired,
                discount: PropTypes.number.isRequired,
                tax: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
}

const DatatableSale = () => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [data, setData] = React.useState([])
    const [meta, setMeta] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        try {
            const fetching = async () => {
                setLoading(true)
                const { data, meta } = await fetchDataFromAPI(`ventas?populate=cliente,detalleVentas.producto,vendedor&pagination[pageSize]=${rowsPerPage}&pagination[page]=${(page + 1)}`);
                setData(data)
                setMeta(meta)
                setLoading(false)
            }
            fetching()
        } catch (error) { }
    }, [page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    if (loading) return (<>Cargando...</>)
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="collapsible sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="center">No. Factura</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Nombre Cliente</TableCell>
                            <TableCell>Nombre Vendedor</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Método de Pago</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {saleMapper(data).map((row) => (
                            <Row key={row.id} row={row} />))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[1, 10, 25, 100]}
                component="div"
                count={meta?.pagination?.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
export default DatatableSale