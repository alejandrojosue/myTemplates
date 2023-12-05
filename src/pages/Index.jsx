import Layout from "../layout/Layout"

const Home = () => {
    return <Layout title={'Home'}>
        <button className="btn btn-dark" onClick={() => {
            console.log(Array(3))
        }}>Imprimir datos</button>
    </Layout>
}

export default Home