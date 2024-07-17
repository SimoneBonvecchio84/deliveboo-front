<script>
import axios from 'axios';

export default {
    data() {
        return {
            restaurant: null, // Imposta inizialmente a null
            baseSrc: "http://127.0.0.1:8000/storage/img/ImmaginiVarie"
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
    <div class="container mt-5" v-if="restaurant">
        <h1>{{ restaurant.name }}</h1>
        <img :src="`${baseSrc}/${restaurant.image}`" alt="Restaurant image">
        <p>{{ restaurant.description }}</p>
        <p>{{ restaurant.address }}</p>
        <ul v-if="restaurant.types && restaurant.types.length > 0">
            <li v-for="(type, index) in restaurant.types" :key="index">
                {{ type.name }}
            </li>
        </ul>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>


<style></style>
