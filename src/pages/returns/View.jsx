import Layout from '../../layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import useRetunService from '../../hooks/useReturnService'
import DetailsReturn from '../../components/table/DetailsReturn';

const View = () => {
    const { returns, loading, error, getById } = useRetunService()
    const { id } = useParams();
    useEffect(() => {
        getById(id)
    }, [])
    return (
        <Layout title={'Devolución #' + id} loading={loading} error={error} link='/returns'>
            <DetailsReturn details={returns.detalleDevoluciones ? returns.detalleDevoluciones : []} />
            <div className="row px-3">
                <Link to="/returns" className='btn btn-outline-primary text-decoration-none col-12 col-sm-6 col-lg-3'>Regresar</Link>
            </div>
        </Layout>
    )
}

export default View