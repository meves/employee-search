import { AxiosResponse } from "axios"
import { User } from "../store/types"
import { instance } from "."

export const usersApi = {
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