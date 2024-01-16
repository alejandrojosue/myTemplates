import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CardHome = ({ title, description, link, icon, index }) => {
    return (
        <div className="feature col p-4 border" key={index}>
            <div key={`feature-icon-${index}`} className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 mb-3">
                {icon}
            </div>
            <h3 className="fs-4" key={`title-${index}`}>{title}</h3>
            <p className='fs-6' key={`description-${index}`}>{description}</p>
            <a href={link} className='mt-1' style={{ fontSize: '1.1em' }} key={`link-${index}`}>
                Visitar Módulo&nbsp;
                <ArrowForwardIosIcon key={`arrow-icon-${index}`} sx={{ fontSize: '1em' }} />
            </a>
        </div>
    )
}
export default CardHome