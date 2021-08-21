<template>
  <v-app>
    <v-app-bar
      app
      color="green"
    >
      <div class="d-flex align-center">
        <v-btn 
        text
        href="http://localhost:8080/#/"
        >
          <span class="mr-2">Vue ScreenCast</span>
        </v-btn>

        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
      >
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
