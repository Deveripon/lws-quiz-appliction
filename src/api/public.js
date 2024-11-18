import { server_base_url } from "../../constant";
import { api } from "./axiosInstance";

//Fatching Quizset list
const getQuizsetList = async () => {
    try {
        const response = await api.get(`${server_base_url}/quizzes`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("There was an error while fatching quizset list");
        }
    } catch (error) {
        throw new Error(error);
    }
};

export { getQuizsetList };
