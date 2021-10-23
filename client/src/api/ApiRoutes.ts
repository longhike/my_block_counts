import axios, { AxiosResponse } from "axios"

export const getAssessmentDetailById = async (_id: string, table: string) => {
    try {
        const { data }: AxiosResponse = await axios.get(`/api/detail/assessment?_id=${_id}&table=${table}`);
        return data;
    } catch (error: any) {
        return error
    }
}

export const getMyAssessments = async (user_id: string) => {
    try {
        const { data }: AxiosResponse = await axios.get(
            `/api/list/my-assessments?user_id=${user_id}`);
        return data
    }
    catch(error: any) {
        return error
    }
}

export const getAllAssessments = async () => {
    try {
        const { data }: AxiosResponse = await axios.get("/api/list/assessments")
        return data;
    }
    catch (error: any) {

    }
}

export const getAvailableFilters = async (filters: string[]) => {
    try {
        const { data }: AxiosResponse = await axios.get("/api/filters/"+filters.join("-"))
        return data
    }
    catch(error: any) {
        return error
    }
}