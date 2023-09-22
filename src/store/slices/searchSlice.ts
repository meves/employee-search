import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../redux-store"
import { SearchStatus } from "../types"

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
        }
    }
})

export const {
    setSearchStatus

} = searchSlice.actions

export default searchSlice.reducer

export const selectsearchStatus = (state: RootState) => state.search.searchStatus