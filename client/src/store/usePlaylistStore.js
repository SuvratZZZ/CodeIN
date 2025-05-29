import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const usePlaylistStore = create((set) => ({
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  error: null,

  // Fetch all playlists
  fetchPlaylists: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/playlists");
      set({ playlists: response.data.playlists, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch playlists",
        isLoading: false,
      });
      toast.error("Failed to fetch playlists");
    }
  },

  // Fetch a single playlist
  fetchPlaylist: async (playlistId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/playlists/${playlistId}`);
      set({ currentPlaylist: response.data.playlist, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch playlist",
        isLoading: false,
      });
      toast.error("Failed to fetch playlist");
    }
  },

  // Create a new playlist
  createPlaylist: async (playlistData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/api/playlists", playlistData);
      set((state) => ({
        playlists: [...state.playlists, response.data.playlist],
        isLoading: false,
      }));
      toast.success("Playlist created successfully");
      return response.data.playlist;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create playlist",
        isLoading: false,
      });
      toast.error("Failed to create playlist");
      throw error;
    }
  },

  // Update a playlist
  updatePlaylist: async (playlistId, playlistData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`/api/playlists/${playlistId}`, playlistData);
      set((state) => ({
        playlists: state.playlists.map((p) =>
          p._id === playlistId ? response.data.playlist : p
        ),
        currentPlaylist: response.data.playlist,
        isLoading: false,
      }));
      toast.success("Playlist updated successfully");
      return response.data.playlist;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update playlist",
        isLoading: false,
      });
      toast.error("Failed to update playlist");
      throw error;
    }
  },

  // Delete a playlist
  deletePlaylist: async (playlistId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`/api/playlists/${playlistId}`);
      set((state) => ({
        playlists: state.playlists.filter((p) => p._id !== playlistId),
        currentPlaylist: null,
        isLoading: false,
      }));
      toast.success("Playlist deleted successfully");
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete playlist",
        isLoading: false,
      });
      toast.error("Failed to delete playlist");
      throw error;
    }
  },

  // Like a playlist
  likePlaylist: async (playlistId) => {
    try {
      const response = await axios.post(`/api/playlists/${playlistId}/like`);
      set((state) => ({
        playlists: state.playlists.map((p) =>
          p._id === playlistId ? response.data.playlist : p
        ),
        currentPlaylist: response.data.playlist,
      }));
    } catch (error) {
      toast.error("Failed to like playlist");
      throw error;
    }
  },

  // Save a playlist
  savePlaylist: async (playlistId) => {
    try {
      const response = await axios.post(`/api/playlists/${playlistId}/save`);
      set((state) => ({
        playlists: state.playlists.map((p) =>
          p._id === playlistId ? response.data.playlist : p
        ),
        currentPlaylist: response.data.playlist,
      }));
    } catch (error) {
      toast.error("Failed to save playlist");
      throw error;
    }
  },

  // Clear current playlist
  clearCurrentPlaylist: () => {
    set({ currentPlaylist: null });
  },
}));

export default usePlaylistStore;
