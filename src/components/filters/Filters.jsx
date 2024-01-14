import { Link } from "react-router-dom"
import exportPDFReport from "../../helpers/exportPDFReport"
import { CSVLink } from "react-csv"

const Filters = ({ title, pageSize = 0, data, handlePagination }) => {
    return <div className="col-12 col-sm-12 col-lg-7">
        <div className="col-12 col-sm-12 col-lg-12 mt-2 mt-2 pt-3">
            <div className="row">
                <div className="col-12 col-sm-6 col-lg-3 pt-1">
                    <button className="btn btn-outline-primary w-100"
                        onClick={() => handlePagination()}>Actualizar Tabla</button>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 pt-1">
                    <button className="btn btn-outline-danger w-100"
                        onClick={() => exportPDFReport(data, `Report_${title}`)}>Exportar PDF</button>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 pt-1">
                    <CSVLink
                        className="btn btn-outline-success  w-100 text-decoration-none"
                        data={data}
                        separator={";"}
                        filename={`Report_${title}.csv`}>
                        Exportar CSV
                    </CSVLink>
                </div>
                {
                    title !== 'products' &&
                    <div className="col-12 col-sm-6 col-lg-3 pt-1">
                        <Link to={`/${title}/new`} className="btn btn-outline-secondary  w-100 text-decoration-none">Crear Nueva</Link>
                    </div>
                }
            </div>
        </div>
    </div>
}

export default Filters