import { useReducer } from "react";
import UsersQuizContext from "../context/usersQuizContext";
import { initialState, usersQuizReducer } from "../reducers/usersQuizReducer";

const UsersQuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersQuizReducer, initialState);
    return (
        <UsersQuizContext.Provider value={{ state, dispatch }}>
            {children}
        </UsersQuizContext.Provider>
    );
};

export default UsersQuizProvider;
