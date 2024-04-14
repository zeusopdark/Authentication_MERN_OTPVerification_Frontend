import { createSlice } from "@reduxjs/toolkit"

export const rootReducer = createSlice({
    name: "root",
    initialState: {
        loading: true,
        userInfo: {},
        username: ""
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        }

    }
});

export const { setUsername, setUserInfo } = rootReducer.actions;
export default rootReducer.reducer;