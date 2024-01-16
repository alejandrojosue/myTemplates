import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const DetailsReturn = ({ details = [] }) => {
    return (
        <TableContainer component={Paper} className="table">
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell"><b>Motivo</b></TableCell>
                        <TableCell className="tableCell"><b>Código</b></TableCell>
                        <TableCell className="tableCell"><b>Producto</b></TableCell>
                        <TableCell className="tableCell"><b>Cantidad</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {details.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="tableCell">{row.motivo}</TableCell>
                            <TableCell className="tableCell">{row.producto.codigo}</TableCell>
                            <TableCell className="tableCell">{row.producto.nombre}</TableCell>
                            <TableCell className="tableCell">{row.cantidad}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default DetailsReturn