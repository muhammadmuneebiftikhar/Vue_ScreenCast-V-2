<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="9">
        <video-player
          ref="videoPlayer"
          :options="playerOptions"
          @ended="markPlayed"
        ></video-player>
      </v-col>
      <v-col md="3" cols="12">
        <div class="display-1">{{ video.name }}</div>
        <div class="green--text" v-if="isPlayed(video._id)">
          <font-awesome-icon icon="check" /> Played
        </div>
        <div v-else>
          <v-btn x-small v-on:click="markPlayed" v-if="currentUser.name"
            >Mark As Played</v-btn
          >
        </div>
        <div v-html="video.description"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "video.js/dist/video-js.css";

import { videoPlayer } from "vue-video-player";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    videoPlayer,
  },
  mounted() {
    this.$store.dispatch("loadVideos");
  },
  computed: {
    video() {
      return (
        this.$store.state.videos.find(
          (vid) => vid._id == this.$route.params._id
        ) || {}
      );
    },
    ...mapGetters(["isPlayed"]),
    ...mapState(["videos", "currentUser"]),
    playerOptions() {
      return {
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
        sources: [
          {
            type: "video/mp4",
            src: this.video.videoUrl,
          },
        ],
        poster: "/static/images/author.jpg",
        fluid: true,
      };
    },
  },
  methods: {
    markPlayed() {
      this.$store.dispatch("markPlayed", this.video._id);
    },
  },
};
</script>

<style></style>
