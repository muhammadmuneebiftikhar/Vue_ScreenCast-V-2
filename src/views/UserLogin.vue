<template>
  <v-container>
        <h1>Login</h1>
      <userAuthForm :submitForm="loginUser" buttonText="Login"/>
  </v-container>
</template>

<script>
import userAuthForm from "@/components/UserAuthForm";

export default {
    components: {
        userAuthForm,
    },
    methods: {
        async loginUser(userInfo){
            let user = await this.$store.dispatch("loginUser", userInfo);
            if(user.error){
                this.$store.dispatch("setSnackbar", {color: "error" , text: user.error });
            } else {
                this.$store.dispatch("setSnackbar", { text: `Thank you for signing in ` +user.name });
                if(user.admin) {
                    this.$router.push('/admin/videos');
                } else {
                    this.$router.push('/');
                }
            }
        }
    }
}
</script>

<style>

</style>