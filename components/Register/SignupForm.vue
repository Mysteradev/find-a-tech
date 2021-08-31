<template>
  <v-form v-model='valid'>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="email"
            :rules='emailRules'
            label="Email"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="password"
            :counter="30"
            label="Mot de passe"
            :rules='passwordRules'
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            hint="Minimum 8 caractères, maximum 30 caractères"
            @click:append='showPassword = !showPassword'
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="verifPassword"
            label="Veuillez confirmer votre mot de passe"
            :rules='passwordVerifRules'
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols='12'
        >
          <v-card
            :elevation='0'
          >
            <v-list two-line class='py-0'>
              <template v-for="n in availableStatus">
                <v-list-item
                  @click='status = n.value'
                  :class='[n !== availableStatus[availableStatus.length - 1] ? "mb-4" : "mb-0", n.value === status ? "v-list-item-selected" : ""]'
                  class='rounded-lg'
                  :key="n.title"
                >
                  <v-list-item-avatar color="grey darken-1">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ n.title }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ n.description }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-btn
          class='ma-2'
          color='primary'
          :to='nextStep'
          :disabled='!valid'
          nuxt
        >
          Continuer
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'SignupForm',
  data() {
    return {
      valid: false,
      emailRules: [
        v => !!v || 'Une adresse e-mail est requise !',
        v => /.+@.+\..+/.test(v) || "Adresse e-mail incorrect",
      ],
      passwordRules: [
        v => !!v || 'Veuillez saisir un mot de passe',
        v => /[a-zA-Z0-9]{8,30}/.test(v) || 'Le mot de passe doit être au minimum de 8 caractères, et doit comporter au moins une majuscule et un chiffre',
      ],
      passwordVerifRules: [
        v => !!v || 'Veuillez saisir à nouveau votre mot de passe',
      ],
      showPassword: false,
      verifPassword: '',
      status: '',
      availableStatus: [
        {
          title: "Je cherche du travail",
          description: "Je crée mon compte et j'accède aux offres d'emploi",
          value: "jobSeeker"
        },
        {
          title: "Je cherche mon futur employé",
          description: "Je crée mon profil recruteur, et j'accède rapidement aux milliers de profils...",
          value: "enterprise"
        }
      ],
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state['UserSignup/email']
      },
      set(value) {
        this.$store.commit('UserSignup/updateEmail', value)
      }
    },
    password: {
      get () {
        return this.$store.state['UserSignup/password']
      },
      set(value) {
        this.$store.commit('UserSignup/updatePassword', value)
      }
    },
    nextStep() {
      if(this.status) {
        return this.status === 'enterprise' ? '/register/enterprise' : '/register/jobseeker'
      } else {
        return '#'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .v-list-item-selected.theme--dark {
    background: #202425;
  }
  .v-list-item.theme--dark {
    &:hover {
      background-color: #202425;
    }
  }
</style>
