<script>
    import AppHeader from './components/AppHeader.vue'
    import AppHero from './components/AppHero.vue'
    import AppMain from './components/AppMain.vue'

    export default {
      name: 'App',
      components: {
        AppHeader,
        AppHero,
        AppMain
      }
    }
</script>
    
<template>
  <div id="app">
    <AppHeader />
    <AppHero />
    <AppMain />
  </div>
</template>


<style>

</style>