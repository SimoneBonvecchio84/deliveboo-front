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
  <div class="container md_cont">
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
        <a class="btn btn-success mb-2 mb-sm-0 w-100 w-sm-25 mb-5 w-25" href="">
          Checkout
        </a>
        <button type="button" class="btn btn-danger mb-2 mb-sm-0 w-100 w-sm-25 mb-5 w-25"  data-toggle="modal" data-target="#exampleModal">
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

  <!-- MODALE CHIUSURA CARRELLO -->

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
          <button type="button" class="btn btn-primary w-25" @click.prevent="clearCart()" data-dismiss="modal">Conferma</button>
        </div>
      </div>
    </div>
  </div>
  <!-- CHIUSURA MODALE CARRELLO -->
</template>

<!-- @click.prevent="clearCart()" -->

<style scoped>
.md_cont {
  margin-top: 200px;
  /* margin-bottom: 50px; */
  min-height: 100vh;
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
