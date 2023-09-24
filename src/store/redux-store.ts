import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './slices/searchSlice'
import usersReducer from './slices/usersSlice'
import uiReducer from './slices/uiSlice'
import errorReducer from './slices/errorSlice'

export const store = configureStore({
    reducer: {
        search: searchReducer,
        users: usersReducer,
        ui: uiReducer,
        errors: errorReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GetState = typeof store.getState