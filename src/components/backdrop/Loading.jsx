import React from 'react';

const Loading = () => (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
            <h1 className="display-4 mb-3">Cargando...</h1>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="lead p-2 mt-3">Estamos preparando todo para ti</p>
            <small className="text-muted">¡Gracias por tu paciencia!</small>
        </div>
    </div>
);

export default Loading;
