import { Store, configureStore, combineReducers } from "@reduxjs/toolkit";
import {PlaylistSlice} from "./slices/playlist-slice";
import {UserSlice} from "./slices/user-slice";
import {SessionSlice} from "./slices/session-slice";


const rootReducer = combineReducers({
    user: UserSlice.reducer,
    playlist: PlaylistSlice.reducer,
    session: SessionSlice.reducer
  });

export const store = configureStore({
    reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;