import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import SimpleBackdrop from '../components/backdrop/SimpleBackdrop'
import ErrorComponent from '../components/error/error'
// import Footer from '../components/footer/Footer'

const Layout = ({ title, children, loading = false, error = null, link = '/products' }) => {
    document.title = title
    if (error) return <ErrorComponent error={error.toString()} link={link} />
    return (
        <div>
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
