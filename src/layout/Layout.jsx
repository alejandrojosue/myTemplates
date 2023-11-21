import './Layout.scss'
import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Sidebar from '../components/sidebar/Sidebar'

const Layout = ({ window, content, title }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
    document.title = title
    return (
        <div className="">
            <Navbar />
            <div className='p-2'>
                <p className="title text-secondary fs-3">
                    {title}
                </p>
                <div className="container-fluid">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Layout
