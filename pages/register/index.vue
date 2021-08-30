<template>
  <v-container>
    <v-row>
      <h1>Inscription</h1>
    </v-row>

    <SignupForm/>
  </v-container>
</template>

<script>
import SignupForm from '~/components/Register/SignupForm'

export default {
  name: 'register',
  components: {
    SignupForm
  }
}
</script>

<style scoped>

</style>
