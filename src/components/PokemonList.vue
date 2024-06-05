<template class="primary">
  <v-app>
    <v-main>
      <v-container fluid>
        <h1>Pokemons List</h1>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              label="Search Pokemon"
              v-model="search"
              @keyup.enter="selectPokemonByName"
              class="white--text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="searchHistory.length">
          <v-col cols="12">
            <div class="d-flex">
              <h2 class="tit-history">History</h2>
              <v-col cols="12" sm="3">
                <v-btn @click="clearList" class="clear-list-btn">
                  Clear
                </v-btn>
              </v-col>
            </div>
            <v-row>
              <v-col
                v-for="pokemon in searchHistory"
                :key="pokemon.name"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card @click="selectPokemon(pokemon)">
                  <v-img
                    :src="getPokemonImageUrl(pokemon)"
                    alt="Pokemon image"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                  ></v-img>
                  <v-card-title>{{ pokemon.name }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2>Pokémon List</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="pokemon in pokemons"
            :key="pokemon.name"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card @click="selectPokemon(pokemon)">
              <v-img
                :src="getPokemonImageUrl(pokemon)"
                alt="Pokemon image"
                class="white--text align-end"
                height="200px"
                width="200px"
              ></v-img>
              <v-card-title>{{ pokemon.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-col cols="12" sm="12">
          <v-btn @click="loadMorePokemons" class="load-more-btn">
            Load More
          </v-btn>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PokemonList',
  data() {
    return {
      search: '',
      pokemons: [],
      searchHistory: [],
      offset: 0,
      limit: 21,
      selectedPokemon: null
    };
  },
  methods: {
    async fetchPokemons() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`
        );
        if (!response.ok) throw new Error('Failed to fetch pokemons');
        const data = await response.json();
        this.pokemons = [...this.pokemons, ...data.results];
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    },
    async selectPokemonByName() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.search.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        this.selectedPokemon = data;
        this.addPokemonToHistory(data);
        this.$router.push(`/pokemon/${this.search.toLowerCase()}`);
      } catch (error) {
        console.error('Error fetching pokemon by name:', error);
      }
    },
    async selectPokemon(pokemon) {
      this.$router.push({ name: 'PokemonDetails', params: { name: pokemon.name } });
    },
    addPokemonToHistory(pokemon) {
      const existingIndex = this.searchHistory.findIndex(p => p.name === pokemon.name);
      if (existingIndex === -1) {
        this.searchHistory.unshift(pokemon);
        if (this.searchHistory.length > 10) {
          this.searchHistory.pop();
        }
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      }
    },
    getPokemonImageUrl(pokemon) {
      if (pokemon.id) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
      }
      if (pokemon.url) {
        const id = this.getPokemonId(pokemon.url);
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      }
      return '';
    },
    getPokemonId(url) {
      const parts = url.split('/');
      return parts[parts.length - 2];
    },
    loadMorePokemons() {
      this.offset += this.limit;
      this.fetchPokemons();
    },
    clearList() {  
      this.searchHistory = [];
      localStorage.removeItem('searchHistory');
    },
    loadLocalStorageData() {
      const storedHistory = localStorage.getItem('searchHistory');
      this.fetchPokemons();
      if (storedHistory) {
        this.searchHistory = JSON.parse(storedHistory);
      }
    }
  },
  created() {
    this.loadLocalStorageData();
  }
};
</script>

<style scoped>
.v-img {
  cursor: pointer;
  width: 200px;
  margin: 0 auto;
}
.v-card {
  text-align: center;
}
.load-more-btn {
  margin-top: 20px;
  display: block;
  width: 100%;
  text-align: center;
}
</style>