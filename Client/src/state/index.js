import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode:"light",
    user:null,
    token:null,
    symbol:null,

};

export const authSlice = createSlice({
    name: "auth",
    initialState ,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setSearchedWord: (state, action) => {
            state.symbol = action.payload;
        }
    }
});

export const { setMode, setSearchedWord } = authSlice.actions;

export default authSlice.reducer;