import { Link } from 'react-router-dom';
import lang from '../../languages/index'
const Unauthorized = () => (
 <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
  <div className="text-center">
   <h1 className="display-4">{lang.pages.Unauthorized.title}</h1>
   <p className="lead p-2">
    {lang.pages.Unauthorized.description}
   </p>
   <Link to="/home" className="text-decoration-none btn btn-outline-primary m-1">
    {lang.pages.Unauthorized.Link}
   </Link>
  </div>
 </div>
)

export default Unauthorized