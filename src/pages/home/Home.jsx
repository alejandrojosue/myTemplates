import './home.scss'
import Layout from '../../layout/Layout'
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import QrCodeIcon from '@mui/icons-material/QrCode'
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CardHome from '../../components/cards/CardHome';
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SummarizeIcon from '@mui/icons-material/Summarize'

const Home = () => {
    const modules = [
        {
            name: 'Facturas',
            description: 'Muestra un listado de todas las ventas realizadas por la empresa, junto con filtros y opciones adicionales.',
            link: '/sales',
            icon: <CreditCardIcon className='feature-icon-small' />
        },
        {
            name: 'Productos',
            description: 'Muestra un listado de todos los productos que la empresa ofrece, junto con filtros y otras opciones.',
            link: '/products',
            icon: <QrCodeIcon className='feature-icon-small' />
        },
        {
            name: 'Reportes',
            description: 'Permite generar reportes como de ventas, compras y devoluciones realizadas en la empresa.',
            link: '/reports',
            icon: <InsertChartIcon className='feature-icon-small' />
        },
        {
            name: 'Panel de Control',
            description: 'Muestra resumen de los datos generales de la empresa.',
            link: '/dashboard',
            icon: <DashboardIcon className='feature-icon-small' />
        },
        {
            name: 'Devoluciones',
            description: 'Muestra un listado de todas las devoluciones realizadas por los clientes hacia la empresa.',
            link: '/returns',
            icon: <AssignmentReturnIcon className='feature-icon-small' />
        },
        {
            name: 'Órdenes de Compras',
            description: 'Muestra todas las órdenes de compra realizada por parte de la empresa hacia sus proveedores.',
            link: '/orders',
            icon: <SummarizeIcon className='feature-icon-small' />
        }
    ]
    return (
        <Layout
            title={'Módulos del Sistema'}
        >
            <div className="row" key={'row-row'}>
                <div className="container px-4" key={'row-row-1'}>
                    <div className="row row-cols-1 row-cols-lg-3" key={'row-modules'}>
                        {modules.map(({ name, description, link, icon }, index) => (
                            <CardHome key={`card-home-${index}`} title={name} description={description} link={link} icon={icon} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>)
}

export default Home