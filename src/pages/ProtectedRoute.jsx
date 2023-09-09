import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null
}
