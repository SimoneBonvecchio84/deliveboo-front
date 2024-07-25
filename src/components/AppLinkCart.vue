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

/* cart */

</style>