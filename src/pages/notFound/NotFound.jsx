const Unauthorized = () => {
    return <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
            <h1 className="display-4">Not Found</h1>
            <p className="lead p-2">La página a la que desea acceder no se ha encontrado!</p>
            <a className="text-decoration-none btn btn-outline-primary m-1" href="/home">
                Regresar a Inicio
            </a>
        </div>
    </div>
}
export default Unauthorized