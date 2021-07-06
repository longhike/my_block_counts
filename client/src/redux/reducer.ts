import { AnyAction, Reducer } from "redux";
import { ICurrentAssessment, IUser } from "../utils/typings/_interfaces";

const initialState: { user: IUser; currentAssessment: ICurrentAssessment } = {
  user: {
    username: null,
    email: null,
    _id: null,
  },
  currentAssessment: {
    _id: null,
    st_address: null,
  },
};

const reducer: Reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UNSET_USER":
      return {
        ...state,
        user: {
          username: null,
          _id: null,
        },
      };
    case "SET_CURRENT_ASSESSMENT":
      return {
        ...state,
        currentAssessment: action.payload,
      };
    case "UNSET_CURRENT_ASSESSMENT":
      return {
        ...state,
        currentAssessment: {
          _id: null,
          st_address: null,
        },
      };
    default:
      return state;
  }
};

export default reducer;
