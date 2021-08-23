import Vue from "vue";
import Vuex from "vuex";
import api from "@/service/api"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    playedVideos: [2, 3, 4],
  },
  mutations: {
    SET_VIDEOS(state, videos){
      state.videos = videos;
    }
  },
  actions: {
    async loadVideos({commit}){
      let result = await api().get("/videos")
      commit("SET_VIDEOS", result.data.videos);
    }
  },
  modules: {},
});
