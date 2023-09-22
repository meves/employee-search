import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../redux-store"

interface UIState {
    loading: boolean
}

const initialState: UIState = {
    loading: false
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction) => {
            state.loading = true
        },
        resetLoading: (state, action: PayloadAction) => {
            state.loading = false
        }
    }
})

export const {
    setLoading,
    resetLoading

} = uiSlice.actions

export default uiSlice.reducer

export const selectLoading = (state: RootState) => state.ui.loading