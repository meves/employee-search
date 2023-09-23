import { ResultCodes } from "../../api/http-codes"
import { AppDispatch } from "../redux-store"
import { getUserThunk } from "../slices/usersSlice"
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

export const getFoundUsers = async (ids: number[], dispatch: AppDispatch) => {    
    const foundUsers: User[] = []
    await Promise.allSettled(requsetUsers(ids, dispatch))
    .then((results) => {
        results.forEach(payload => {
            if (payload.status === 'fulfilled') {
                foundUsers.push(payload.value as User)
            }
        })                    
    })
    return foundUsers
}

export const requsetUsers = (ids: number[], dispatch: AppDispatch) => {
    return ids.map(id => dispatch(getUserThunk(String(id))))
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