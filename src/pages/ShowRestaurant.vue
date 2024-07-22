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
            cart: {
                items: {},
            },
            isLoadingCart: true,
        };
    },
    created() {
        // Try to retrieve the cart from localStorage and convert it into a JavaScript object
        let cartString = localStorage.getItem('cart');
        if (cartString) {
            try {
                this.cart = JSON.parse(cartString);
            } catch (error) {
                console.error("Errore durante la lettura del carrello:", error);
                // In case of an error, set the cart to a default empty value
                this.cart = {};
            }
        } else {
            // If no cart exists, initialize a new empty object
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
        aggiorna(dish, value) {
            // Save dish data
            let quantity = 0;
            if (value == 1) {
                quantity = 1;
            } else {
                quantity = -1;
            }
            const dish_id = parseInt(dish.id);
            const dish_name = dish.name;
            const restaurant_id = dish.restaurant_id;
            const price = parseFloat(dish.price);
            console.log(quantity, dish_id, dish_name, restaurant_id, price);

            // Retrieve the cart saved in localStorage
            const savedCart = localStorage.getItem('cart');
            if (savedCart && savedCart !== 'undefined') {
                this.cart = JSON.parse(savedCart);
            }
            // Check if a restaurant_id exists in localStorage
            let savedRestaurantId = localStorage.getItem('restaurant_id');

            // Verify if savedRestaurantId is valid
            if (savedRestaurantId && savedRestaurantId !== 'undefined') {
                // Parse the saved restaurant_id from localStorage
                const parsedSavedRestaurantId = JSON.parse(savedRestaurantId);

                // Compare the current restaurant_id with the saved one
                if (parsedSavedRestaurantId === restaurant_id) {
                    console.log('Aggiungendo elemento al carrello poiché gli ID dei ristoranti corrispondono.');
                    // Use the retrieved price to add an item to the cart
                    this.addToCart(dish_id, dish_name, quantity, price);
                } else {
                    console.log('Differente ID di ristorante rilevato.');
                    // Prompt the user to decide if they want to empty the cart
                    const userDecision = confirm("Stai cambiando ristorante. Vuoi svuotare il carrello?");
                    if (userDecision) {
                        console.log('Svuotamento del carrello...');
                        // Empty the cart
                        this.clearCart();
                        // Update the restaurant_id in localStorage
                        localStorage.setItem('restaurant_id', JSON.stringify(restaurant_id));
                        // Add the new item to the now-empty cart
                        this.addToCart(dish_id, dish_name, quantity, price);
                    } else {
                        console.log('Utente ha deciso di non svuotare il carrello.');
                    }
                }
            } else {
                console.log('Nessun restaurant_id salvato trovato in localStorage.');
                // This might be a new session or the first visit to the site
                // Initialize the restaurant_id
                localStorage.setItem('restaurant_id', JSON.stringify(restaurant_id));
                // Also add the first item to the empty cart
                this.addToCart(dish_id, dish_name, quantity, price);
            }

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
                console.error('Cart items are not defined');
                this.cart.items = {};
            }

            // Update total price
            if (quantity === 1) {
                this.cart.totalPrice += price;
                console.log(this.cart.totalPrice);
            } else if (this.cart.items[dish_id].quantity) {
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

                    if (this.cart.items[dish_id].quantity <= 0) {
                        delete this.cart.items[dish_id];
                    }
                }
            }
            // / Add/remove quantity in the cart or remove item


            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        clearCart() {
            // Empty all items from the cart
            this.cart.items = {};
            // Reset the total quantity
            this.cart.totalQuantity = 0;
            // Reset the total price
            this.cart.totalPrice = 0;

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));

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
                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 py-3 d-flex justify-content-center">
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

                                <div class="d-flex justify-contente-center align-items-center gap-2 text-center">
                                    <!-- btn less -->
                                    <div class="btn btn-danger ms-btn d-flex justify-content-center align-items-center">
                                        <a class="text-decoration-none text-white fw-bold"
                                            @click.prevent="aggiorna(curDish, -1)">-</a>
                                    </div>
                                    <!-- /btn less -->

                                    <!-- quantity in cart -->
                                    <div class="counter" v-if="cart?.items" >
                                        <span v-if="cart?.items[curDish.id]">{{ cart?.items[curDish.id].quantity
                                            }}</span>
                                        <span v-else>0</span>
                                    </div>
                                    <!-- /quantity -->

                                    <!-- btn add -->
                                    <div
                                        class="btn btn-success ms-btn d-flex justify-content-center align-items-center ">
                                        <a class="text-decoration-none text-white fw-bold" @click.prevent="aggiorna(curDish, 1)">+</a>
                                    </div>
                                    <!-- /btn add -->
                                </div>

                            </div>
                            <!-- /price and btn shop -->

                            <!-- visibility -->
                            <!-- <span
                                :class="{ 'text-success': curDish.visibility === 1, 'text-danger': curDish.visibility === 0 }">
                                <strong>Disponibile</strong>
                            </span> -->
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
    min-height: 100vh;
    margin-top: 130px;
    margin-bottom: 50px;
}

.counter {
    margin: 0;
    padding: 0;
    width: 20px;
    aspect-ratio: 1;

}

.ms-btn {
    width: 30px;
    height: 30px;
}
</style>
