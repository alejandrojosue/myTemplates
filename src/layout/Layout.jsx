import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import SimpleBackdrop from '../components/backdrop/SimpleBackdrop'
// import Footer from '../components/footer/Footer'
// import Sidebar from '../components/sidebar/Sidebar'

const Layout = ({ title, children, loading = false }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
    document.title = title
    return (
        <div style={{ height: 'auto' }}>
            {loading && <SimpleBackdrop />}
            <Navbar />
            <div className='container-fluid'>
                <p className="text-secondary fs-3 py-3">
                    {title}
                </p>
                {children}
            </div>
        </div>
    )
}

export default Layout
