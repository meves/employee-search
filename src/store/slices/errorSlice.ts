import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../redux-store"
import { ResponseError } from "../types"

interface ErrorState {
    responseError: ResponseError | null
}

const initialState: ErrorState = {
    responseError: null
}

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setResponseError: (state, action: PayloadAction<ResponseError>) => {
            state.responseError = action.payload
        },
        resetResponseError: (state, action: PayloadAction) => {
            state.responseError = null
        }
    }
})

export const {
    setResponseError,
    resetResponseError

} = errorSlice.actions

export default errorSlice.reducer

export const selectResponseError = (state: RootState) => state.errors.responseError