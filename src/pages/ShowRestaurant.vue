<script>
import axios from 'axios';
import AppLinkCart from '../components/AppLinkCart.vue';

export default {
    component: {
        AppLinkCart
    },
    data() {
        return {
            slug: '',
            restaurant: [],
            baseSrc: "http://127.0.0.1:8000/storage",
            id: "",
            cart: '',
        };
    },
    created() {
        // Prova a recuperare il carrello dalla localStorage e convertilo in un oggetto JavaScript
        let cartString = localStorage.getItem('cart');
        if (cartString) {
            try {
                this.cart = JSON.parse(cartString);
            } catch (error) {
                console.error("Errore durante la lettura del carrello:", error);
                // In caso di errore, imposta il carrello a un valore predefinito vuoto
                this.cart = {};
            }
        } else {
            // Se non esiste alcun carrello, inizializza un nuovo oggetto vuoto
            this.cart = {};
        }

        this.fetchRestaurant();
    },
    methods: {
        fetchRestaurant() {
            this.slug = this.$route.params.slug;
            console.log(typeof this.slug, this.slug);
            axios.get(`http://127.0.0.1:8000/api/restaurants/${this.slug}`)
                .then(response => {
                    this.restaurant = response.data.result;
                    console.log(this.restaurant);
                })
                .catch(error => {
                    console.error('Errore durante la chiamata API:', error.message || JSON.stringify(error));
                });
        },
        aggiorna(dish) {
            // salvataggio dati piatto
            const quantity = 1;
            const dish_id = parseInt(dish.id);
            const dish_name = dish.name;
            const restaurant_id = dish.restaurant_id;
            const price = parseFloat(dish.price);
            console.log(quantity, dish_id, dish_name, restaurant_id, price);

            // Recupera il carrello salvato nel localStorage
            const savedCart = localStorage.getItem('cart');
            if (savedCart && savedCart !== 'undefined') {
                this.cart = JSON.parse(savedCart);
            }
            // Controlla se un restaurant_id esiste in localStorage
            let savedRestaurantId = localStorage.getItem('restaurant_id');

            // Verifica se savedRestaurantId è valido
            if (savedRestaurantId && savedRestaurantId !== 'undefined') {
                // Analizza il restaurant_id salvato da localStorage
                const parsedSavedRestaurantId = JSON.parse(savedRestaurantId);

                // Confronta il corrente restaurant_id con quello salvato
                if (parsedSavedRestaurantId === restaurant_id) {
                    console.log('Aggiungendo elemento al carrello poiché gli ID dei ristoranti corrispondono.');
                    // Utilizza il prezzo recuperato per aggiungere un elemento al carrello
                    this.addToCart(dish_id, dish_name, quantity, price);
                } else {
                    console.log('Differente ID di ristorante rilevato.');
                    // Interroga l'utente per decidere se vuoi svuotare il carrello
                    const userDecision = confirm("Stai cambiando ristorante. Vuoi svuotare il carrello?");
                    if (userDecision) {
                        console.log('Svuotamento del carrello...');
                        // Svuota il carrello
                        this.clearCart();
                        // Aggiorna il restaurant_id in localStorage
                        localStorage.setItem('restaurant_id', JSON.stringify(restaurant_id));
                        // Aggiungi il nuovo articolo al carrello vuoto
                        this.addToCart(dish_id, dish_name, quantity, price);
                    } else {
                        console.log('Utente ha deciso di non svuotare il carrello.');
                    }
                }
            } else {
                console.log('Nessun restaurant_id salvato trovato in localStorage.');
                // Questo potrebbe essere una nuova sessione o la prima visita al sito
                // Inizializza il restaurant_id
                localStorage.setItem('restaurant_id', JSON.stringify(restaurant_id));
                // Aggiungi anche il primo articolo nel carrello vuoto
                this.addToCart(dish_id, dish_name, quantity, price);
            }

            console.log(this.cart);
            // this.$store.dispatch('updateRestaurantId', restaurant_id);
        },
        addToCart(dish_id, dish_name, quantity, price) {
            // Se l'articolo non esiste nel carrello, aggiungilo
            if (!this.cart.items[dish_id]) {
                this.cart.items[dish_id] = {
                    dish_id: dish_id,
                    name: dish_name,
                    quantity: quantity,
                    price: price
                };
            } else {
                // Se l'articolo esiste, aggiorna la quantità
                this.cart.items[dish_id].quantity += quantity;
            }

            // Aggiorna la quantità totale e il prezzo totale del carrello
            this.cart.totalQuantity += quantity;
            this.cart.totalPrice += price * quantity;

            // Salva il carrello aggiornato nel localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));

        },

        clearCart() {
            // Svuota tutti gli articoli dal carrello
            this.cart.items = {};
            // Resetta la quantità totale
            this.cart.totalQuantity = 0;
            // Resetta il prezzo totale
            this.cart.totalPrice = 0;

            // Salva il carrello aggiornato nel localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));

            console.log('Carrello svuotato.');
        },

        calculateTotalPrice() {
            // Calcola il prezzo totale del carrello
            this.cart.totalPrice = Object.values(this.cart.items).reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

        }
    }
}
</script>

