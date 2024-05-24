import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Playlist from "../../models/playlist-model";
import { produce } from 'immer';

interface PlaylistsState {
    playlists: Playlist[];
}

const initialState: PlaylistsState = {
    playlists: [],
};

export const PlaylistSlice = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {
        loadPlaylists: (state, action: PayloadAction<PlaylistsState>) => {
            return action.payload;
        },
        addPlaylist: (state, action: PayloadAction<Playlist>) => {
            state.playlists.push(action.payload);
        },
        updatePlaylist: (
            state,
            action: PayloadAction<{ playlistId: string; updatedPlaylist: Partial<Playlist> }>
        ) => {
            const { playlistId, updatedPlaylist } = action.payload;
            const playlistIndex = state.playlists.findIndex(
                (playlist) => playlist._id === playlistId
            );

            if (playlistIndex !== -1) {
                state.playlists[playlistIndex] = {
                    ...state.playlists[playlistIndex],
                    ...updatedPlaylist,
                };
            }
        },
        deletePlaylist: (state, action: PayloadAction<string>) => {
            const playlistIdToDelete = action.payload;
            state.playlists = state.playlists.filter(
              (playlist) => playlist._id !== playlistIdToDelete
            );
          },
    }
});

export const { loadPlaylists, addPlaylist, updatePlaylist } = PlaylistSlice.actions;

export default PlaylistSlice.reducer;
