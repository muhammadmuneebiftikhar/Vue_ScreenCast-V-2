<template>
  <v-app>
    <v-app-bar
      app
      color="green"
    >
      <div class="d-flex align-center">
        <v-btn text to="/">Vue ScreenCast</v-btn>
        <v-btn text to="/admin/videos" v-if="currentUser.admin">Admin</v-btn>
      </div>

      <v-spacer></v-spacer>
      <div v-if="currentUser.name">
        {{currentUser.name}}
        <v-btn text @click="logoutUser">
          <span class="mr-2">LogOut</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      
      <div v-else>
        <v-btn text :to="{ name:'user-login'}" class="mr-2"> Login </v-btn>
        <v-btn text :to="{ name:'user-registeration'}" class="mr-2"> Registeration </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-snackbar
        v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
        :key="snackbar.text + Math.random()"
        v-model="snackbar.showing"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        :style="`bottom: ${(index * 60) + 8}px`"
    >
                {{snackbar.text}}
        
        <v-btn text @click="snackbar.showing = false">
            Close
        </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch("loadVideos");
    this.$store.dispatch("loadCurrentUser");
  },
  computed: {
    ...mapState(["currentUser", "snackbars"])
  },
  methods: {
    logoutUser(){
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    }
  }
};
</script>
