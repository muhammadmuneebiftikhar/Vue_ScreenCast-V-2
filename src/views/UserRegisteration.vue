<template>
    <v-container>
        <h1>Registeration</h1>
        <userAuthForm :submitForm="registerUser" buttonText="Registeration" hasName=true />
    </v-container>
</template>

<script>
import userAuthForm from "@/components/UserAuthForm";

export default {
    components: {
        userAuthForm,
    },
    methods: {
        async registerUser(registerationInfo){
            let user = await this.$store.dispatch("registerUser", registerationInfo);
            if(user.error){
                alert(user.error);
            } else {
                alert("Welcome to our App " + user.name);
            }
        }
    }
}
</script>

<style>

</style>