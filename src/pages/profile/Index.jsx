import './profile.scss'
import Layout from '../../layout/Layout'
import Chart from '../../components/chart/Chart'

const Index = () => {

    return (
        <Layout title='Perfil Usuario' link='/home'>
            <div className="row px-3">
                <div className="col-12 col-sm-12 col-lg-6">
                    <div className="left">
                        <div className="editButton">Más</div>
                        <h1 className="title">Información</h1>
                        <div className="item">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png"
                                alt=""
                                className="itemImg"
                            />
                            <div className="details">
                                <h1 className="itemTitle">{sessionStorage.getItem('userName')}</h1>
                            </div>
                        </div>
                    </div>
                    <br />
                    <Chart key={'chart'}
                        aspect={3}
                        title="Mis Ventas Totales ( Últimos 4 meses)"
                        data={[]} />
                </div>
                <div className="col-12 col-sm-12 col-lg-6">
                    <Chart key={'chart'} aspect={3} title="Mis Ventas Totales ( Últimos 4 meses)"
                        data={[]} />
                </div>
            </div>
        </Layout>
    )
}

export default Index