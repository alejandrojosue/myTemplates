import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="#dashboard" style={{ textDecoration: "none" }}>
                    <span className="logo">Panel de Control</span>
                </Link>
            </div>
            <div className="center">
                <ul>
                    <p className="title">PRINCIPAL</p>
                    <Link to="#dashboard" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Tablero</span>
                        </li>
                    </Link>
                    <p className="title">LISTAS</p>

                    <Link to="#products" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span
                            >Inventario</span>
                        </li>
                    </Link>
                    <Link to="#invoices" style={{ textDecoration: "none" }}>
                        <li>
                            <CreditCardIcon className="icon" />
                            <span>Facturas</span>
                        </li>
                    </Link>
                    <Link to={"#returns"} style={{ textDecoration: "none" }}>
                        <li>
                            <AssignmentReturnIcon className="icon" />
                            <span>Devoluciones</span>
                        </li>
                    </Link>
                    <p className="title">REPORTES</p>
                    <Link to="#reports" style={{ textDecoration: "none" }}>
                        <li>
                            <InsertChartIcon className="icon" />
                            <span>Reportes</span>
                        </li>
                    </Link>
                    <p className="title">USUARIO</p>
                    <Link to={"#single"} style={{ textDecoration: "none" }}>
                        <li>
                            <AccountCircleOutlinedIcon className="icon" />
                            <span>Perfil</span>
                        </li></Link>
                    <Link to="#login" style={{ textDecoration: "none" }}>
                        <li>
                            <ExitToAppIcon className="icon" />
                            <span
                            >Cerrar Sesión</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
