<template>
    <v-form v-model="valid">
        <v-text-field v-model="video._id" label="ID"/>
        <v-text-field v-model="video.name" 
                        label="Name" 
                        counter=50
                        :rules="[required('Name'), minLength('Name', 5), maxLength('Name', 50)]"/>
        <v-textarea v-model="video.description" 
                        label="Description" 
                        counter=true
                        :rules="[required('Description'), minLength('Description', 20), maxLength('Name', 30)]"/>
        <v-text-field v-model="video.thumbnail" 
                        label="Thumbnail URL" 
                        :rules="[required('Thumbnail')]"/>
        <v-text-field v-model="video.videoUrl" 
                        label="Video URL"
                        :rules="[required('Video URL')]"
                        hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." />
        <v-btn @click="saveVideo" :disabled="!valid">{{buttonText}}</v-btn>
    </v-form>
</template>

<script>

import validation from "@/utils/validations";
export default {
    data() {
        return {
            valid: false,
            ...validation,
        }
    },
    props: ['video', 'saveVideo', 'buttonText']
}
</script>

<style>

</style>