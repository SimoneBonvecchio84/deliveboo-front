<script>
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
    <AppHero />
    <AppHomePage />
    <ShowRestaurant />
  </div>
</template>


<style>

</style>