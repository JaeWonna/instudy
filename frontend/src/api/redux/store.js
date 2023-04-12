import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';

// import storage from 'redux-persist/lib/storage'; // for local storage
import storage from 'redux-persist/lib/storage/session' // for session storage

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  });