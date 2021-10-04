<template>
  <v-container>
    <h1>Registeration</h1>
    <userAuthForm
      :submitForm="registerUser"
      buttonText="Registeration"
      hasName="true"
    />
  </v-container>
</template>

<script>
import userAuthForm from "@/components/UserAuthForm";

export default {
  components: {
    userAuthForm,
  },
  methods: {
    async registerUser(registerationInfo) {
      let user = await this.$store.dispatch("registerUser", registerationInfo);
      if (user.error) {
        alert(user.error);
        this.$store.dispatch("setSnackbar", {
          color: "error",
          text: user.error,
        });
      } else {
        this.$store.dispatch("setSnackbar", {
          text: `Welcome to Our App ` + user.name,
        });
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
