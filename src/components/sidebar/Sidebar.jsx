import './sidebar.scss'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Home from '@mui/icons-material/Home'


const Sidebar = () => (
    <div className="offcanvas offcanvas-start sidebar" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <ul className="navbar-nav flex-grow-1">
                <p className="title">PRINCIPAL</p>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <li>
                        <Home className="icon" />
                        <span>Inicio</span>
                    </li>
                </Link>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>Panel de Control</span>
                    </li>
                </Link>
                <div className="row line"></div>
                <p className="title">LISTAS</p>
                <Link to={'/products'} style={{ textDecoration: 'none' }}>
                    <li>
                        <QrCodeIcon className="icon" />
                        <span>Products</span>
                    </li>
                </Link>
                <Link to={'/sales'} style={{ textDecoration: 'none' }}>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Sales</span>
                    </li>
                </Link>
                <Link to={'/returns'} style={{ textDecoration: 'none' }}>
                    <li>
                        <AssignmentReturnIcon className="icon" />
                        <span>Devoluciones</span>
                    </li>
                </Link>
                <div className="row line"></div>
                <p className="title">REPORTES</p>
                <Link to="/reports" style={{ textDecoration: 'none' }}>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>Reportes</span>
                    </li>
                </Link>
                <div className="row line"></div>
                <p className="title">USUARIO</p>
                <Link to={'/single'} style={{ textDecoration: 'none' }}>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Perfil</span>
                    </li></Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span
                            onClick={() => sessionStorage.clear()}
                        >Cerrar Sesión</span>
                    </li>
                </Link>
            </ul>
        </div>
    </div>
)

export default Sidebar
