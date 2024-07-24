<script>
export default{
    props:{
        slug: String,
    },
    data(){
        return{
            cart:'',    
        }
    },
    created(){
        this.cart = JSON.parse(localStorage.getItem('cart'));
    }
}
</script>

<template>
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

        <!-- /cart-container -->
</template>

<style scoped lang="scss">

/* cart */
.carrello {
  width: 100px;
  /* Width of the cart element */
  height: 100px;
  /* Height of the cart element */
  margin-top: 100px;
  /* Top margin to position the cart element */
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

</style>