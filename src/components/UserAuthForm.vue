<template>
  <v-form>
    <v-text-field
      v-model="userInfo._id"
      label="ID"
      :rules="[required('Id')]"
      v-if="hasName"
    />
    <v-text-field
      v-model="userInfo.name"
      label="Name"
      :rules="[required('Name')]"
      v-if="hasName"
    />
    <v-text-field
      v-model="userInfo.email"
      label="Email"
      :rules="[required('Email'), emailFormat()]"
    />
    <v-text-field
      v-model="userInfo.password"
      label="Password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      counter="true"
      :rules="[required('Password'), minLength('Password', 8)]"
    />
    <v-text-field
      v-model="userInfo.admin"
      label="Admin"
      :rules="[required('Admin Check True or False')]"
      v-if="hasName"
    />
    <v-btn @click="submitForm(userInfo)">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
import validation from "@/utils/validations";

export default {
  data() {
    return {
      showPassword: true,
      userInfo: {
        email: "",
        password: "",
      },
      ...validation,
    };
  },
  props: ["submitForm", "buttonText", "hasName"],
};
</script>

<style></style>
