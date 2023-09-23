import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, GetState, RootState } from "../redux-store"
import { User } from "../types"
import { usersApi } from "../../api/users-api"
import { ResultCodes } from "../../api/http-codes"
import { setSearchStatus } from "./searchSlice"
import { getUsersIdsBySearchString, getFoundUsers } from "../libs/utils"
import { resetProfileLoading, resetUsersLoading, setProfileLoading, setUsersLoading } from "./uiSlice"

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
        resetUser: (state, action: PayloadAction) => {
            state.user = null
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
    resetUser,
    setUsers,
    setFoundUsers

} = usersSlice.actions

export default usersSlice.reducer

export const selectUser = (state: RootState) => state.users.user
export const selectFoundUsers = (state: RootState) => state.users.foundUsers

export const getUserThunk = (id: string) =>
    async (dispatch: AppDispatch) => {
        const response = await usersApi.getUser(String(id))
        if (response.status === ResultCodes.SUCCESS_200) {
            return response.data
        } else {
            return new Error('Error')
        }        
    }

export const getUsersThunk = () =>
async (dispatch: AppDispatch) => {
    const response = await usersApi.getUsers()
    if (response.status === ResultCodes.SUCCESS_200) {
        dispatch(setUsers(response.data))
    } else if (response.status === ResultCodes.BAD_REQUEST_400) {
        return Promise.reject('Введены неверные данные')
    } else if (response.status === ResultCodes.NOT_FOUND_404) {
        return Promise.reject('По вашему запросу ничего не найдено')
    } else if (response.status === ResultCodes.SERVER_ERROR_500) {
        return Promise.reject('Ошибка сервера')
    }    
}

export const findUsersThunk = (searchString: string) =>
    async (dispatch: AppDispatch, getState: GetState) => {
        dispatch(setUsersLoading())
        const ids = getUsersIdsBySearchString(getState().users.users, searchString)
        if (ids.length) {
            dispatch(setFoundUsers(await getFoundUsers(ids, dispatch)))
            dispatch(setSearchStatus('found'))
        } else {
            dispatch(setSearchStatus('notfound'))
        }
        dispatch(resetUsersLoading())
    }

export const setCurrentUserThunk = (id: number) =>
    async (dispatch: AppDispatch, getState: GetState) => {
        dispatch(setProfileLoading())
        const foundUsers = getState().users.foundUsers
        foundUsers.forEach(user => {
            if (user.id === id) {
                dispatch(setUser(user))
            }
        })
        dispatch(resetProfileLoading())
    }