import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../redux-store"
import { SearchStatus } from "../types"
import { resetUser } from "./usersSlice"

interface SearchState {
    searchStatus: SearchStatus
}

const initialState: SearchState = {
    searchStatus: 'start'
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchStatus: (state, action: PayloadAction<SearchStatus>) => {
            state.searchStatus = action.payload
        },
        resetStatus: (state, action: PayloadAction) => {
            state.searchStatus = 'start'
        }
    }
})

export const {
    setSearchStatus,
    resetStatus

} = searchSlice.actions

export default searchSlice.reducer

export const selectSearchStatus = (state: RootState) => state.search.searchStatus

export const resetSearchResultsThunk = () =>
    async (dispatch: AppDispatch) => {
        dispatch(resetStatus())
        dispatch(resetUser())
    }