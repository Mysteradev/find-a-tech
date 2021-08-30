<template>
  <v-row>
    <v-col>
      <v-card v-if='offer'>
        <v-card-title>
          {{ offer.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ offer.enterprise.name }}
          <v-icon small>mdi-map-marker</v-icon>
          {{ offer.location }} •
          <v-icon small>mdi-currency-eur</v-icon>
          {{ offer.salary }}
        </v-card-subtitle>
        <v-card-text>
          {{ offer.description }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'id',

  data() {
    return {
      offer: {}
    }
  },
  async fetch() {
    this.offer = await fetch(
      `http://localhost:3000/api/joboffer/${this.$route.params.id}`
    ).then(res => res.json())
  }
}
</script>

<style scoped>

</style>
