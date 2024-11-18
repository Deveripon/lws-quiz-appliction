import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server_base_url } from "../../constant";
import useAuth from "./useAuth";

const useAxios = () => {
    const api = axios.create({
        baseURL: server_base_url,
    });
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // intercept when request to set Authorization header with access token and ruturn the request

        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                // set Authorization header with access token before request is sent
                config.headers.Authorization = `Bearer ${auth?.accessToken}`;
                return config;
            },
            (error) => {
                if (error?.response) {
                    return Promise.reject(error.response.data.message);
                } else {
                    error.message =
                        "Something went wrong, Check your Internet Connection or try again later";
                }
                return Promise.reject(error);
            }
        );
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                //take original request
                const originalRequest = error?.config;
                console.log(error);

                if (
                    error?.response?.status === 401 &&
                    !originalRequest._retry
                ) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = auth?.refreshToken;

                        // generate new access token by api call using refresh token
                        const response = await axios.post(
                            `${server_base_url}/auth/refresh-token`,
                            { refreshToken }
                        );
                        console.log(`refreshTokenResponse`, response);

                        if (response.status === 200) {
                            // set Authorization header with new access token
                            const newAccessToken =
                                response.data?.data?.accessToken;

                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                            console.log(
                                `generated new access token`,
                                newAccessToken
                            );

                            //set new access token and refresh token in auth state
                            setAuth((prevAuth) => ({
                                ...prevAuth,
                                accessToken: newAccessToken,
                            }));

                            /*        // set auth to local storage
                            localStorage.setItem(
                                "auth",
                                JSON.stringify({
                                    user: auth.user,
                                    accessToken: newAccessToken,
                                    refreshToken: oldRefreshToken,
                                })
                            ); */

                            // execute the request again
                            return api(originalRequest);
                        }
                    } catch (error) {
                        //Refresh Token Expired Situation
                        setAuth({});
                        localStorage.removeItem("auth");
                        navigate("/login", { replace: true });

                        //transform the error response before sent to component
                        if (error?.response) {
                            return Promise.reject(error.response.data.message);
                        } else {
                            error.message =
                                "Something went wrong, Check your Internet Connection or try again later";
                        }
                        return Promise.reject(error);
                    }
                }
                //transform the error before sent to component
                if (error?.response) {
                    return Promise.reject(error.response.data.message);
                } else {
                    error.message =
                        "Something went wrong, Check your Internet Connection or try again later";
                }
                return Promise.reject(error);
            }
        );
        //effect cleanup
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [auth, setAuth]);
    return { api };
};

export default useAxios;
