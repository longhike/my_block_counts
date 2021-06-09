import { AnyAction, Reducer } from "redux"
import { IUser } from "../utils/typings/_interfaces"

const initialState: { user: IUser; currentAssessmentID: string | null } = {
    user: {
      username: null,
      email: null,
      _id: null,
    },
    currentAssessmentID: null,
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
      case "SET_ASSESSMENT_ID":
        return {
          ...state,
          currentAssessmentID: action.payload,
        };
      case "UNSET_ASSESSMENT_ID":
        return {
          ...state,
          currentAssessmentID: null,
        };
      default:
        return state;
    }
  };

  export default reducer;