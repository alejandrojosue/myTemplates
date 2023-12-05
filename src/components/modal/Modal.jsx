import { useState } from "react"
import { userMapper } from "../../maper/mapper"

const Modal = ({ amount, rows, data, handleEndpoint }) => {
    const [customerID, setCustomerID] = useState('')
    const [customerRTN, setCustomerRTN] = useState('')
    const [customerName, setCustomerName] = useState('')
    return <>
        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button> */}
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Total a Pagar: L. {amount}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div>
                                <label className="col-form-label">RTN Cliente:</label>
                                <input type="text" required className="form-control"
                                    id="customer-id"
                                    maxLength={14}
                                    defaultValue={customerRTN}
                                    onChange={e => {
                                        setCustomerName('')
                                        if ((e.target.value).length === 14) {
                                            handleEndpoint(`users?populate=role&filters[role][name][$eq]=Clientes&filters[blocked]=false&filters[confirmed]=true&filters[RTN][$eq]=${(e.target.value).trim()}`)
                                            const customer = (data && data.length) ? userMapper(data) : null
                                            if (customer && customer[0].firstName) {
                                                setCustomerID(customer[0].id)
                                                setCustomerRTN(customer[0].rtn)
                                                setCustomerName(customer[0].firstName + ' ' + customer[0].lastName)
                                            } else setCustomerName('')
                                        }
                                    }} />
                                <input type="text" required value={customerName} disabled className="form-control mt-1" id="customer-name" placeholder="Nombre de Cliente" />
                            </div>
                            <div>
                                <label className="col-form-label">Método de Pago (L.):</label>
                                <select required
                                    className="form-select" id="payment-method"
                                    defaultValue="Efectivo"
                                    onChange={e => {
                                        if (e.target.value === 'Transferencia Bancaria') {
                                            document.getElementById('payment-money').value = amount
                                            document.querySelector('#payment-money').disabled = true
                                            document.getElementById('change-money').value = (0).toFixed(2)
                                        } else {
                                            document.querySelector('#payment-money').disabled = false
                                            document.getElementById('payment-money').value = (0).toFixed(2)
                                        }
                                    }}>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                                </select>
                            </div>
                            <div>
                                <label className="col-form-label">Cantidad Recibida (L.):</label>
                                <input type="number"
                                    step="0.01"
                                    defaultValue={0}
                                    min={amount} required className="form-control"
                                    id="payment-money"
                                    onChange={e => document.getElementById('change-money').value = (e.target.value - amount).toFixed(2)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Cantidad de Cambio (L.):</label>
                                <input type="number" disabled className="form-control" id="change-money" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-primary"
                                    onClick={() => {
                                        console.log('rows: ', rows)
                                        console.log('Customer ID: ', customerID)
                                    }}>Procesar Venta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Modal