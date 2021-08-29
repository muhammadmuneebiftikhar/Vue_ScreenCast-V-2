<template>
  <v-app>
    <v-app-bar
      app
      color="green"
    >
      <div class="d-flex align-center">
        <v-btn text to="/">Vue ScreenCast</v-btn>
        <v-btn text to="/video/new">Add Video</v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2">SignUp</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch("loadVideos");
  },
  data: () => ({
    //
  }),
};
</script>
