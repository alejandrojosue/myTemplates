import Sidebar from "../sidebar/Sidebar"
import useCompanyService from '../../hooks/useCompanyService'
const Navbar = () => {
    const { company } = useCompanyService()
    return (
        <nav className="navbar border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold text-secondary text-decoration-none" href="/home">{company ? company.nombre : `Company's Name`}</a>
                <span className="navbar-toggler text-secondary cursor-pointer border-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    •••
                </span>
                <Sidebar />
            </div>
        </nav >
    );
};

export default Navbar;