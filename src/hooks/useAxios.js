import axios from "axios";
import { server_base_url } from "../../constant";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const api = axios.create({
        baseURL: server_base_url,
    });

    useEffect(() => {
        // request interceptors
        // set the access token in Request's Authorization before request sent
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const accessToken = auth?.accessToken;
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        //response interceptor
        // If accessToken expired than I need to generate new token by api call with refressToken, and set the new accessToken to original Request's header, and retry the request.
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = auth?.refreshToken;
                        // get new access token by api call with refresh Token
                        const response = await axios.post(
                            `${server_base_url}/auth/refresh-token`,
                            { refreshToken }
                        );
                        const newAccessToken = response.data?.data?.accessToken;
                        console.log(
                            `new generated access token`,
                            newAccessToken
                        );
                        //set new access token to auth provider
                        setAuth((prevAuthInfo) => ({
                            ...prevAuthInfo,
                            accessToken: newAccessToken,
                        }));

                        // update localstorage auth data with new accessToken
                        localStorage.setItem(
                            "auth",
                            JSON.stringify({
                                ...auth,
                                accessToken: newAccessToken,
                            })
                        );

                        //set the new accessToken to Request header
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        // retry the request
                        return axios(originalRequest);
                    } catch (error) {
                        // if refresh token get expired, logout the user and remove auth data
                        localStorage.removeItem("auth");
                        setAuth({});
                        navigate("/login");
                        console.log(error);
                    }
                }
                return Promise.reject(error);
            }
        );

        // effects cleanup
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [auth.accessToken]);
    return { api };
};
export default useAxios;
