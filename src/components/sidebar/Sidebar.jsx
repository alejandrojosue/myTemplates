import './sidebar.scss'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import LanguageIcon from '@mui/icons-material/Language'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Home from '@mui/icons-material/Home'
import lang from '../../languages/index'

const handleRadioClick = (selectedLang) => {
    localStorage.setItem("lang", selectedLang)
    location.reload()
}

const Sidebar = () => (
    <div className="offcanvas offcanvas-start sidebar" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Radax</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <ul className="navbar-nav flex-grow-1">
                <p className="title">{lang.components.Sidebar["p-titles"][0]}</p>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <li>
                        <Home className="icon" />
                        <span>{lang.components.Sidebar.span.home}</span>
                    </li>
                </Link>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>{lang.components.Sidebar.span.dashboard}</span>
                    </li>
                </Link>
                <div className="row line"></div>
                <p className="title">{lang.components.Sidebar["p-titles"][1]}</p>
                <Link to={'/products'} style={{ textDecoration: 'none' }}>
                    <li>
                        <QrCodeIcon className="icon" />
                        <span>{lang.components.Sidebar.span.products}</span>
                    </li>
                </Link>
                <Link to={'/sales'} style={{ textDecoration: 'none' }}>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>{lang.components.Sidebar.span.sales}</span>
                    </li>
                </Link>
                <Link to={'/returns'} style={{ textDecoration: 'none' }}>
                    <li>
                        <AssignmentReturnIcon className="icon" />
                        <span>{lang.components.Sidebar.span.returns}</span>
                    </li>
                </Link>
                <div className="row line"></div>
                <p className="title">{lang.components.Sidebar["p-titles"][2]}</p>
                <Link to="/reports" style={{ textDecoration: 'none' }}>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>{lang.components.Sidebar.span.reports}</span>
                    </li>
                </Link>
                <div className="row line"></div>
                <p className="title">{lang.components.Sidebar["p-titles"][3]}</p>
                <Link to={'/profile'} style={{ textDecoration: 'none' }}>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>{lang.components.Sidebar.span.profile}</span>
                    </li></Link>
                <Link to="#" style={{ textDecoration: 'none' }}>
                    <li>
                        <div className="accordion w-100 bg-transparent">
                            <div className="accordion-item border border-0 bg-transparent">
                                <span className="p-0 m-0 accordion-button collapsed bg-transparent" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne">
                                    <LanguageIcon className="icon" />&nbsp;
                                    {lang.components.Sidebar.span.languages}
                                </span>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">
                                        {
                                            (lang.components.Sidebar.span["languages-list"]).map((lang, index) => {
                                                return (
                                                    <div className="form-chek" key={`lang-${Object.keys(lang)[0]}`}>

                                                        <input className="form-check-input"
                                                            id={`rdbtn-${index}`}
                                                            type="radio" name="flexRadioDefault"
                                                            checked={`${localStorage.getItem('lang') === Object.keys(lang)[0] ? "checked" : ""}`}
                                                            onChange={() => handleRadioClick(Object.keys(lang)[0])}
                                                        />
                                                        <label className="mx-1 form-check-label" htmlFor={`rdbtn-${index}`}>
                                                            {lang[Object.keys(lang)[0]]}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span
                            onClick={() => sessionStorage.clear()}
                        >{lang.components.Sidebar.span.logout}</span>
                    </li>
                </Link>
            </ul>
        </div>
    </div>
)

export default Sidebar
