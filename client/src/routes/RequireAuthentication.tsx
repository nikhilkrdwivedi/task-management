/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLocation, Navigate, Outlet } from "react-router-dom";
import TopHeaderWrapper from "../components/header/TopHeaderWrapper";

function RequireAuth() {
    const location = useLocation();
    const token = localStorage.getItem("token");
    if (token) {
        return (
            <TopHeaderWrapper>
                <Outlet />
            </TopHeaderWrapper>
        );
    }
    return <Navigate to="/get-started" state={{ from: location }} replace />;
}

export default RequireAuth;