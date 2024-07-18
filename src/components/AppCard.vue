<script>
export default {
    props: {
        cardObj: Object,
    },
    data() {
        return {
            baseSrc: "http://127.0.0.1:8000/storage" 
        }
    }
}
</script>

<template>
           
    <router-link :to="{ name: 'showrestaurant', params: { slug: cardObj.slug } }" class="text-decoration-none">
        <div class="card">

            <!-- image -->
            <img class="card-img-top w-100" :src="`${baseSrc}/${cardObj.image}`" alt="Card image cap">
            <!-- /image -->

            <!-- card text -->
            <div class="card-body d-flex flex-column p-0 ps-2 mt-2">

                <!-- types -->
                <ul v-if="cardObj.types && cardObj.types.length > 0" class="list-unstyled badge bg-primary pl-3">
                    <li v-for="(type, index) in cardObj.types" :key="index">
                        <strong>
                            Cucina:
                        </strong>
                        {{ type.name }}
                    </li>
                </ul>
                
                <!-- types -->

                <!-- name -->
                <span class="card-title p-0 m-0 cutText">
                    <strong>
                        {{ cardObj.name }}
                    </strong>
                </span>

                <!-- address -->
                <span class="card-title p-0 m-0 cutText">{{ cardObj.address }}</span>


            </div>
            <!-- /card text -->

        </div>
    </router-link>
        
    
</template>

<style scoped>
.main-content {
  padding: 20px 0;
}

.form-check-inline {
  margin: 10px;
}

.card {
  height: 100%;
  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.card-img-top {
  width: 100%;
  height: auto;
}

.card:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}




</style>