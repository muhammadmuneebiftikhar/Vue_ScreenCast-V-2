<template>
  <div class="home grey lighten-3">
    <div class="display-4 ma-4 d-flex justify-center">All Videos</div>

    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video._id" class="ma-2 pa-2">
        <v-card
          max-width="335px"
          hover
          :to="{ name: 'video-watch', params: { _id: video._id } }"
        >
          <v-img :src="video.thumbnail" />
          <v-card-title> {{ video._id }}. {{ video.name }}</v-card-title>
          <v-card-text>
            <div class="green--text" v-if="isPlayed(video._id)">
              <font-awesome-icon icon="check" />
              Played
            </div>
          </v-card-text>
          <!-- <div v-html="video.description"></div> -->
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "home",
  computed: {
    ...mapState(["videos"]),
    ...mapGetters(["isPlayed"]),
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.video-box {
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  img {
    width: 200px;
    padding: 10px;
  }
}
</style>
