// store/modules/videos.js

import $reels from '@/services/reels';

export default {
    namespaced: true,
    state: {
      videos: [], // Array to store video data
      videoLoaded: [], // Tracks loading status for each video
      videoError: [], // Tracks error status for each video
    },
    mutations: {
      SET_VIDEOS(state, videos) {
        state.videos = videos;
        state.videoLoaded = Array(videos.length).fill(false);
        state.videoError = Array(videos.length).fill(false);
      },
      APPEND_VIDEOS(state, videos) {
        state.videos.push(...videos);
        state.videoLoaded.push(...Array(videos.length).fill(false));
        state.videoError.push(...Array(videos.length).fill(false));
      },
      SET_VIDEO_LOADED(state, index) {
        state.videoLoaded[index] = true;
      },
      SET_VIDEO_ERROR(state, index) {
        state.videoError[index] = true;
      },
    },
    actions: {
      fetchVideos({ commit }, append = false) {
        return $reels.list().then((res) => {
          const videos = res.reels.map((video) => ({
            ...video,
            fallbackImage: video.fallbackImage || null,
          }));
          if (append) {
            commit("APPEND_VIDEOS", videos);
          } else {
            commit("SET_VIDEOS", videos);
          }
          return videos;
        });
      },
    },
    getters: {
      videos: (state) => state.videos,
      videoLoaded: (state) => state.videoLoaded,
      videoError: (state) => state.videoError,
    },
  };
  