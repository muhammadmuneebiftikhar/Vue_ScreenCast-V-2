<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">All Videos</div>

    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video.name" class="ma-2 pa-2">
      <v-card max-width="335px" hover :to="{ name: 'video-watch', params: { _id: video._id }}">
            <v-img :src="video.thumbnail" />
            <v-card-title>{{ video.name }}</v-card-title>
            <!-- <div v-html="video.description"></div> -->
    </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "home",
  components: {
  },
  methods: {},
  computed: {
      ...mapState(['videos']),
  }
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