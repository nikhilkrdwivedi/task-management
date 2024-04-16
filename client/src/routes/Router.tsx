import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RequireAuth from "./RequireAuthentication";
import GetStarted from "../pages/public/GetStarted";
import PageNotFound from "../pages/common/PageNotFound";

import Tasks from "../pages/private/Tasks";

export default function Router() {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Tasks />} />
                    <Route path="/home" element={<Tasks />} />
                </Route>
                {!isAuthenticated && (
                    <Route>
                        <Route path="/get-started" element={<GetStarted />} />
                    </Route>
                )}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}