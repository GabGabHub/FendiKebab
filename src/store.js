import { configureStore } from '@reduxjs/toolkit';
import { reducer as userSlice} from './components/userSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
});