import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Auth = ({ children, protectedRoute }) => {
    const { status } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (status !== null) {
            console.log(status);
            if (protectedRoute) {
                if (!status) {
                    navigate("/login");
                }
            } else {
                if (status) {
                    navigate("/");
                }
            }
        }
    }, [protectedRoute, status, navigate]);

    if (status === null) return <Loading />;

    return <>{children}</>;
};

export default Auth;
