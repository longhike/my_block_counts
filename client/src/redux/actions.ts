import { ICurrentAssessment, IUser } from "../utils/typings/_interfaces";

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

export const setCurrentAssessment = (assessment: ICurrentAssessment) => {
    return {
        type: "SET_CURRENT_ASSESSMENT",
        payload: assessment
    }
}

export const unsetCurrentAssessment = () => {
    return {
        type: "UNSET_CURRENT_ASSESSMENT"
    }
}
