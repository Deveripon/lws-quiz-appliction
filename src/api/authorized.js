/* import { server_base_url } from "../../constant";
import useAxios from "../hooks/useAxios";

const getQuizById = async (quizsetId) => {
    const { api } = useAxios();
    try {
        const response = await api.get(
            `${server_base_url}/quizzes/${quizsetId}`
        );
    } catch (error) {}
};
 */