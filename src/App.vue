<script>
    import { RouterView } from 'vue-router'
    import AppHeader from './components/AppHeader.vue'
    import AppHero from './components/AppHero.vue'
    import AppHomePage from './pages/AppHomePage.vue'
    import ShowRestaurant from './pages/ShowRestaurant.vue'

    export default {
      name: 'App',
      components: {
        AppHeader,
        AppHero,
        AppHomePage,
        ShowRestaurant
      }
    }
</script>
    
<template>
  <div id="app">
    <AppHeader />
    <router-view></router-view>
    <!-- <AppFooter /> -->
  </div>
</template>


<style>

</style>