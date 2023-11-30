import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";


const Sidebar = () => (
    <>
        <div className="offcanvas offcanvas-start sidebar" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <ul className="navbar-nav flex-grow-1">
                    <p className="title">PRINCIPAL</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Index</span>
                        </li>
                    </Link>
                    <div className="row line"></div>
                    <p className="title">LISTAS</p>

                    <Link to="/datatable" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span
                            >Datatable</span>
                        </li>
                    </Link>
                    <Link to="/cards" style={{ textDecoration: "none" }}>
                        <li>
                            <CreditCardIcon className="icon" />
                            <span>Cards</span>
                        </li>
                    </Link>
                    <Link to={"/collapsibleTable"} style={{ textDecoration: "none" }}>
                        <li>
                            <AssignmentReturnIcon className="icon" />
                            <span>CollapsibleTable</span>
                        </li>
                    </Link>
                    <Link to={"/columnGroupingTable"} style={{ textDecoration: "none" }}>
                        <li>
                            <AssignmentReturnIcon className="icon" />
                            <span>ColumnGroupingTable</span>
                        </li>
                    </Link>
                    <Link to={"/table"} style={{ textDecoration: "none" }}>
                        <li>
                            <AssignmentReturnIcon className="icon" />
                            <span>Table</span>
                        </li>
                    </Link>
                    <div className="row line"></div>
                    <p className="title">REPORTES</p>
                    <Link to="#reports" style={{ textDecoration: "none" }}>
                        <li>
                            <InsertChartIcon className="icon" />
                            <span>Reportes</span>
                        </li>
                    </Link>
                    <div className="row line"></div>
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
    </>
)

export default Sidebar;
