<script>
import axios from 'axios';

export default {
    data() {
        return {
            restaurant: [],
            baseSrc: "http://127.0.0.1:8000/storage"
        };
    },
    created() {
        // localStorage.clear();
        this.fetchRestaurant();




    },
    methods: {
        fetchRestaurant() {
            const slug = this.$route.params.slug;
            axios.get(`http://127.0.0.1:8000/api/restaurants/${slug}`)
                .then(response => {
                    this.restaurant = response.data.result;
                    console.log(this.restaurant);

                })
                .catch(error => {
                    console.error('Errore durante la chiamata API:', error.message || JSON.stringify(error));
                });
        }
    }
}
</script>

<template>
    <div class="md_container-title">
        <!-- title -->
        <h1 class="text-center">{{ restaurant.name }}</h1>
        <!-- title -->
    </div>

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

            <div v-if="restaurant.dishes.length > 0" class="container d-flex justify-content-center" >
                <div class="row border-bottom  align-items-center w-75">
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

                            <!-- btn shop -->
                            <router-link
                                :to="{ name: 'cartshopping', params: { dish_id: curDish.id, restaurant_id: curDish.restaurant_id, quantity: 1 , dish_name: curDish.name, price: curDish.price } }">
                                <a class="btn  btn-success  py-1 m-0" href="">+</a>
                            </router-link>
                            <!-- /btn shop -->

                        </div>
                        <!-- /price and btn shop -->

                        <!-- visibility -->
                        <dd>
                            <span
                                :class="{ 'text-success': curDish.visibility === 1, 'text-danger': curDish.visibility === 0 }">
                                <strong>Disponibile</strong></span>
                        </dd>
                        <!-- visibility -->

                    </div>
                    <!-- /description -->
                </div>
            </div>
            <div v-else class="container border rounded">
                <h2 class="text-center">Non ci sono ancora piatti!</h2>
            </div>
            
        </div>
        <!-- /dish card -->

    </div>
    <!-- /dishes container -->

</template>


<style lang="scss" scoped>
.md_container-title {
    margin-top: 150px;
}
</style>
