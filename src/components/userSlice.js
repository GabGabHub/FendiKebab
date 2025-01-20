import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
        },
        clearUser: (state) => {
            state.id = null;
            state.name = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export const { reducer } = userSlice;