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
                alert(user.error);
            } else {
                alert("Thank you for signing in " + user.name);
            }
        }
    }
}
</script>

<style>

</style>