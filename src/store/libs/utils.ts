import { AppDispatch } from "../redux-store"
import { getUserThunk } from "../slices/usersSlice"
import { User } from "../types"

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