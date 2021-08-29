<template>
  <v-container>
      <h1>Video Create Page</h1>
      <v-row>
        <v-col md="3" cols="12">

          <v-text-field v-model="video._id" label="ID"/>
          <v-text-field v-model="video.name" label="Name"/>
          <v-textarea v-model="video.description" label="Description"/>
          <v-text-field v-model="video.thumbnail" label="Thumbnail URL"/>
         <v-text-field v-model="video.videoUrl" 
                      label="Video URL" 
                      hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." />
          
          <v-btn @click="createVideo">Create Video</v-btn>
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

export default {
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