import Sidebar from "../sidebar/Sidebar";
const Navbar = () => {

    return (
        <>
            <nav className="navbar border-bottom">
                <div className="container-fluid">
                    <a className="navbar-brand text-secondary" href="#d">Offcanvas navbar</a>
                    <span className="navbar-toggler text-secondary cursor-pointer border-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        •••
                    </span>
                    <Sidebar />
                </div>
            </nav >
        </>
    );
};

export default Navbar;