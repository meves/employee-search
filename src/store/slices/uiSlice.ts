import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../redux-store"

interface UIState {
    usersLoading: boolean
    profileLoading: boolean
}

const initialState: UIState = {
    usersLoading: false,
    profileLoading: false
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setUsersLoading: (state, action: PayloadAction) => {
            state.usersLoading = true
        },
        resetUsersLoading: (state, action: PayloadAction) => {
            state.usersLoading = false
        },
        setProfileLoading: (state, action: PayloadAction) => {
            state.usersLoading = true
        },
        resetProfileLoading: (state, action: PayloadAction) => {
            state.usersLoading = false
        }
    }
})

export const {
    setUsersLoading,
    resetUsersLoading,
    setProfileLoading,
    resetProfileLoading,

} = uiSlice.actions

export default uiSlice.reducer

export const selectUsersLoading = (state: RootState) => state.ui.usersLoading
export const selectProfileLoading = (state: RootState) => state.ui.profileLoading