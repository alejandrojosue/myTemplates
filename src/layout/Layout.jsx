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
            <div className="parent">
                <Navbar />
                <div className="content">
                    <p className="title">
                        {title}
                    </p>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Layout
