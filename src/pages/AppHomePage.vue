<script>
import axios from "axios";
import { store } from "../store";
import AppCard from "../components/AppCard.vue";
import AppHero from "../components/AppHero.vue";

export default {
  components: {
    AppCard,
    AppHero,
  },
  data() {
    return {
      restaurantsList: [], // List to store restaurant data
      typesList: [], // List to store types of restaurants
      selectedTypes: [], // Array to store selected restaurant types
      baseSrc: "http://127.0.0.1:8000/storage", // Base URL for image sources
      store,
      slug:'',
      cart:'',
      isLoading: false, // Flag to manage loading state
    };
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.slug = localStorage.getItem('slug');
    console.log(this.cart.items);
    console.log(this.slug);
    this.CallRestaurant();
    this.CallTypes();

  },
  methods: {
    CallRestaurant() {
      const selectedTypesJson = encodeURIComponent(
        JSON.stringify(this.selectedTypes)
      ); // Codifica l'array in una stringa URL
      axios
        .get(`http://127.0.0.1:8000/api/restaurants?type=${selectedTypesJson}`)
        .then((response) => {
          this.isLoading = true;
          this.restaurantsList = response.data.result; // Update restaurantsList with API response
        })
        .catch((error) => {
          console.error(
            "Errore durante la chiamata API:",
            error.message || JSON.stringify(error)
          );
        });
    },

    CallTypes() {
      axios
        .get("http://127.0.0.1:8000/api/types", {
          params: {},
        })
        .then((response) => {
          this.typesList = response.data.result;
        })
        .catch((error) => {
          console.error("Errore durante la chiamata API:", error);
        });
    },

    SelectType(id, isChecked) {
      if (isChecked) {
        // Add the type ID to the array if the checkbox is selected
        this.selectedTypes.push(id);
      } else {
        // Remove the type ID from the array if the checkbox is deselected
        const index = this.selectedTypes.indexOf(id);
        if (index > -1) {
          this.selectedTypes.splice(index, 1);
        }
      }
      this.CallRestaurant(); // Remove the type ID from the array if the checkbox is deselected
    },
    getCartItemsLength() {
    return this.cart && this.cart.items ? Object.keys(this.cart.items).length : 0;
  }
  },
};
</script>

<template>
  <AppHeader />

  <AppHero />
  
  
  <div class="ms-homepage" v-if="isLoading">
        <!-- cart-container -->
        <div v-if="getCartItemsLength() > 0"
            class="cart-container d-flex flex-column justify-content-center align-items-center position-fixed bottom-5 end-0">

            <!-- insert quantity cart-shop -->
            <div class="md_circle">
                <span>
                    {{ cart.totalQuantity }}
                </span>
            </div>
            <!-- /insert quantity cart-shop -->

            <!-- cart-shop router-link -->
            <router-link :to="{ name: 'cartshopping', params: { slug: slug } }">
                <i class="fa-solid fa-cart-shopping text-white"></i>
            </router-link>
            <!-- /cart-shop router-link -->

        </div>
        <!-- /cart-container -->


    <!-- checkbox types -->
    <div class="container w-50 mt-5">
      <div class="row justify-content-center align-items-center">
        <div
          v-for="curType in typesList"
          :key="curType.id"
          class="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6 mb-2 gap-2 btn-group btn-group-toggle"
        >
          <input
            type="checkbox"
            class="btn-check"
            :id="'type-' + curType.id"
            name="types"
            :value="curType.id"
            @change="
              (event) => {
                SelectType(event.target.value, event.target.checked);
              }
            "
          />
          <label
            class="btn btn-outline-primary w-25 p-1 rounded"
            :for="'type-' + curType.id"
            >{{ curType.name }}</label
          >
        </div>
      </div>
    </div>
    <!-- /checkbox types -->

    <!-- card-container -->
    <div class="container p-5">
      <div
        class="row gap-4 justify-content-center"
        v-if="restaurantsList.length > 0"
      >
        <!-- card -->
        <div
          v-for="curRestaurant in restaurantsList"
          :key="curRestaurant.id"
          class="card col-lg-3 col-md-4 col-sm-5 col-7 p-0"
        >
          <AppCard :cardObj="curRestaurant" />
        </div>
        <!-- /card -->
      </div>

      <!-- No match div for search -->
      <div
        class="row align-items-center border rounded-5 py-3 px-4 text-center"
        v-else
      >
        <p class="fw-bold fs-1 p-0 m-0">
          Nessun ristorante corrispondente alla tua ricerca
        </p>
      </div>
      <!-- /No match div for search -->
    </div>
    <!-- /card container -->

    <!-- MORE RESULT NOT USED AT THE MOMENT -->
    <!-- <div class="col-12 text-center"> -->
    <!-- <button class="btn btn-outline-danger">Mostra altri</button> -->
    <!-- </div> -->
  </div>
</template>

<style scoped>
.main-content {
  padding: 20px 0;
}

.form-check-inline {
  margin: 10px;
}

/* card style */

.card {
  height: 100%;
}

.card-img-top {
  width: 100%;
  height: auto;
}

/* /card styles */

.ms-homepage {
  min-height: 60vh;
  margin-bottom: 50px;
}

/* cart */
.carrello{
    width: 100px; /* Width of the cart element */
    height: 100px; /* Height of the cart element */
    margin-top: 100px; /* Top margin to position the cart element */
}

.cart-container {
    background-color: #004a93;
    width: 40px;
    aspect-ratio: 1;
    cursor: pointer;
    z-index: 99;
}

.md_circle {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    bottom: 30px;
    right: 30px;
    font-size: 1rem;
    background-color: orange;
    color: white;
}
/* cart */


/* Riduci la dimensione del testo rendendolo responsive per tutti i breakpoint */

.btn {
  font-size: 1rem;
}

@media (max-width: 1200px) {
  .btn {
    font-size: 1.2rem;
  }
}

@media (max-width: 992px) {
  .btn {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .btn {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .btn {
    font-size: 0.8rem;
  }
}

@media (max-width: 400px) {
  .btn {
    font-size: 0.7rem;
  }
}

@media (max-width: 360px) {
  .btn {
    font-size: 0.6rem; 
  }
}

/* Riduci la dimensione del testo rendendolo responsive per tutti i breakpoint */

</style>
