import { useEffect, useState } from "react"
import Layout from "../layout/Layout"
import CompanyService from "../services/CompanyService"
import CompanyRepository from "../repositories/CompanyRepository"

const Home = () => {
    const companyRepository = new CompanyRepository()
    const companyService = new CompanyService(companyRepository)
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const dataCompany = await companyService.getDataCompany()
            setData(dataCompany)
        }
        fetchData()
    }, [])
    return <Layout title={'Mi empresa'}>
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{data?.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{data?.lema}</h6>
                <p className="card-text">{data?.direccion}</p>
                {/* <p className="card-text">{data?.fechaVencimiento}</p> */}
                <a href="#" className="card-link">{data?.telefono}</a>
                <a href={data?.website} target="blank" className="card-link">{data?.website}</a>
            </div>
        </div>
        <button className="btn btn-dark mt-4" onClick={() => {
            console.log(data)
        }}>Imprimir datos</button>
    </Layout>
}

export default Home