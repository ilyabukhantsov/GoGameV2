import { Navigate } from "react-router";
import { useAuth } from "../../context/auth/useAuth"

export const ProtectedRoutes = ({children}: {children: React.ReactNode}) => {
    const { user } = useAuth();

    if(user) return <Navigate to='/' />

    return <>{children}</>
}