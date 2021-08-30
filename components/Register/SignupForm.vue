<template>
  <v-form>
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
            :counter="25"
            label="Mot de passe"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            hint="Minimum 8 caractères"
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
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols='12'
        >
          <v-card>
            <v-list two-line>
              <template v-for="n in availableStatus">
                <v-list-item
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

                  <v-list-item-action>
                    <v-radio-group v-model="status">
                      <v-radio
                        :value="n.value"
                      ></v-radio>
                    </v-radio-group>
                  </v-list-item-action>
                </v-list-item>

                <v-divider
                  v-if="n !== availableStatus[availableStatus.length - 1]"
                  :key="`divider-${n}`"
                  inset
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-btn
          class='ma-2'
          color='primary'
          :to='nextStep'
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
      emailRules: [
        v => !!v || 'Une adresse e-mail est requise !',
        v => /.+@.+\..+/.test(v) || "Adresse e-mail incorrect",
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
      return this.status === 'enterprise' ? '/register/enterprise' : '/register/jobseeker'
    }
  }
}
</script>

<style scoped>
</style>
