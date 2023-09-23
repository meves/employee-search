import { AxiosResponse } from "axios"
import { User } from "../store/types"
import { instance } from "."

export const usersApi = {
    async getUser(id: string) {
        let response: AxiosResponse<User>
        try {
            response = await instance.get<User>(`users/${id}`)
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async getUsers() {
        let response: AxiosResponse<User[]>
        try {
            response = await instance.get<User[]>(`users`)
        } catch (error: any) {
            response = error.response            
        }
        return response
    }
}