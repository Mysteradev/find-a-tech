<template>
  <v-container>
    <v-row>
      <h1>Inscription</h1>
    </v-row>

    <JobSeekerForm/>
  </v-container>
</template>

<script>
import JobSeekerForm from '~/components/Register/JobSeekerForm'

export default {
  name: 'jobseeker',
  middleware: 'register',
  components: {
    JobSeekerForm
  }
}
</script>

<style scoped>

</style>
