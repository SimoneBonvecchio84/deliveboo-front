<script>
import AppCarousel from '../components/AppCarousel.vue'
import {store} from '../store'

export default {
    components: {
    AppCarousel,
  },
  data() {
    return {
      baseSrc: "http://127.0.0.1:8000/storage",
      store,
      name: 'Hero'
    }
  },
}
</script>

<template>
    <div class="hero d-flex justify-content-center align-item-center">   
        <AppCarousel />
    </div> 
</template>

<style scoped>
.hero {
    background-color: #ff0000;
    color: #fff;
    padding: 40px 0;
    height: 500px;
}

.hero h1 {
    font-size: 3rem;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
}

.img-fluid {
    max-width: 100%;
    height: auto;
}
</style>