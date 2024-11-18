import axios from "axios";
import { server_base_url } from "../../constant";
import { api } from "./axiosInstance";

// handle login
const login = async (credentials) => {
    try {
        const response = await api.post(
            `${server_base_url}/auth/login`,
            credentials
        );
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export { login };
