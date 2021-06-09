import { IUser } from "../utils/typings/_interfaces";

export const setUser = (user: IUser) => {
    return {
        type: "SET_USER",
        payload: user
    }
}

export const unsetUser = () => {
    return {
        type: "UNSET_USER",
    }
}

export const setCurrentAssessmentID = (currentAssessmentID: string) => {
    return {
        type: "SET_ASSESSMENT_ID",
        payload: currentAssessmentID
    }
}

export const unsetCurrentAssessmentID = () => {
    return {
        type: "UNSET_ASSESSMENT_ID"
    }
}
