import Vue from "vue";
import Vuex from "vuex";
import api from "@/service/api"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    playedVideos: [],
  },
  mutations: {
    SET_VIDEOS(state, videos){
      state.videos = videos;
    },
    SET_PLAYED_VIDEOS(state, playedVideos){
      state.playedVideos = playedVideos;
    },
    MARK_VIDEO_PLAYED(state, videoId){
      let playedVideos = state.playedVideos.concat(videoId);
      state.playedVideos = playedVideos;
      window.localStorage.playedVideos = JSON.stringify(playedVideos);
    },
    ADD_VIDEO(state, video){
      let videos = state.videos.concat(video);
      state.videos = videos;
    },
    DELETE_VIDEO(state, videoId){
      let videos = state.videos.filter(v=> v._id != videoId);
      state.videos = videos;
    },
    EDIT_VIDEO(state, video){
      state.videos.forEach(v=> {
        if(v._id == video._id){
          v = video;
        }
      })
    }
  },
  actions: {
    async loadVideos({commit}){
      let result = await api().get("/videos")
      commit("SET_VIDEOS", result.data.videos);
      let playedVideos = JSON.parse(window.localStorage.playedVideos);
      commit("SET_PLAYED_VIDEOS", playedVideos);
    },
    markPlayed({commit}, videoId){
      commit("MARK_VIDEO_PLAYED", videoId);
    },
    async createVideo({commit}, video){
      let response = await api().post("/videos", video);
      let savedVideo = response.data;
      commit("ADD_VIDEO", savedVideo);
      return savedVideo;
    },
    async deleteVideo({commit}, video){
      let response = await api().delete(`/videos/${video._id}`);
      if(response.status == 200) {
        commit("DELETE_VIDEO", video._id);
      }
    },
    async editVideo({commit}, video){
      let response = await api().put(`/videos/${video._id}`, video);
      let newVideo = response.data;
      commit("EDIT_VIDEO", newVideo);
      return newVideo;
    }
  },
  modules: {},
});
