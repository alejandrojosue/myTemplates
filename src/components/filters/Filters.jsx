import { Link } from "react-router-dom"
import exportPDFReport from "../../helpers/exportPDFReport"
import MuiDateRange from "../DateRange/MuiDateRange"
import { CSVLink } from 'react-csv'

const Filters = ({ title, prevEndpoint, handleEndpoint, handlePage, pageSize, data }) => {
    const handleDateRange = (selectedDateRange) => {
        if (!selectedDateRange) {
            handleEndpoint(`${prevEndpoint}&pagination[pageSize]=${pageSize}&pagination[page]=0&sort=id:DESC`)
        } else {
            const startDate = new Date(selectedDateRange[0]).setHours(0, 0, 0)
            const endDate = new Date(selectedDateRange[1]).setHours(23, 59, 59)
            handleEndpoint(`${prevEndpoint}&pagination[pageSize]=${pageSize}&pagination[page]=0&filters[$and][0][createdAt][$gte]=${new Date(startDate).toISOString()}&filters[$and][1][createdAt][$lte]=${new Date(endDate).toISOString()}&sort=id:DESC`)
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
                        handleEndpoint(`${prevEndpoint}&filters[$and][0][cliente][RTN][$contains]=${(e.target.value).trim()}&sort=noFactura:DESC&pagination[pageSize]=${pageSize}&pagination[page]=0`)
                    else handleEndpoint(`${prevEndpoint}&sort=id:DESC&pagination[pageSize]=${pageSize}&pagination[page]=1`)
                    handlePage(0)
                }}
                maxLength={14}
                placeholder="Ingrese RTN Cliente" />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
            <label className="form-label text-secondary w-100">Rango de Fecha:</label>
            <MuiDateRange onDateRangeChange={handleDateRange} />
        </div>
        <div className="col-12 col-sm-12 col-lg-6 pt-4 mt-1 d-flex justify-content-around flex-wrap">
            <button className="btn btn-outline-primary"
                onClick={() => handleEndpoint(`${prevEndpoint}&pagination[pageSize]=${pageSize}&pagination[page]=0&sort=id:DESC`)}>Actualizar Tabla</button>
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