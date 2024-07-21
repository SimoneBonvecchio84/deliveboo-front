<script>
import axios from 'axios'
import {store} from '../store'
import AppCard from '../components/AppCard.vue'
import AppHero from '../components/AppHero.vue'


export default {
  components: {
    AppCard,
    AppHero,
    
  },
  data() {
    return {
      restaurantsList: [],
      typesList: [],
      selectedTypes: [],
      baseSrc: "http://127.0.0.1:8000/storage",
      store
    }
  },
  created() {
    this.CallRestaurant()
    this.CallTypes()
  },
  methods: {
    CallRestaurant() {
      const selectedTypesJson = encodeURIComponent(JSON.stringify(this.selectedTypes)); // Codifica l'array in una stringa URL
      axios.get(`http://127.0.0.1:8000/api/restaurants?type=${selectedTypesJson}`)
        .then(response => {
          this.restaurantsList = response.data.result;
        })
        .catch(error => {
          console.error('Errore durante la chiamata API:', error.message || JSON.stringify(error));
        });
    },

    CallTypes() {
      axios.get('http://127.0.0.1:8000/api/types', {
        params: {},
      })
        .then(response => {

          this.typesList = response.data.result;
        })
        .catch(error => {
          console.error('Errore durante la chiamata API:', error);
        });
    },
    SelectType(id, isChecked) {
      if (isChecked) {
        // Aggiungi l'ID del tipo all'array se il checkbox è selezionato
        this.selectedTypes.push(id);
      } else {
        // Rimuovi l'ID del tipo dall'array se il checkbox è de-selezionato
        const index = this.selectedTypes.indexOf(id);
        if (index > -1) {
          this.selectedTypes.splice(index, 1);
        }
      }
      this.CallRestaurant();
    },
  }
}
</script>

<template>
  <AppHeader />
  <AppHero />

<div class="ms-homepage">
  <!-- checkbox types -->
  <div class="container w-50 mt-5">
    <div class="row justify-content-center align-items-center">
      <div v-for="curType in typesList" :key="curType.id"
        class="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6 mb-2 gap-2 btn-group btn-group-toggle">
        <input type="checkbox" class="btn-check" :id="'type-' + curType.id" name="types" :value="curType.id"
          @change="(event) => { SelectType(event.target.value, event.target.checked); }">
        <label class="btn btn-outline-primary w-25 p-2" :for="'type-' + curType.id">{{ curType.name }}</label>
      </div>
    </div>
  </div>
  <!-- /checkbox types -->

  <!-- card-container -->
  <div class="container p-5">
    <div class="row gap-4 justify-content-center">

      <!-- card -->
      <div v-for="curRestaurant in restaurantsList" :key="curRestaurant.id"
        class="card col-lg-3 col-md-4 col-sm-5 col-7 p-0">
        <AppCard :cardObj="curRestaurant" />
      </div>
      <!-- /card -->

    </div>
  </div>
  <!-- /card container -->

  <div class="col-12 text-center">

    <!-- <button class="btn btn-outline-danger">Mostra altri</button> -->
  </div>
</div>

</template>

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

/* .ms-homepage{
  margin-bottom: 300px;
} */

</style>