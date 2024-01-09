import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRouted = () => {
    return sessionStorage.getItem('daiswadod') ? <Outlet /> : <Navigate to="/login" />
}
export default ProtectedRouted