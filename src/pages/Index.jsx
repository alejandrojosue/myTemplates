import Layout from '../layout/Layout'
import useCompanyService from '../hooks/useCompanyService'
const Home = () => {
    const { company, error, loading } = useCompanyService()
    return <Layout title={'Mi empresa'} loading={loading} error={error}>
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{company?.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{company?.lema}</h6>
                <p className="card-text">{company?.direccion}</p>
                <p className="card-text">{company?.fechaVencimiento}</p>
                <a href="#" className="card-link">{company?.telefono}</a>
                <a href={`https://${company?.website}`} target="blank" className="card-link">{company?.website}</a>
            </div>
        </div>
        <button className="btn btn-dark mt-4" onClick={() => {
            console.log(company)
        }}>Imprimir datos</button>
    </Layout>
}

export default Home