import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../components/PokemonList.vue';
import PokemonDetails from '../components/PokemonDetails.vue';

const routes = [
  {
    path: '/',
    name: 'PokemonList',
    component: PokemonList
  },
  {
    path: '/pokemon/:name',
    name: 'PokemonDetails',
    component: PokemonDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;