<template>
    <div class="carrello">
        <router-link
        :to="{ name: 'cartshopping', params: { slug: restaurant.slug  } }">
        carrello
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.carrello{
    width: 100px;
    height: 100px;
    margin-top: 100px;
}
</style>