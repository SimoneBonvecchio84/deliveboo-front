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
           
        <div class="card ">

            <!-- image -->
            <img class="card-img-top w-100" :src="`${baseSrc}/${cardObj.image}`" alt="Card image cap">
            <!-- /image -->

            <!-- card text -->
            <div class="card-body d-flex flex-column p-0 ps-2 mt-2">

                <!-- name -->
                <span class="card-title p-0 m-0 cutText">
                    <strong>
                        {{ cardObj.name }}
                    </strong>
                </span>

                <!-- address -->
                <span class="card-title p-0 m-0 cutText">{{ cardObj.address }}</span>


                <!-- types -->
                <ul v-if="cardObj.types && cardObj.types.length > 0" class="list-unstyled">
                    <li v-for="(type, index) in cardObj.types" :key="index">
                        <strong>
                            Cucina:
                        </strong>
                        {{ type.name }}
                    </li>
                </ul>
                <!-- types -->

            </div>
            <!-- /card text -->

        </div>
        
    
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
}

.card-img-top {
  width: 100%;
  height: auto;
}
</style>