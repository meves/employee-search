import { ResultCodes } from "../../api/http-codes"
import { usersApi } from "../../api/users-api"
import { User } from "../types"

export const getUsersNames = (searchString: string) => {
    return searchString.split(',').map(userName => userName.trim())
}

export const getUsersIds = (users: User[], usersNames: string[]) => {
    const ids: number[] = []
    usersNames.forEach((userName) => {
        users.forEach(user => {
            if (user.username === userName) {
                ids.push(user.id)
            }
        })
    })

    return ids
}

export const getUsersFromServer = async (ids: number[]) => {
    return ids.map(id => new Promise(async (resolve) => {
        const response = await usersApi.getUser(String(id))
        if (response.status === ResultCodes.SUCCESS_200) {
            resolve(response.data)
        }
    }))
}