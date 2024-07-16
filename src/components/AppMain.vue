<script>
import axios from 'axios'

export default {
  data() {
    return {
      restaurantsList: [],
      selectedTypes: [],
      types: [],
      baseSrc: "http://127.0.0.1:8000/storage"
    }
  },
  created() {
    const typeArray = [1, 2];
    this.CallRestaurant()
    this.CallTypes()
  },
  methods: {
    CallRestaurant() {
      console.log('ciao');
      const encodedTypes = encodeURIComponent(JSON.stringify(this.selectedTypes)); // Codifica l'array in una stringa URL
      axios.get(`http://127.0.0.1:8000/api/restaurants?type=${encodedTypes}`)
        .then(response => {
          this.restaurantsList = response.data.result;
          console.log(this.restaurantsList);
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

          this.types = response.data.result;
          console.log(this.types);
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
  <section class="main-content">
    <div class="container w-50">
      <div class="row justify-content-center align-items-center">
        <div v-for="curType in types" :key="curType.id"
          class="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6 mb-2 gap-2 btn-group btn-group-toggle">
          <input type="checkbox" class="btn-check" :id="'type-' + curType.id" name="types" :value="curType.id"
          @change="(event) => { SelectType(event.target.value, event.target.checked); }">
          <label class="btn btn-outline-primary w-25 p-2" :for="'type-' + curType.id">{{ curType.name }}</label>
        </div>
      </div>
    </div>
    <div class="container p-5">
      <div class="row gap-4 justify-content-center">
        <!-- card -->
        <div v-for="curRestaurant in restaurantsList" :key="curRestaurant.id"
          class="card col-lg-3 col-md-4 col-sm-5 col-7">

          <!-- image -->
          <img class="card-img-top" :src="`${baseSrc}/${curRestaurant.image}`" alt="Card image cap">
          <!-- /image -->

          <!-- card text -->
          <div class="card-body text-center d-flex flex-column">

            <!-- name -->
            <span class="card-title">
              <strong>
                {{ curRestaurant.name }}
              </strong>
            </span>

            <!-- address -->
            <span class="card-title">{{ curRestaurant.address }}</span>
            

            <ul v-if="curRestaurant.types && curRestaurant.types.length > 0" class="list-unstyled">
      <li v-for="(type, index) in curRestaurant.types" :key="index">
        <strong>
          Cucina: 
        </strong>
        {{ type.name }}
      </li>
    </ul>


            <!-- type gestire piu tipologie -->

            <!-- <div v-if="curRestaurant.type">
              <span><strong> Tipologia: </strong></span>
              <span class="badge text-black" :style="{ backgroundColor: curRestaurant.type.color }"> {{
                curRestaurant.type.name
              }}</span>
            </div> -->
            <!-- /type -->

          </div>
          <!-- /card text -->

        </div>
        <!-- /card -->

      </div>
    </div>
    <div class="col-12 text-center">
      <button class="btn btn-outline-danger">Mostra altri</button>
    </div>
  </section>
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
</style>