<template>

    <div class="container-show-restaurant">
        <div
            class="cart-container d-flex flex-column justify-content-center align-items-center position-fixed bottom-5 end-0">
            <router-link :to="{ name: 'cartshopping', params: { slug: slug } }">
                <i class="fa-solid fa-cart-shopping text-white"></i>
            </router-link>
        </div>
        <div class="">
            <!-- title -->
            <h1 class="text-center">{{ restaurant.name }}</h1>
            <!-- title -->
        </div>

        <AppLinkCart />
        <!-- restaurant details -->
        <div class="container mt-5 border-bottom" v-if="restaurant">
            <div class="row">
                <!-- restaurant image -->
                <div class="col-6 d-flex align-items-center justify-content-end">
                    <div class="w-75 p-2 d-flex justify-content-end">
                        <img :src="`${baseSrc}/${restaurant.image}`" class="w-50" alt="Restaurant image">
                    </div>
                </div>
                <!-- /restaurant image -->


                <!-- restaurant description -->
                <div class="col-6 py-3">
                    <div class="p-2">

                        <dt>
                            Descrizione
                        </dt>
                        <dd>
                            {{ restaurant.description }}
                        </dd>

                        <dt>
                            Indirizzo
                        </dt>
                        <dd>
                            {{ restaurant.address }}
                        </dd>

                        <dt>Cucina</dt>
                        <dd>
                            <ul>
                                <li v-for="(type, index) in restaurant.types" :key="index">
                                    {{ type.name }}
                                </li>
                            </ul>
                        </dd>
                    </div>
                </div>
                <!-- /restaurant description -->


            </div>
        </div>
        <!-- restaurant details -->

        <!-- dishes container -->
        <div class="container-fluid mt-5 ">

            <!-- title menu -->
            <h2 class="text-center py-3">Menù</h2>
            <!-- /title menu -->

            <!-- dish card -->
            <div v-for="curDish in restaurant.dishes">
                <div v-if="restaurant.dishes.length > 0" class="container d-flex justify-content-center">
                    <div class="row border-bottom align-items-center w-75">
                        <!-- image -->
                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 py-3 d-flex justify-content-end">
                            <img :src="`${baseSrc}/${curDish.image}`" class="w-75 rounded-circle" alt="immagine piatto">
                        </div>
                        <!-- /image -->

                        <!-- description -->
                        <div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 py-4">
                            <!-- name -->
                            <dt>
                                Nome Piatto
                            </dt>
                            <dd>
                                {{ curDish.name }}
                            </dd>
                            <!-- /name -->

                            <!-- description -->
                            <dt>
                                Descrizione
                            </dt>
                            <dd>
                                {{ curDish.description }}
                            </dd>
                            <!-- /description -->

                            <!-- price and btn shop -->
                            <div class="d-flex justify-content-between align-items-center">

                                <!-- price -->
                                <div>
                                    <dt>Prezzo</dt>
                                    <dd>{{ curDish.price }} &euro;</dd>
                                </div>
                                <!-- /price -->

                                <!-- quantity in cart -->
                                <div>
                                    <span v-if="cart.items[curDish.id]">{{ cart.items[curDish.id].quantity }}</span>
                                    <span v-else>0</span>
                                </div>
                                <!-- btn shop -->
                                <a class="btn btn-success py-1 m-0" @click.prevent="aggiorna(curDish)">+</a>
                                <!-- /btn shop -->

                            </div>
                            <!-- /price and btn shop -->

                            <!-- visibility -->
                            <span
                                :class="{ 'text-success': curDish.visibility === 1, 'text-danger': curDish.visibility === 0 }">
                                <strong>Disponibile</strong>
                            </span>
                            <!-- visibility -->

                        </div>
                        <!-- /description -->
                    </div>
                </div>
                <!-- /dish card -->
            </div>

        </div>
        <!-- /dishes container -->
    </div>
</template>


<style lang="scss" scoped>
// .md_container-title {
//     margin-top: 150px;
// }

.cart-container {
    background-color: #004a93;
    width: 40px;
    aspect-ratio: 1;
    cursor: pointer;
    z-index: 99;
}

.cart-container a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-show-restaurant {
    position: relative;
    // min-height: 300vh;
    height: 0%;
    margin-top: 130px;
}
</style>
