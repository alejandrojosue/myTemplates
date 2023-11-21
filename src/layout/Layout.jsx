import './Layout.scss'
import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Sidebar from '../components/sidebar/Sidebar'

const Layout = ({ window, content, title }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    return (
        <div className="layout">
            <Sidebar />
            <div className="container">
                <Navbar />
                <div className="content">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Layout