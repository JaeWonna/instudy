import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("loginUser");
        console.log("test");
        console.log(storedUser);
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser).data;
            setUser(parsedUser);
        } else {
            navigate("/signIn");
        }
    }, [navigate]);

    console.log("여기서 loginUser", user);

    return user; // Replace this with your actual JSX content
};

export default LoginUser;
