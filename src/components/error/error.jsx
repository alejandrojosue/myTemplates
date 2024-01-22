// eslint-disable-next-line 
const ErrorComponent = ({ error, link = null }) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-4">{error || 'Error al cargar datos'}</h1>
                <p className="lead p-2">Hubo un problema al cargar la información.</p>
                <button className="btn btn-outline-info m-1" onClick={() => window.location.reload()}>
                    Recargar página
                </button>
                {link && <a className="text-decoration-none btn btn-outline-primary m-1" href={link}>
                    Regresar
                </a>}
            </div>
        </div>
    )
}
export default ErrorComponent