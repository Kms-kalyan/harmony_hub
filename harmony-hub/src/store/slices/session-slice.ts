import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Session from "../../models/session-model";

export interface UserState {
    sessions: Session[];
  }
  
  const initialState: UserState = {
    sessions: [],
  };

  export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        addSession: (state, action: PayloadAction<Session>) => {
            state.sessions.push(action.payload);
          },
    }
  })

export const { addSession } = SessionSlice.actions;
export default SessionSlice.reducer;