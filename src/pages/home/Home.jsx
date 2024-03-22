import './home.scss'
import Layout from '../../layout/Layout'
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import QrCodeIcon from '@mui/icons-material/QrCode'
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CardHome from '../../components/cards/CardHome';
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SummarizeIcon from '@mui/icons-material/Summarize'
import lang from '../../languages/index'
const Home = () => {
    const modules = [
        {
            link: '/sales',
            icon: <CreditCardIcon className='feature-icon-small' />
        },
        {
            link: '/products',
            icon: <QrCodeIcon className='feature-icon-small' />
        },
        {
            link: '/reports',
            icon: <InsertChartIcon className='feature-icon-small' />
        },
        {
            link: '/dashboard',
            icon: <DashboardIcon className='feature-icon-small' />
        },
        {
            link: '/returns',
            icon: <AssignmentReturnIcon className='feature-icon-small' />
        },
        {
            link: '/orders',
            icon: <SummarizeIcon className='feature-icon-small' />
        }
    ]
    return (
        <Layout
            title={lang.pages.Home.title}
        >
            <div className="row" key={'row-row'}>
                <div className="container px-4" key={'row-row-1'}>
                    <div className="row row-cols-1 row-cols-lg-3" key={'row-modules'}>
                        {modules.map(({link, icon }, index) => (
                            <CardHome key={`card-home-${index}`} title={lang.pages.Home.modules[index].name} description={lang.pages.Home.modules[index].description} link={link} icon={icon} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>)
}

export default Home