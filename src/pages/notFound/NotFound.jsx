import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-4">404 Not Found</h1>
                <p className="lead p-2">
                    La página a la que desea acceder no se ha encontrado.
                </p>
                <Link to="/home" className="text-decoration-none btn btn-outline-primary m-1">
                    Regresar a Inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
