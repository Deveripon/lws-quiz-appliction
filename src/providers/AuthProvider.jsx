import { useState } from "react";
import AuthContext from "../context/AuthContext";

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(
        JSON.parse(localStorage.getItem("auth")) ?? {}
    );
    console.log(auth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
