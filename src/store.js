import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as userSlice } from './components/userSlice';

const persistConfig = {
  key: 'user',
  storage,     
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);