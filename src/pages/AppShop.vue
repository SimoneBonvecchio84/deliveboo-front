<script>
export default {
  data() {
    return {
      slug: '',
      cart: {
        items: {},
        totalQuantity: 0,
        totalPrice: 0
      },
      curQuantity: 0,
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
    aggiorna(dish, value) {
      console.log(dish);
      // Save dish data
      let quantity = 0;
      if (value == 1) {
        quantity = 1;
      } else {
        quantity = -1;
      }

      const dish_id = dish.dish_id;
      const dish_name = dish.name;
      const price = parseFloat(dish.price);
      this.curQuantity = dish.quantity;
      console.log(this.curQuantity, dish_id, dish_name, price);

      // Retrieve the cart saved in localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart && savedCart !== 'undefined') {
        this.cart = JSON.parse(savedCart);
      }
      this.addToCart(dish_id, dish_name, quantity, price);


      console.log(this.cart);
      // this.$store.dispatch('updateRestaurantId', restaurant_id);
    },
    addToCart(dish_id, dish_name, quantity, price) {
      // Check if `cart` and `cart.items` are defined
      if (!this.cart) {
        console.error('Cart is not defined');
        this.cart = {
          items: {},
          totalQuantity: 0,
          totalPrice: 0
        };
      }

      if (!this.cart.items) {
        this.cart.items = {};
      }

      // Update total price
      if (quantity === 1) {
        this.cart.totalPrice += price;
        this.cart.totalQuantity += quantity;
        this.curQuantity += quantity;
        console.log(this.cart.totalPrice);
      } else if (this.cart.items[dish_id].quantity) {
        this.cart.totalQuantity += quantity;
        this.curQuantity += quantity;
        this.cart.totalPrice -= price;
        console.log(this.cart.totalPrice);
      }
      // /Update total price

      // Add/remove quantity in the cart or remove item
      if (!this.cart.items[dish_id] && quantity === 1) {
        this.cart.items[dish_id] = {
          dish_id: dish_id,
          name: dish_name,
          quantity: quantity,
          price: price
        };
      } else {
        if (this.cart.items[dish_id]) {
          this.cart.items[dish_id].quantity += quantity;
          this.curQuantity += quantity;

          if (this.cart.items[dish_id].quantity <= 0) {
            delete this.cart.items[dish_id];
            if (Object.keys(this.cart.items).length === 0) {
              this.clearCart();
            }
          }
        }
      }
      // / Add/remove quantity in the cart or remove item


      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    clearCart() {
      console.log("ciao");
      // Empty all items from the cart
      this.cart.items = {};
      // Reset the total quantity
      this.cart.totalQuantity = 0;
      // Reset the total price
      this.cart.totalPrice = 0;

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.store.slug = "";
      console.log('Carrello svuotato.');
    },

    calculateTotalPrice() {
      // Calculate the total price of the cart
      this.cart.totalPrice = Object.values(this.cart.items).reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);

    }
  }
}
</script>

<template>
  <div class="container md_cont">
    <div class="d-flex  flex-column justify-content-center align-items-center gap-2 mb-5">
      <h1 class="text-center">Carrello</h1>
      <router-link :to="{ name: 'showrestaurant', params: { slug: slug.toString() } }">
        <span class="btn btn-primary">Torna al menu</span>
      </router-link>
    </div>

    <div v-if="Object.keys(cart.items).length > 0">

      <table class="table table-striped w-75 m-auto text-center mb-5 border">
        <thead>
          <tr>
            <th scope="col">Piatto</th>
            <th scope="col">Quantita</th>
            <th scope="col">Prezzo</th>
            <th scope="col">Totale</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(article, index) in Object.values(cart.items)" :key="index">
            <td scope="row">{{ article.name }}</td>
            <td  class="d-flex justify-content-center">
              <!-- btn less -->
              <div @click.prevent="aggiorna(article, -1)"
                class="btn btn-danger ms-btn d-flex justify-content-center align-items-center">
                <a class="text-decoration-none text-white fw-bold">-</a>
              </div>
              <!-- /btn less -->
              <span class="ms-3 me-3">
                {{ article.quantity }}
              </span>
              <!-- btn add -->
              <div @click.prevent="aggiorna(article, 1)"
                class="btn btn-success ms-btn d-flex justify-content-center align-items-center ">
                <a class="text-decoration-none text-white fw-bold">+</a>
              </div>
              <!-- /btn add -->
            </td>
            <td>{{ (article.price).toFixed(2) }}€</td>
            <td>{{ (article.price * article.quantity).toFixed(2) }}€</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div>
                <p>
                  <strong>Prezzo Totale Carrello:</strong><br>
                </p>
                {{ cart.totalPrice.toFixed(2) }}€
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center w-50 m-auto gap-2">
        <button class="btn btn-dark mb-2 mb-sm-0 w-100 w-sm-25 mb-5 w-25">
          <router-link :to="{ name: 'checkout' }" href="http://localhost:5174/checkout" class="ms_checkout">
            Checkout
          </router-link>
        </button>
        <button type="button" class="btn btn-danger mb-2 mb-sm-0 w-100 w-sm-25 mb-5 w-25 text-nowrap"
          data-toggle="modal" data-target="#exampleModal">
          Svuota carrello
        </button>
      </div>

    </div>

    <div v-else class="form-container text-center">
      <div class="border rounded-5 p-5">
        <span>Il tuo carrello è vuoto</span>
      </div>
    </div>

  </div>

  <!-- CART EMPTY MODAL -->

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog text-center" role="document">
      <div class="modal-content">
        <div class="modal-body d-flex flex-column gap-4">
          <span class="modal-title text-danger fw-bold fs-3" id="exampleModalLabel"> ATTENZIONE!</span>
          <span class="fs-4">Sei sicuro di voler svuotare il carrello?</span>
        </div>
        <div class="modal-footer d-flex justify-content-around">
          <button type="button" class="btn btn-danger w-25" data-dismiss="modal">Annulla</button>
          <button type="button" class="btn btn-primary w-25" @click.prevent="clearCart()"
            data-dismiss="modal">Conferma</button>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF CART EMPTY MODAL -->

</template>

<!-- @click.prevent="clearCart()" -->

<style scoped>
.md_cont {
  margin-top: 200px;
  /* margin-bottom: 50px; */
  min-height: 100vh;
}

.ms_checkout {
  text-decoration: none;
  color: white;
}

.ms-btn {
  width: 35px;
  aspect-ratio: 1;
}

@media (max-width: 768px) {
  .w-sm-25 {
    width: 100% !important;
  }

  .mb-sm-0 {
    margin-bottom: 0 !important;
  }
}
</style>
