import { Skeleton } from '@mui/material'

const CardLoading = () => (
    <div className="col-12 col-sm-6 col-lg-3 p-2 border">
        <Skeleton variant="rectangular" className="w-100" height={50} />
        <Skeleton variant="text" className="w-100" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="rectangular" className="w-50 mt-3" height={20} />
    </div>
)

export default CardLoading