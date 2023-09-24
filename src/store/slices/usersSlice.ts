import { ResponseErrors } from './../libs/constatnts';
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, GetState, RootState } from "../redux-store"
import { User } from "../types"
import { usersApi } from "../../api/users-api"
import { ResultCodes } from "../../api/http-codes"
import { setSearchStatus } from "./searchSlice"
import { getUsersIdsBySearchString, processResponseStatus, getFoundUsers } from "../libs/utils"
import { setResponseError } from './errorSlice';

interface SearchState {
    profile: User | null
    users: User[]
    foundUsers: User[]
}

const initialState: SearchState = {
    profile: null,
    users: [],
    foundUsers: []
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<User>) => {
            state.profile = action.payload
        },
        resetProfile: (state, action: PayloadAction) => {
            state.profile = null
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
    setProfile,
    resetProfile,
    setUsers,
    setFoundUsers

} = usersSlice.actions

export default usersSlice.reducer

export const selectProfile = (state: RootState) => state.users.profile
export const selectFoundUsers = (state: RootState) => state.users.foundUsers

export const getUsersThunk = () =>
async (dispatch: AppDispatch) => {
    const response = await usersApi.getUsers()
    if (response.status === ResultCodes.SUCCESS_200) {
        dispatch(setUsers(response.data))
    } else {
        return Promise.reject(processResponseStatus(response.status))
    }
}

export const findUsersThunk = (searchString: string) =>
    async (dispatch: AppDispatch, getState: GetState) => {
        const ids = getUsersIdsBySearchString(getState().users.users, searchString)
        if (ids.length) {
            dispatch(setFoundUsers(getFoundUsers(getState().users.users, ids)))            
            dispatch(setSearchStatus('found'))
        } else {
            dispatch(setResponseError(ResponseErrors.NOT_FOUND))
        }
    }

export const setUserProfileThunk = (id: number) =>
    async (dispatch: AppDispatch, getState: GetState) => {
        const foundUsers = getState().users.foundUsers
        foundUsers.forEach(user => {
            if (user.id === id) {
                dispatch(setProfile(user))
            }
        })
    }