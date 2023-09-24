import { ResultCodes } from "../../api/http-codes"
import { User } from "../types"
import { ResponseErrors } from "./constatnts"

export const getUsersIdsBySearchString = (users: User[], searchString: string) => {
    return getUsersIds(users, getUsersNames(searchString))
}

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

export const getFoundUsers = (users: User[], ids: number[]) => {
    const foundUsers: User[] = []
    users.forEach(user => {
        if (ids.includes(user.id)) {
            foundUsers.push(user)
        }
    })
    return foundUsers
}

export const processResponseStatus = (statusCoode: ResultCodes) => {
    if (statusCoode === ResultCodes.BAD_REQUEST_400) {
        return ResponseErrors.NOT_CREDENTIALS
    } else if (statusCoode === ResultCodes.NOT_FOUND_404) {
        return ResponseErrors.NOT_FOUND
    } else if (statusCoode === ResultCodes.SERVER_ERROR_500) {
        return ResponseErrors.SERVER_ERROR
    } 
}