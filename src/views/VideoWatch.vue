<template>
  <v-container>
    <v-row>
    <v-col cols="12" md="9">
        <video-player
          ref="videoPlayer"
          :options="playerOptions"
        ></video-player>
    </v-col>
    <v-col md="3" cols="12">
    <div class="display-1">{{ video.name }}</div>
    <div class="green--text" v-if="isPlayed">Played</div>
    <div v-else> <v-btn x-small>Mark As Played</v-btn> </div>
    <div v-html="video.description"></div>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "video.js/dist/video-js.css";

import { videoPlayer } from "vue-video-player";
import { mapState } from 'vuex';

export default {
  components: {
    videoPlayer,
  },
  mounted() {
      this.$store.dispatch("loadVideos");
    },
  computed: {
    // ...mapState(['videos']),
    video() {
      return this.$store.state.videos.find(
        (vid) => vid._id == this.$route.params._id
      ) || {};
    },
    ...mapState(["playedVideos, videos"]),
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
    isPlayed() {
      return false;
    }
  },
};
</script>

<style>

</style>