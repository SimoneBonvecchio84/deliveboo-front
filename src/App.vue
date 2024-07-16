<script>
    import AppHeader from './components/AppHeader.vue'
    import AppHero from './components/AppHero.vue'

    export default {
      name: 'App',
      components: {
        AppHeader,
        AppHero
      }
    }
</script>
    
<template>
  <div id="app">
    <AppHeader />
    <AppHero />
    <main>
      <!-- Il contenuto principale dell'app -->
    </main>
  </div>
</template>


<style>
/* Aggiungi i tuoi stili personalizzati qui */
</style>