import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../base/Button";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logout } from "../../api/authentication";
import toast from 'react-hot-toast';
export default function Header() {
    const navigate = useNavigate();
    const { userContext, isAuthenticated, resetIsAuthenticatedAndUserContext } = useAuth();
    async function logoutUser() {
        try {
            await logout({ allDeviceLogout: false });
            resetIsAuthenticatedAndUserContext();
            navigate("/get-started");
        } catch (error: any) {
            const errorMsg = error.message;
            toast(errorMsg);
        }
    }
    if (!isAuthenticated) return null;

    return (
        <div className="flex z-10 justify-between items-center h-16  px-4 md:px-12 lg:px-42 py-4 md:py-4 gap-4 sticky -top-0.5 bottom-0.5 border-b border-gray-700  bg-gray-900">
            <div className="text-md font-semibold text-white">Hi, {userContext?.name}</div>
            <Button title="logout" Icon={RiLogoutCircleRLine} classNames='text-white font-semibold px-2 py-1 gap-1 bg-pink-500 hover:bg-pink-700' onClick={() => logoutUser()} />

            {/* <Button title="logout" /> */}
        </div>
    );
}