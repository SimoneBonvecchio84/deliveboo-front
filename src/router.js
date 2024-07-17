import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/AppHomePage.vue';
import ShowRestaurant from './pages/ShowRestaurant.vue';

// modifica
export const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/restaurant/:slug',
      name: 'show-restaurant',
      component: ShowRestaurant,
      props: true
    }
  ];
// modifica

export const router = createRouter({
    history: createWebHistory(),
    routes: [
       
      
    ]
});