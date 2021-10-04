import Vue from "vue";
import Vuex from "vuex";
import api from "@/service/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    users: [],
    currentUser: [],
    snackbars: [],
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      Vue.set(state.currentUser, "playedVideos", playedVideos);
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      let playedVideos = state.currentUser.playedVideos.concat(videoId);
      state.currentUser.playedVideos = playedVideos;
    },
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video);
      state.videos = videos;
    },
    DELETE_VIDEO(state, videoId) {
      let videos = state.videos.filter((v) => v._id != videoId);
      state.videos = videos;
    },
    EDIT_VIDEO(state, video) {
      state.videos.forEach((v) => {
        if (v._id == video._id) {
          v = video;
        }
      });
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
  },
  actions: {
    async loadVideos({ commit }) {
      let result = await api().get("/videos");
      commit("SET_VIDEOS", result.data.videos);
    },
    async loadCurrentUser({ commit, dispatch }) {
      //GETTING CURRENT USER FROM LOCAL STORE
      let user = JSON.parse(window.localStorage.currentUser);
      commit("SET_CURRENT_USER", user);
      dispatch("loadPlayedVideos", user._id);
    },
    async loadPlayedVideos({ commit }) {
      let user = JSON.parse(window.localStorage.currentUser);
      let response = await api().get(`/users/${user._id}`);
      user = response.data.attributes;
      commit("SET_PLAYED_VIDEOS", user.played_video_ids);
    },
    async loadUsers({ commit }) {
      let result = await api().get("/users");
      let users = result.data.users;
      commit(
        "SET_USERS",
        users.map((u) => u.attributes)
      );
    },
    markPlayed({ commit, state }, videoId) {
      if (state.currentUser.name) {
        commit("MARK_VIDEO_PLAYED", videoId);
        let user = JSON.parse(window.localStorage.currentUser);
        api().put(`/users/${user._id}`, { played_video_ids: videoId });
      }
    },
    async createVideo({ commit }, video) {
      let response = await api().post("/videos", video);
      let savedVideo = response.data;
      commit("ADD_VIDEO", savedVideo);
      return savedVideo;
    },
    async deleteVideo({ commit }, video) {
      let response = await api().delete(`/videos/${video._id}`);
      if (response.status == 200) {
        commit("DELETE_VIDEO", video._id);
      }
    },
    async editVideo({ commit }, video) {
      let response = await api().put(`/videos/${video._id}`, video);
      let newVideo = response.data;
      commit("EDIT_VIDEO", newVideo);
      return newVideo;
    },
    logoutUser({ commit }) {
      commit("LOGOUT_USER");
    },
    async loginUser({ commit, dispatch }, loginInfo) {
      try {
        let response = await api().post("/sessions", loginInfo);
        let user = response.data.user;
        commit("SET_CURRENT_USER", user);
        dispatch("loadPlayedVideos", user._id);
        return user;
      } catch {
        return {
          error:
            "Email/Password combination was not correct. Please try again.",
        };
      }
    },
    async registerUser({ commit, dispatch }, registerationInfo) {
      try {
        let response = await api().post("/users", registerationInfo);
        let user = response.data;

        commit("SET_CURRENT_USER", user);
        dispatch("loadPlayedVideos", user._id);

        return user;
      } catch {
        return { error: "There is an error. Please try again." };
      }
    },
    setSnackbar({ commit }, snackbar) {
      snackbar.showing = true;
      snackbar.color = snackbar.color || "success";
      commit("SET_SNACKBAR", snackbar);
    },
  },
  modules: {},
  getters: {
    playedVideos: (state) => {
      return state.currentUser.playedVideos || [];
    },
    isPlayed: (state, getters) => (videoId) => {
      return getters.playedVideos.includes(videoId);
    },
  },
});
