import './profile.scss'
import Layout from '../../layout/Layout'
import Chart from '../../components/chart/Chart'
import lang from '../../languages/index'

const Index = () => {

    return (
        <Layout title={lang.pages.Profile.title} link='/home'>
            <div className="row px-3">
                <div className="col-12 col-sm-12 col-lg-6">
                    <div className="left">
                        <div className="editButton">{lang.pages.Profile.information.editbutton}</div>
                        <h1 className="title">{lang.pages.Profile.information.title}</h1>
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
                        title={lang.pages.Profile.Chart.titles[0]}
                        data={[]} />
                </div>
                <div className="col-12 col-sm-12 col-lg-6">
                    <Chart key={'chart'} aspect={3} title={lang.pages.Profile.Chart.titles[0]}
                        data={[]} />
                </div>
            </div>
        </Layout>
    )
}

export default Index