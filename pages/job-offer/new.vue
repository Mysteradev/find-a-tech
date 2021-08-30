<template>
  <v-form
    ref='form'
  >
    <v-text-field
      v-model='title'
      label='Titre'
      required
    ></v-text-field>

    <v-textarea
      v-model='description'
      label='Description'
      required
    ></v-textarea>

    <v-select
      v-model='selectSalary'
      :items='salaries'
      label='Salaire'
      required
    ></v-select>

    <v-select
      v-model='selectContract'
      :items='contractTypes'
      label='Contrat'
      required
    ></v-select>

    <v-text-field
      v-model='location'
      label='Localisation'
      required
    ></v-text-field>

    <v-btn
      color='success'
      class='mr-4'
      @click='createOffer'
    >
      Creer l'offre
    </v-btn>

  </v-form>
</template>

<script>
export default {
  name: 'job-offer',

  data() {
    return {
      title: '',
      description: '',
      selectSalary: null,
      salaries: [
        '500 - 1000',
        '1000 - 1500',
        '1500 - 2000',
        '2000 - 2500'
      ],
      selectContract: null,
      contractTypes: [
        'Freelance',
        'CDI',
        'CDD',
        'Alternance'
      ],
      location: ''
    }
  },

  methods: {
    createOffer() {
      this.$axios.post('/api/joboffer', {
        title: this.title,
        description: this.description,
        salary: this.selectSalary,
        contractType: this.selectContract,
        location: this.location
      })
    }
  }
}
</script>

<style scoped>

</style>
