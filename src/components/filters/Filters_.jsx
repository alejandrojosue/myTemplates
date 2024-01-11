import { Link } from "react-router-dom"
import exportPDFReport from "../../helpers/exportPDFReport"
import MuiDateRange from "../DateRange/MuiDateRange"
import { CSVLink } from 'react-csv'

const Filters = ({ title, handlePage, pageSize, data, handlePagination, handleDateRange, handleCustomer }) => {
    const _handleDateRange = (selectedDateRange) => {
        if (!selectedDateRange) {
            handlePagination()
        } else {
            handleDateRange(selectedDateRange[0].toString(), selectedDateRange[1].toString())
        }
    }

    return <div className="row px-3 pt-2">
        <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label text-secondary">RTN Cliente:</label>
            <input type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => {
                    if ((e.target.value).trim() !== '')
                        handleCustomer((e.target.value).trim())
                    else handlePagination()
                    handlePage(0)
                }}
                maxLength={14}
                placeholder="Ingrese RTN Cliente" />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label text-secondary w-100">Rango de Fecha:</label>
            <MuiDateRange onDateRangeChange={_handleDateRange} />
        </div>
        <div className="col-12 col-sm-12 col-lg-6 pt-4 mt-1 d-flex justify-content-around flex-wrap">
            <button className="btn btn-outline-primary"
                onClick={() => handlePagination()}>Actualizar Tabla</button>
            <button className="btn btn-outline-danger"
                onClick={() => exportPDFReport(data, 'Reporte_Ventas')}>Exportar PDF</button>
            <CSVLink
                className="btn btn-outline-success text-decoration-none"
                data={data}
                separator={";"}
                filename={`Reporte_Ventas.csv`}>
                Exportar CSV
            </CSVLink>
            <Link to={`/${title}/new`} className="btn btn-outline-secondary text-decoration-none">Crear Nueva</Link>
        </div>
    </div>
}

export default Filters