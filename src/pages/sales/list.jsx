import { useState, useEffect } from 'react'
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
import Layout from '../../layout/Layout'
import useSaleServices from '../../hooks/useSaleServices'
import Filters from '../../components/filters/Filters_'
import { salesReportMapper } from '../../maper/mapper'
function Row(props) {
    const { row } = props
    const [open, setOpen] = useState(false)

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
                <TableCell align="center" className="tableCell">{row.noFactura}</TableCell>
                <TableCell className="tableCell">{row.fecha}</TableCell>
                <TableCell className="tableCell">{`${row.cliente.firstName} ${row.cliente.lastName}`}</TableCell>
                <TableCell className="tableCell">{`${row.vendedor.firstName} ${row.vendedor.lastName}`}</TableCell>
                <TableCell align="center"><span className={`cellWithStatus ${row.estado}`}>{row.estado}</span></TableCell>
                <TableCell align="center" className="tableCell">{row.metodoPago}</TableCell>
                <TableCell align="right" className="tableCell">
                    {((row.detalleVentas.reduce((acc, { cantidad, precio, isv, descuento }) =>
                        (acc + cantidad * precio * (1 + isv - descuento)), 0))
                        .toFixed(2))
                        .replace('.', ',')}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography className='fw-bold text-secondary' variant="h6" gutterBottom component="div">
                                Detalle de Venta
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='fw-bold'>Código</TableCell>
                                        <TableCell className='fw-bold'>Nombre Producto</TableCell>
                                        <TableCell className='fw-bold' align="right">Cantidad</TableCell>
                                        <TableCell className='fw-bold' align="right">Precio Unitario</TableCell>
                                        <TableCell className='fw-bold' align="center">Descuento</TableCell>
                                        <TableCell className='fw-bold' align="center">ISV</TableCell>
                                        <TableCell className='fw-bold' align="right">SubTotal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.detalleVentas.map((detail) => (
                                        <TableRow key={detail.id}>
                                            <TableCell component="th" scope="row">{detail.producto.codigo}</TableCell>
                                            <TableCell>{detail.producto.nombre}</TableCell>
                                            <TableCell align="right">
                                                {detail.quantity}
                                            </TableCell>
                                            <TableCell align="right">{detail.precio.toFixed(2).replace('.', ',')}</TableCell>
                                            <TableCell align="center">{detail.descuento * 100}%</TableCell>
                                            <TableCell align="center">{detail.isv * 100}%</TableCell>
                                            <TableCell align="right">
                                                {(detail.precio * detail.cantidad * (1 + detail.isv - detail.descuento)).toFixed(2).replace('.', ',')}
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
        fecha: PropTypes.string.isRequired,
        noFactura: PropTypes.number.isRequired,
        detalleVentas: PropTypes.arrayOf(
            PropTypes.shape({
                cantidad: PropTypes.number.isRequired,
                precio: PropTypes.number.isRequired,
                descuento: PropTypes.number.isRequired,
                isv: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
}

const List = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(100)
    const {
        sales, loading, error, total,
        getByPagination, getByDateRange, getByRTNCustomer
    } = useSaleServices()

    useEffect(() => {
        getByPagination(rowsPerPage, page + 1)
    }, [page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }
    return (
        <Layout title={'Listado de Ventas'} loading={loading} error={error}>
            <Paper>
                <Filters
                    handlePagination={getByPagination}
                    handlePage={setPage}
                    handleDateRange={getByDateRange}
                    pageSize={rowsPerPage}
                    data={sales ? salesReportMapper(sales) : []}
                    handleCustomer={getByRTNCustomer}
                    title={'sales'}
                />
                <TableContainer sx={{ maxHeight: 300 }}>
                    <Table stickyHeader aria-label="collapsible sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell
                                    className='fw-bold' align="center">No. Factura</TableCell>
                                <TableCell
                                    className='fw-bold'>Fecha</TableCell>
                                <TableCell
                                    className='fw-bold'>Nombre Cliente</TableCell>
                                <TableCell
                                    className='fw-bold'>Nombre Vendedor</TableCell>
                                <TableCell
                                    className='fw-bold' align="center">Estado</TableCell>
                                <TableCell className='fw-bold' align="center">Método de Pago</TableCell>
                                <TableCell
                                    className='fw-bold' align="right">Monto Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sales.length ? sales.map((row) => (
                                <Row key={row.id} row={row} />)) : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[25, 50, 100, 200, 500, 1000]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Layout>
    )
}
export default List