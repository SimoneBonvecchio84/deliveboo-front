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
        this.fetchRestaurant();
    },
    methods: {
        fetchRestaurant() {
            const slug = this.$route.params.slug;
            axios.get(`http://127.0.0.1:8000/api/restaurants/${slug}`)
                .then(response => {
                    this.restaurant = response.data.result;
                })
                .catch(error => {
                    console.error('Errore durante la chiamata API:', error.message || JSON.stringify(error));
                });
        }
    }
}
</script>

<template>

    <div class="container mt-5 " v-if="restaurant">
          <div class="row">
            <div class="col-6 ">
                <img :src="`${baseSrc}/${restaurant.image}`" class="w-75" alt="Restaurant image">
            </div>
            <div class="col-6 py-3">                
                    <h2> Nome: {{ restaurant.name }}</h2>
                    <h2> Indirizzo: 
                        <h4>{{ restaurant.address }}</h4>
                    </h2>
                    <h2>Descrizione:</h2>
                    <h4>{{ restaurant.description }}</h4>  
                    <h2>Tipologia:</h2>  
                    <ul v-if="restaurant.types && restaurant.types.length > 0">
                        <li class="list-group-item" v-for="(type, index) in restaurant.types" :key="index">
                           <h5>{{ type.name }}</h5> 
                        </li>
                    </ul>
            </div>
          </div>
    </div>
    

</template>


<style></style>
