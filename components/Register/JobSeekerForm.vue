<template>
  <v-form @submit.prevent='sendData' v-model='valid'>
    <v-container>
      <v-row>
        <v-col
          cols='12'
          md='6'
        >
          <v-text-field
            v-model='firstName'
            label='Prénom'
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols='12'
          md='6'
        >
          <v-text-field
            v-model='lastName'
            label='Nom de famille'
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols='12'
          md='6'
        >
          <v-autocomplete
            v-model='adress'
            :loading='loading'
            :items='cities'
            :search-input.sync='search'
            cache-items
            hide-no-data
            hide-details
            label='Lieu de résidence'
          ></v-autocomplete>
        </v-col>

        <v-col
          cols='12'
          md='6'
        >
          <v-menu
            ref="menuOpen"
            v-model="menuOpen"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="birthdateFormatted"
                label="Date"
                v-bind="attrs"
                @blur="birthdate = parseDate(birthdateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="birthdate"
              no-title
              @input="menuOpen = false"
              :first-day-of-week="1"
              locale="fr-fr"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col
          cols='12'
        >
          <v-autocomplete
            v-model="selectedLanguages"
            :items="languages"
            color="blue-grey lighten-2"
            label="Choisissez vos technologies"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >
                {{ data.item.name }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>

        <v-btn
          type='submit'
          class='ma-2'
          color='primary'
        >
          Valider mon inscription
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'JobSeekerForm',
  data() {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      age: 0,
      adress: '',
      search: '',
      cities: [],
      loading: false,
      menuOpen: false,
      birthdate: null,
      birthdateFormatted: null,
      languages: [],
      selectedLanguages: []
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.getCities(val)
      if (!val) {
        this.cities = []
      }
    },
    birthdate (val) {
      this.birthdateFormatted = this.formatDate(this.birthdate)
    },
  },
  methods: {
    getCities(val) {
      this.loading = true

      this.cities = []

      this.$axios.get(`https://api-adresse.data.gouv.fr/search/?q=${val}&type=municipality&autocomplete=1`)
        .then(res => {
          res.data.features.forEach(city => {
            this.cities.push(city.properties.city)
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    remove (item) {
      const index = this.selectedLanguages.indexOf(item.name)
      if (index >= 0) {
        this.selectedLanguages.splice(index, 1)
      }
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`
    },
    sendData() {
      this.$axios.post(`${process.env.apiUrl}/user/jobseeker`, {
        email: this.getEmail,
        password: this.getPassword,
        firstName: this.firstName,
        lastName: this.lastName,
        age: 45,
        adress: this.adress
      })
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    getEmail() {
      return this.$store.state.UserSignup.email
    },
    getPassword() {
      return this.$store.state.UserSignup.password
    }
  },
  async fetch() {
    this.languages = await fetch(`${process.env.apiUrl}/language`)
      .then(languages => languages.json())
  }
}
</script>

<style scoped>

</style>
