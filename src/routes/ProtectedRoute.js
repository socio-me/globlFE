
import { useNavigate,useLocation,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({children}) => {
    const navigate=useNavigate()
    const location =useLocation()
    const user=localStorage.getItem('currentUser');

        if(!user) {
            return <Navigate to="/auth/login" state={{ from: location}} replace />
        }
     return children
    
}
 
export default ProtectedRoute;