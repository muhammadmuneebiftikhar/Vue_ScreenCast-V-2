<template>
  <v-container>
    <h1>Video List</h1>
    <v-btn text to="/admin/video/new">Add Video</v-btn>

    <div class="flex-table">
      <div>Name</div>
      <div>Description</div>
      <div>Actions</div>
    </div>
    <div v-for="video in videos" :key="video._id" class="flex-table">
      <div>{{ video.name }}</div>
      <div>{{ video.description | abbreviate }}</div>
      <div class="actions">
        <router-link :to="{ name: 'video-watch', params: { _id: video._id } }"
          >Watch</router-link
        >
        <router-link
          :to="{ name: 'admin-video-edit', params: { _id: video._id } }"
          >Edit</router-link
        >
        <v-btn x-small @click="deleteVideo(video)">Delete</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["videos"]),
  },
  filters: {
    abbreviate(text) {
      if (text) {
        text = text.replace("<p>", "");
        return text.slice(0, 50);
      }
    },
  },
  methods: {
    deleteVideo(video) {
      let response = confirm(`Are you sure you want to delete ${video.name}`);
      if (response) {
        this.$store.dispatch("deleteVideo", video);
        this.$store.dispatch("setSnackbar", {
          text: `You have successfully deleted a video ${video.name}.`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  padding: 10px;
  border-bottom: 1px black solid;
  &:nth-of-type(2n) {
    background-color: #dedede;
  }
  .actions {
    * {
      padding-right: 15px;
    }
  }
}
</style>
