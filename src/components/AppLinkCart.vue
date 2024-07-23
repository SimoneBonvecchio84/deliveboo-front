<script>
export default{
    data(){
        return{
            
        }
    }
}
</script>

<template>
    
    <div class="carrello">
        {{ store.slug }}
        <!-- Router link to navigate to the shopping cart page with a dynamic slug parameter -->
        <router-link
        :to="{ name: 'cartshopping', params: { slug:  store.slug  } }">
        carrello
        </router-link>
    
    </div>
</template>

<style scoped lang="scss">

.carrello{
    width: 100px; /* Width of the cart element */
    height: 100px; /* Height of the cart element */
    margin-top: 100px; /* Top margin to position the cart element */
}

</style>