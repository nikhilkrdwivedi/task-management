/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { register, signIn } from "../../api/authentication";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { setLocalStorage } from "../../utils/manageLocalStorage";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/base/Button";
import Container from "../../components/base/Container";
import SignIn from "../../components/authentication/SignIn";
import SignUp from "../../components/authentication/SignUp";

export default function GetStarted() {
    const { setIsAuthenticated, setUserContext } = useAuth();
    const navigate = useNavigate();
    const [renderSignInForm, setRenderSignInForm] = useState(true);
    const [form, setForm] = useState<any>({
        email: "author@gmail.com",
        password: "Password123.@",
    });

    const [formErrors, setFormErrors] = useState({});

    const toggleFormType = () => {
        setForm({});
        setFormErrors({});
        setRenderSignInForm(!renderSignInForm);
    };

    const validatedRequest = () => {
        const errors: any = {};
        if (!renderSignInForm && !form?.name) {
            errors["name"] = "Name is required field!";
        }
        if (!form?.email) {
            errors["email"] = "Email is required field!";
        }
        if (!form?.password) {
            errors["password"] = "Password is required field!";
        }
        setFormErrors(errors);
        if (!Object.keys(errors).length) {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const call = renderSignInForm ? signIn : register;
            const {
                data: { data },
            } = await call(form);
            await setLocalStorage({
                userCtx: JSON.stringify(data?.user),
                token: data?.token,
            });
            setUserContext(data?.user);
            setIsAuthenticated(true);
            toast("Great news! You can use your services now 😃");
            navigate("/");
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || "Try again 🤠";
            toast(errorMsg);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <Button
                onClick={() => {
                    navigate("/");
                }}
                classNames="!fixed top-0 left-0 m-4 md:m-12 bg-teal-400  h-[34px] w-[34px] text-gray-700"
                Icon={IoReturnUpBackOutline}
                IconSize={28}
            />
            <Container className="flex-1 ">
                {renderSignInForm ? (
                    <SignIn
                        onChange={(value: string, key: string) => {
                            setForm((prev: any) => ({ ...prev, [key]: value }));
                        }}
                        dataErrors={formErrors}
                        data={form}
                        changeFormType={() => {
                            toggleFormType();
                        }}
                        submitForm={() => validatedRequest()}
                    />
                ) : (
                    <SignUp
                        onChange={(value: string, key: string) => {
                            setForm((prev: any) => ({ ...prev, [key]: value }));
                        }}
                        dataErrors={formErrors}
                        data={form}
                        changeFormType={() => {
                            toggleFormType();
                        }}
                        submitForm={() => validatedRequest()}
                    />
                )}
            </Container>
        </div>
    );
}