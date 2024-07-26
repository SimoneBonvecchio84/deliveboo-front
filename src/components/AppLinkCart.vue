<script>
export default {
    props: {
        quantity: Number,
    },
    data() {
        return {
            cart: '',
            slug: '',
        }
    },
    created() {
        this.slug = localStorage.getItem('slug');
        this.cart = JSON.parse(localStorage.getItem('cart'));
    },
    methods: {
        getCartItemsLength() {
            return this.cart && this.cart.items ? Object.keys(this.cart.items).length : 0;
        }
    }
}
</script>

<template>
    <router-link :to="{ name: 'cartshopping', params: { slug: slug } }">
        <div v-if="getCartItemsLength() > 0"
            class="cart-container d-flex flex-column justify-content-center align-items-center position-fixed end-0 ">
            <!-- insert quantity cart-shop -->
            <div class="md_circle">
                <span>
                    {{ quantity }}
                </span>
            </div>
            <!-- /insert quantity cart-shop -->
            <div class="d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-cart-shopping text-white"></i>
            </div>
        </div>
    </router-link>
</template>

<style scoped lang="scss">
div {
    width: 50px;
    height: 50px;
}

/* cart */
.cart-container {
    background-color: #0072E5;
    width: 50px;
    top: 130px;
    aspect-ratio: 1;
    cursor: pointer;
    z-index: 99;
}

@media (max-width: 768px) {
    .cart-container {
        top: 300px;
        /* Sposta il div più in basso */
    }
}

.md_circle {
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    bottom: 35px;
    right: 35px;
    font-size: 1rem;
    background-color: orange;
    color: white;
}

/* cart */

/* cart */
.carrello {
    width: 100px;
    /* Width of the cart element */
    height: 100px;
    /* Height of the cart element */
    margin-top: 100px;
    /* Top margin to position the cart element */
}

/* cart */
</style>