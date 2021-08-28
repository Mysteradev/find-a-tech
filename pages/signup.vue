<template>
  <div>
    <v-stepper v-model='e1'>
      <v-stepper-header>
        <v-stepper-step
          :complete='e1 > 1'
          step='1'
        >
          Inscription
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete='e1 > 2'
          step='2'
        >
          Information supplémentaires
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step='1'>
          <v-form @submit.prevent='createUser'>
            <v-container>
              <v-row>
                <v-col
                  cols='12'
                  md='4'
                >
                  <v-text-field
                    v-model='email'
                    label='Email'
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols='12'
                  md='4'
                >
                  <v-text-field
                    v-model='password'
                    label='Mot de passe'
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append='showPassword = !showPassword'
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols='12'
                  md='4'
                >
                  <v-text-field
                    v-model='checkPassword'
                    label='Veuillez saisir à nouveau votre mot de passe'
                    required
                  ></v-text-field>
                </v-col>

                <v-radio-group
                  v-model='status'
                  row
                >
                  <v-radio
                    label='Je suis un particulier'
                    value='jobSeeker'
                  ></v-radio>
                  <v-radio
                    label='Je suis une entreprise'
                    value='enterprise'
                  ></v-radio>
                </v-radio-group>

              </v-row>
            </v-container>
          </v-form>

          <v-btn
            color='primary'
            @click='e1 = 2'
          >
            Continuer
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step='2'>
          <!--TODO This is uppershit-->
          <div class='row' v-if='status === "jobSeeker"'>
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
              <v-slider
                v-model='age'
                color='blue'
                label='Age'
                min='16'
                max='80'
                thumb-label
              ></v-slider>
            </v-col>

            <v-col
              cols='12'
              md='6'
            >
              <v-autocomplete
                v-model='city'
                :loading='isCityLoading'
                :items='cityLists'
                :search-input.sync='search'
                color='white'
                hide-no-data
                hide-selected
                item-text='Description'
                item-value='API'
                label='Lieu de résidence'
                placeholder='Paris, Grenoble...'
                prepend-icon='mdi-database-search'
                return-object
              ></v-autocomplete>
            </v-col>
          </div>

          <div class='row' v-if='status === "enterprise"'>
            <v-col
              cols='12'
              md='6'
            >
              <v-text-field
                v-model='enterpriseName'
                label="Nom de l'entreprise"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols='12'
              md='6'
            >
              <v-text-field
                v-model='lastName'
                label="Nombre d'employés"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols='12'
              md='12'
            >
              <v-textarea
                counter
                label="Description de l'entreprise"
                placeholder='Présentez vous à votre public 😉'
                :rules="[v => v.length <= 50 || 'Maximum 50 caractères']"
                v-model='description'
              ></v-textarea>
            </v-col>

            <v-col
              cols='12'
              md='6'
            >
              <v-autocomplete
                v-model='city'
                :loading='isCityLoading'
                :items='cityLists'
                :search-input.sync='search'
                color='white'
                hide-no-data
                hide-selected
                item-text='Description'
                item-value='API'
                label='Localisation du siège social'
                placeholder='Paris, Grenoble...'
                return-object
              ></v-autocomplete>
            </v-col>

            <v-col
              cols='12'
              md='6'
            >
              <v-autocomplete
                v-model='languageSelected'
                :items='languages'
                item-text='name'
                outlined
                dense
                chips
                small-chips
                label='Les technos de votre entreprise'
                multiple
                return-object
              ></v-autocomplete>
            </v-col>

          </div>

          <v-btn
            color='primary'
            @click=''
          >
            Confirmer
          </v-btn>

          <v-btn text>
            Annuler
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      email: '',
      password: '',
      checkPassword: '',
      showPassword: false,
      status: '',
      firstName: '',
      lastName: '',
      showDatePicker: false,
      age: 0,
      city: '',
      search: '',
      cityLists: [],
      isCityLoading: false,
      e1: 1,
      description: '',
      languages: [],
      languageSelected: [],
      enterpriseName: ''
    }
  },
  methods: {
    createUser() {
      this.$axios.post('/api/user', {
        email: this.email,
        password: this.password
      })
    },

    fetchCity() {
      //TODO Add debounce function
      if (!this.search.length) {
        this.cityLists = []
        return
      }

      this.$axios.get(`https://api-adresse.data.gouv.fr/search/?q=${this.search}&type=municipality&autocomplete=1`)
        .then(cities => {
          cities.data.features.forEach(city => {
            this.cityLists.push(city.properties.city)
          })
        })
        .catch(() => {
          // TODO Create a new toast
          alert('Erreur')
        })
        .finally(() => {
          this.isCityLoading = false
        })
    }
  },

  watch: {
    search() {
      this.fetchCity()
    }
  },

  async fetch() {
    this.languages = await fetch('http://localhost:3000/api/language')
      .then(async res => res.json())
      .catch(() => {
        // TODO Create a new toast on error
      })
  }
}
</script>

<style scoped>

</style>
