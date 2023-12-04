const Modal = ({ amount }) =>
    <>
        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button> */}

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Total a Pagar: L. {amount}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="recipient-name" className="col-form-label">Cantidad Recibida (L.):</label>
                                <input type="number"
                                    step="0.01"
                                    defaultValue={0}
                                    min={amount} required className="form-control"
                                    id="recipient-name"
                                    onChange={e => {
                                        document.getElementById('message-text').value = (e.target.value - amount).toFixed(2)
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label for="message-text" className="col-form-label">Cantidad de Cambio (L.):</label>
                                <input type="number" disabled className="form-control" id="message-text" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-primary">Procesar Compra</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
export default Modal