<template>
  <v-container>
      <h1>Video Create Page</h1>
      <v-row>
        <v-col md="3" cols="12">
          <VideoEditForm :video="video" :saveVideo="createVideo" buttonText="Create Video"/>
        </v-col>  
        <v-col md="9" cols="12">
          <v-card max-width="335px" hover >
              <v-img :src="video.thumbnail" />
              <v-card-title> {{ video._id }}  {{ video.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>  
  </v-container>
</template>

<script>
import VideoEditForm from "@/components/VideoEditForm.vue";

export default {
  components: {
    VideoEditForm,
  },
  data() {
        return {
           video: {},
        } 
    },
    methods: {
      async createVideo(){
        let video = await this.$store.dispatch("createVideo", this.video);
        this.$router.push({ name: "video-watch", params: {_id : video._id }});
      }
    }
}
</script>

<style lang="scss" scoped>
</style>