<template>
  <v-container>
    <v-row>
      <v-col md='2'>
        //filtres des offres
      </v-col>
      <v-col md='8' v-if="offers.length">
        <v-row v-for='offer in offers' :key='offer.id' >
          <v-col>
            <v-card>
              <v-card-title>
                {{ offer.title }}
              </v-card-title>
              <v-card-subtitle>
                <v-icon small>mdi-map-marker</v-icon>
                {{ offer.location }} •
                <v-icon small>mdi-currency-eur</v-icon>
                {{ offer.salary }}
              </v-card-subtitle>
              <v-card-text>
                {{ offer.description }}
              </v-card-text>
              <v-card-actions>
                <nuxt-link :to="`job-offer/${offer.id}`">Voir l'offre
                </nuxt-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col md='8' v-else>Il n'y a plus d'offre</v-col>
      <v-col md='2'>
        //Call to action
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'job-offers',

  data() {
    return {
      offers: {}
    }
  },
  async fetch() {
    this.offers = await fetch('http://localhost:3000/api/joboffer').then(res =>
      res.json()
    )
  }
}
</script>

<style scoped>

</style>
