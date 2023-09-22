import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, GetState, RootState } from "../redux-store"
import { User } from "../types"
import { usersApi } from "../../api/users-api"
import { ResultCodes } from "../../api/http-codes"
import { setSearchStatus } from "./searchSlice"
import { getUsersFromServer, getUsersIds, getUsersNames } from "../libs/utils"

interface SearchState {
    user: User | null
    users: User[]
    foundUsers: User[]
}

const initialState: SearchState = {
    user: null,
    users: [],
    foundUsers: []
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        },
        setFoundUsers: (state, action: PayloadAction<User[]>) => {
            state.foundUsers = action.payload
        }
    }
})

export const {
    setUser,
    setUsers,
    setFoundUsers

} = usersSlice.actions

export default usersSlice.reducer

export const selectUser = (state: RootState) => state.users.user
export const selectFoundUsers = (state: RootState) => state.users.foundUsers

export const getUserThunk = (id: string) =>
    async (dispatch: AppDispatch) => {
        const response = await usersApi.getUser(id)
        if (response.status === ResultCodes.SUCCESS_200) {
            dispatch(setUser(response.data))
        }
    }

export const getUsersThunk = () =>
async (dispatch: AppDispatch) => {
    const response = await usersApi.getUsers()
    if (response.status === ResultCodes.SUCCESS_200) {
        dispatch(setUsers(response.data))
    }
}

export const findUsersThunk = (searchString: string) =>
    async (dispatch: AppDispatch, getState: GetState) => {
        const usersNames = getUsersNames(searchString)
        const ids = getUsersIds(getState().users.users, usersNames)        
        if (ids.length) {
            const users = await getUsersFromServer(ids)
            Promise.allSettled(users)
                .then((users) => {
                    const foundUsers: User[] = []
                    users.forEach(userPayload => {
                        if (userPayload.status === 'fulfilled') {
                            foundUsers.push(userPayload.value as User)
                        }
                    })
                    console.log(foundUsers);
                    
                    dispatch(setFoundUsers(foundUsers))
                    dispatch(setSearchStatus('found'))
                })
        } else {
            dispatch(setSearchStatus('notfound'))
        }
    }