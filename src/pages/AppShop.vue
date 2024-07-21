<script>
export default {
  data() {
    return {
      slug: '',
      cart: {
        items: {},
        totalQuantity: 0,
        totalPrice: 0
      }
    }
  },
  created() {
  this.slug = this.$route.params.slug;
  console.log(this.slug); 
  const savedCart = localStorage.getItem('cart');
  if (savedCart && savedCart !== 'undefined') {
    this.cart = JSON.parse(savedCart);
  }
  console.log(this.cart);
},
  methods: {
    clearCart() {
      // Svuota tutti gli articoli dal carrello
      this.cart.items = {};
      // Resetta la quantità totale
      this.cart.totalQuantity = 0;
      // Resetta il prezzo totale
      this.cart.totalPrice = 0;

      // Salva il carrello aggiornato nel localStorage
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.removeItem('restaurant_id');

      console.log('Carrello svuotato.');
    },
  }
}
</script>

<template>
  <div class="container md_cont ">
    <div class="d-flex  flex-column justify-content-center align-items-center gap-2 mb-5">
      <h1 class="text-center">Carrello</h1>
      <router-link :to="{ name: 'showrestaurant', params: { slug: slug.toString() } }">
        <span class="btn btn-primary">Torna al menu</span>
      </router-link>
    </div>

    <div v-if="Object.keys(cart.items).length > 0">
      <table class="table table-striped w-75 m-auto mb-5 border">
        <thead>
          <tr>
            <th scope="col">piatto</th>
            <th scope="col">quantita</th>
            <th scope="col">prezzo</th>
            <th scope="col">totale</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(article, index) in Object.values(cart.items)" :key="index">
            <td scope="row">{{ article.name }}</td>
            <td>{{ article.quantity }}</td>
            <td>{{ (article.price).toFixed(2) }}€</td>
            <td>{{ (article.price * article.quantity).toFixed(2) }}€</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <p> <strong>Prezzo Totale Carrello:</strong><br>
                {{ cart.totalPrice.toFixed(2) }}€</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center align-items-center w-50 m-auto gap-2">
        <a class="btn btn-success mb-5 w-25" href="">
          Checkout
        </a>
        <a class="btn btn-danger mb-5 w-25" @click.prevent="clearCart()" href="">
          Svuota carrello
        </a>
      </div>
    </div>
    <div v-else class="form-container text-center">
      <div class="border rounded-5 p-5">
        <span>Il tuo carrello è vuoto</span>
      </div>
    </div>
  </div>

</template>

<style scoped>
.md_cont {
  margin-top: 200px;
}
</style>
// // Recupera il carrello salvato nel localStorage
// const savedCart = localStorage.getItem('cart');
// if (savedCart && savedCart !== 'undefined') {
// this.cart = JSON.parse(savedCart);
// }

// console.log(this.$route.params);

// // Recupera i parametri dalla rotta
// const quantity = parseInt(this.$route.params.quantity);
// const dish_id = this.$route.params.dish_id;
// const dish_name = this.$route.params.dish_name;
// const restaurant_id = this.$route.params.restaurant_id;
// const price = parseFloat(this.$route.params.price); // Assicurati che il prezzo sia un numero

// // Controlla se un restaurant_id esiste in localStorage
// let savedRestaurantId = localStorage.getItem('restaurant_id');

// // Verifica se savedRestaurantId è valido
// if (savedRestaurantId && savedRestaurantId !== 'undefined') {
// // Analizza il restaurant_id salvato da localStorage
// const parsedSavedRestaurantId = JSON.parse(savedRestaurantId);

// // Confronta il corrente restaurant_id con quello salvato
// if (parsedSavedRestaurantId === restaurant_id) {
// console.log('Aggiungendo elemento al carrello poiché gli ID dei ristoranti corrispondono.');
// // Utilizza il prezzo recuperato per aggiungere un elemento al carrello
// this.addToCart(dish_id, dish_name, quantity, price);
// } else {
// console.log('Differente ID di ristorante rilevato.');
// // Interroga l'utente per decidere se vuoi svuotare il carrello
// const userDecision = confirm("Stai cambiando ristorante. Vuoi svuotare il carrello?");
// if (userDecision) {
// console.log('Svuotamento del carrello...');
// // Svuota il carrello
// this.clearCart();
// // Aggiorna il restaurant_id in localStorage
// localStorage.setItem('restaurant_id', JSON.stringify(restaurant_id));
// // Aggiungi il nuovo articolo al carrello vuoto
// this.addToCart(dish_id, dish_name, quantity, price);
// } else {
// console.log('Utente ha deciso di non svuotare il carrello.');
// }
// }
// } else {
// console.log('Nessun restaurant_id salvato trovato in localStorage.');
// // Questo potrebbe essere una nuova sessione o la prima visita al sito
// // Inizializza il restaurant_id
// localStorage.setItem('restaurant_id', JSON.stringify(restaurant_id));
// // Aggiungi anche il primo articolo nel carrello vuoto
// this.addToCart(dish_id, dish_name, quantity, price);
// }

// console.log(this.cart);
// },
// methods: {
// addToCart(dish_id, dish_name, quantity, price) {
// // Se l'articolo non esiste nel carrello, aggiungilo
// if (!this.cart.items[dish_id]) {
// this.cart.items[dish_id] = {
// dish_id: dish_id,
// name: dish_name,
// quantity: quantity,
// price: price
// };
// } else {
// // Se l'articolo esiste, aggiorna la quantità
// this.cart.items[dish_id].quantity += quantity;
// }

// // Aggiorna la quantità totale e il prezzo totale del carrello
// this.cart.totalQuantity += quantity;
// this.cart.totalPrice += price * quantity;

// // Salva il carrello aggiornato nel localStorage
// localStorage.setItem('cart', JSON.stringify(this.cart));

// },

// clearCart() {
// // Svuota tutti gli articoli dal carrello
// this.cart.items = {};
// // Resetta la quantità totale
// this.cart.totalQuantity = 0;
// // Resetta il prezzo totale
// this.cart.totalPrice = 0;

// // Salva il carrello aggiornato nel localStorage
// localStorage.setItem('cart', JSON.stringify(this.cart));

// console.log('Carrello svuotato.');
// },

// calculateTotalPrice() {
// // Calcola il prezzo totale del carrello
// this.cart.totalPrice = Object.values(this.cart.items).reduce((total, item) => {
// return total + (item.price * item.quantity);
// }, 0);

// }
