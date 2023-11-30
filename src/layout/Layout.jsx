import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Sidebar from '../components/sidebar/Sidebar'

const Layout = ({ window, content, title }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
    document.title = title
    return (
        <div>
            <Navbar />
            <div className='container-fluid'>
                <p className="text-secondary fs-3 py-3">
                    {title}
                </p>
                {content}
            </div>
        </div>
    )
}

export default Layout
