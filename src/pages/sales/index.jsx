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
import useFetch from '../../hooks/useFetch'
import { saleMapper, saleReportMapper } from '../../maper/mapper'
import Filters from '../../components/filters/Filters'
import Layout from '../../layout/Layout'

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
                <TableCell align="center" className="tableCell">{row.noInvoice}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.customerName}</TableCell>
                <TableCell className="tableCell">{row.sellerName}</TableCell>
                <TableCell align="center"><span className={`cellWithStatus ${row.status}`}>{row.status}</span></TableCell>
                <TableCell align="center" className="tableCell">{row.payMethod}</TableCell>
                <TableCell align="right" className="tableCell">
                    {((row.details.reduce((acc, { quantity, unitPrice, tax, discount }) =>
                        (acc + quantity * unitPrice * (1 + tax - discount)), 0))
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
                                    {row.details.map((detail) => (
                                        <TableRow key={detail.id}>
                                            <TableCell component="th" scope="row">{detail.productSku}</TableCell>
                                            <TableCell>{detail.productName}</TableCell>
                                            <TableCell align="right">
                                                {detail.quantity}
                                            </TableCell>
                                            <TableCell align="right">{detail.unitPrice.toFixed(2).replace('.', ',')}</TableCell>
                                            <TableCell align="center">{detail.discount * 100}%</TableCell>
                                            <TableCell align="center">{detail.tax * 100}%</TableCell>
                                            <TableCell align="right">
                                                {(detail.unitPrice * detail.quantity * (1 + detail.tax - detail.discount)).toFixed(2).replace('.', ',')}
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

const Index = () => {
    const prevEndpoint = 'ventas?populate=cliente,detalleVentas.producto,vendedor'
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(25)
    const { data, meta, loading, error, handleEndpoint } = useFetch(`${prevEndpoint}&pagination[pageSize]=${rowsPerPage}&pagination[page]=${(page + 1)}&sort=id:DESC`)
    useEffect(() => {
        handleEndpoint(`${prevEndpoint}&pagination[pageSize]=${rowsPerPage}&pagination[page]=${(page + 1)}&sort=id:DESC`)
    }, [page, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        // if (event.target.value === 'Todo')
        //     setRowsPerPage(meta.pagination.total)
        // else
        setRowsPerPage(event.target.value)
        setPage(0)
    }
    return (
        <Layout title={'Listado de Ventas'} loading={loading} error={error}>
            <Paper>
                <Filters
                    handlePage={setPage}
                    pageSize={rowsPerPage}
                    handleEndpoint={handleEndpoint}
                    data={data ? saleReportMapper(data) : []}
                    prevEndpoint={prevEndpoint}
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
                            {data ? saleMapper(data)?.map((row) => (
                                <Row key={row.id} row={row} />)) : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[25, 50, 100, 200, 500, 1000]}
                    component="div"
                    count={meta?.pagination?.total || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Layout>
    )
}
export default Index