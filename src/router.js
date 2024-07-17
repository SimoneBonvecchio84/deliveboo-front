import { createRouter, createWebHistory } from "vue-router";
import AppHomePage from './pages/AppHomePage.vue';
import ShowRestaurant from './pages/ShowRestaurant.vue';

// modifica
// export const routes = [
//   ];
// modifica

// export const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//       {
//         path: '/',
//         name: 'home',
//         component: Home
//       },
//       {
//         path: '/showrestaurant/:slug',
//         name: 'showrestaurant',
//         component: ShowRestaurant,
//         // props: true
//       }
//     ]
// });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHomePage
    },
    {
      path: '/showrestaurant/:slug',
      name: 'showrestaurant',
      component: ShowRestaurant,
      // props: true
    }
  ],
});

export { router };