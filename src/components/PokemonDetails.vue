<template>
  <div v-if="pokemon">
    <v-card class="pokemon-details-card">
      <v-card-title class="headline pokemon-name">{{ pokemon.name }}</v-card-title>
      <v-card-text>
        <v-img
        :src="pokemon.sprites.front_default"
        alt="Pokemon image"
        class="pokemon-image"
        ></v-img>
        <div class="pokemon-details-grid">
          <p><strong>Height:</strong> {{ pokemon.height }}</p>
          <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
          <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
          <p><strong>Types:</strong>
            <v-list class="pokemon-types">
              <v-list-item v-for="type in pokemon.types" :key="type.type.name">
                <v-list-item-content>- {{ type.type.name }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </p>
          <p><strong>Abilities:</strong>
            <v-list class="pokemon-abilities">
              <v-list-item v-for="ability in pokemon.abilities" :key="ability.ability.name">
                <v-list-item-content>- {{ ability.ability.name }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn class="back-button" @click="closeDialog">
          Back
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'PokemonDetails',
  data() {
    return {
      pokemon: null
    };
  },
  async created() {
    const pokemonName = this.$route.params.name;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) throw new Error('Pokemon not found');
      this.pokemon = await response.json();
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    }
  },
  methods: {
    closeDialog() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.v-card{
  border-radius: 0 !important;
  height: 100vh;
}
.v-list{
  background: none;
  color: #00ff00;
}
.pokemon-details-card {
  background-color: #111111;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
.pokemon-name {
  color: #de5239;
}
.pokemon-image {
  cursor: pointer;
  width: 200px;
  margin: 0 auto;
}
.pokemon-details-grid {
  display: block;
  gap: 10px;
  text-align: left;
}
.pokemon-details-grid p {
  margin: 5px 0;
}
.pokemon-types,
.pokemon-abilities {
  margin: 0;
  padding: 0;
}
.back-button {
  background-color: #00ff00;
  color: #111111;
  width: 100%;
}
</style>