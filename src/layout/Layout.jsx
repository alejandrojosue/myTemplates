import Navbar from '../components/navbar/Navbar'
import SimpleBackdrop from '../components/backdrop/SimpleBackdrop'
import ErrorComponent from '../components/error/error'
import PropTypes from 'prop-types'

// import Footer from '../components/footer/Footer'

const Layout = ({ title, children, loading = false, error = null, link = '/products' }) => {
    document.title = title
    if (error) return <ErrorComponent error={error.toString()} link={link} />
    return (
        <>
            {loading && <SimpleBackdrop />}
            <Navbar />
            <div className='container-fluid pb-2'>
                <p className="text-secondary fs-3 py-3">
                    {title}
                </p>
                {children}
            </div>
        </>
    )
}
/* 
    Indica los props que recibe Layout.
    Al no agregarse, EsLint lo marca como error
*/
Layout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.object,
    link: PropTypes.string,
}

export default Layout
