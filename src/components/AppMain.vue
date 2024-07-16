<template>
  <section class="main-content">
    <div class="container">
      <div class="row mb-3">
        <div class="col-12 d-flex flex-wrap justify-content-center">
          <div
            v-for="category in categories"
            :key="category"
            class="form-check form-check-inline"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :id="category"
              :value="category"
            />
            <label class="form-check-label" :for="category">{{
              category
            }}</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="restaurants in restaurant"
          :key="restaurant.id"
          class="col-12 col-md-4 mb-4"
        >
          <div class="card h-100">
            <img :src="restaurant.image" class="card-img-top" alt="Immagine" />
            <div class="card-body">
              <h5 class="card-title">{{ restaurant.name }}</h5>
              <p class="card-text">{{ restaurant.description }}</p>
              <p class="card-text">
                <small class="text-muted">{{
                  restaurant.categories.join(" • ")
                }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <button class="btn btn-primary">Mostra altri</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MainContent',
  data() {
    return {
      categories: ['Americana', 'Giapponese', 'Cinese', 'Italiana', 'Messicana', 'Indiana', 'Francese', 'Tailandese', 'Vegetariana'],
      restaurants: [] // Array per contenere i dati dei ristoranti
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    fetchRestaurants() {
  axios.get('http://127.0.0.1:8000/api/restaurants', {
    params: {},  // Se non ci sono parametri da passare, lascia l'oggetto params vuoto o rimuovilo se non necessario
  })
  .then(response => {
    
    this.restaurants = response.data.result;
    console.log(this.restaurants);
  })
  .catch(error => {
    console.error('Errore durante la chiamata API:', error);
  });
}
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px 0;
}

.form-check-inline {
  margin: 10px;
}

.card {
  height: 100%;
}

.card-img-top {
  width: 100%;
  height: auto;
}
</style>
