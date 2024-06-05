<template class="primary">
  <div>
    <PokemonList @select="selectPokemon" />
  </div>
</template>

<script>
import PokemonList from '@/components/PokemonList.vue'

export default {
  name: 'AppHome',
  components: {
    PokemonList
  },
  methods: {
    selectPokemon(pokemon) {
      this.$router.push({ name: 'PokemonDetails', params: { id: pokemon.id } })
    }
  }
}
</script>
<style>
.primary {
  background-color: #212121;
  color: #ffffff;
}
</style>