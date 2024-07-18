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
    <!-- titolo ristorante -->
    <h1 class="text-center py-5">{{ restaurant.name }}</h1>
    <!-- titolo ristorante -->

    <!-- contenitore hero -->
    <div class="container mt-5 border rounded" v-if="restaurant">
        <div class="row">
            <!-- colonna immagine -->
            <div class="col-6 d-flex align-items-center justify-content-end">
                <div class="w-75 p-2 d-flex justify-content-end">
                    <img :src="`${baseSrc}/${restaurant.image}`" class="w-50" alt="Restaurant image">
                </div>
            </div>
            <!-- /colonna immagine -->

            <!-- colonna descrizione -->
            <div class="col-6 py-3">
                <div class="p-2">
                    
                    <dt>Descrizione</dt>
                    
                    <dd>{{ restaurant.description }}</dd>
                    
                    <dt>Indirizzo</dt>
                    <dd>{{ restaurant.address }}
                    </dd>
                    <dt>Tipologia</dt>
                    <dd>
                        <ul v-if="restaurant.types && restaurant.types.length > 0">
                            <li class="list-group-item" v-for="(type, index) in restaurant.types" :key="index">
                                {{ type.name }}
                            </li>
                        </ul>
                    </dd>
                </div>
            </div>
            <!-- /colonna descrizione -->
        
        </div>
    </div>
    <!-- /contenitore hero -->

    <!-- contenitore piatti -->
     <div class="container mt-5 border rounded">
        
        <div class="row">
            
            <!-- colonna piatto -->
            <h2 class="text-center py-3">Menù</h2>
            <div class="col-12" v-for="curDish in restaurant.dishes">  
                
                <div class="container py-3 d-flex justify-content-center" v-if="restaurant.dishes.length > 0">
                    <div class="row border rounded align-items-center w-50">
                        <!-- colonna immagine piatto -->
                        <div class="col-6 py-3 d-flex justify-content-end">
                            <img :src="`${baseSrc}/${curDish.image}`" class="w-75 rounded-circle" alt="immagine piatto">    
                        </div>
                        <!-- /colonna immagine piatto -->

                        <!-- collonna descrizione piatto -->
                        <div class="col-6 py-4">
                            <div>
                                <dt>Nome Piatto</dt>
                                <dd>{{ curDish.name }}</dd>
                                <dt>Descrizione</dt>
                                <dd>{{ curDish.description }}</dd>
                                <dt>Prezzo</dt>
                                <dd>{{ curDish.price }}  &euro;</dd>
                                
                                <dd>
                                    <span :class="{'text-success' : curDish.visibility === 1, 'text-danger' : curDish.visibility === 0 }"> <strong>Disponibile</strong></span>
                                </dd>
                            </div>
                        </div>
                        <!-- /collonna descrizione piatto -->
                    </div>
                </div>
                <div class="container border rounded" v-else>
                    <h2 class="text-center">Non ci sono ancora piatti!</h2>
                </div>
            
            </div>
            <!-- /colonna piatto -->
        
        </div>

     </div>
    <!-- /contenitore piatti -->

</template>


<style></style>
