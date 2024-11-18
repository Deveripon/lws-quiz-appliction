import { actions } from "../actions/actions";

export const initialState = {
    loading: false,
    error: null,
    data: [],
};

export const usersQuizReducer = (state, action) => {
    switch (action.type) {
        case actions.dataFaching.FETCHING_DATA: {
            return {
                ...state,
                loading: true,
            };
        }
        case actions.dataFaching.FETCHING_DATA_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case actions.usersQuizActions.FETCHED_ALL_QUIZ_SETS: {
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
