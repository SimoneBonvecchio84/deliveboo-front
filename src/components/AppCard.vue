<script>
export default {
    props: {
        cardObj: Object,
    },
    data() {
        return {
            baseSrc: "http://127.0.0.1:8000/storage"
        }
    },

    // edit types
    computed: {
        typeNames() {
            if (this.cardObj.types && this.cardObj.types.length > 0) {
                return this.cardObj.types.map(type => type.name).join(' - ');
            }
            return '';
        }
    }
    // edit types

}
</script>

<template>

    <router-link :to="{ name: 'showrestaurant', params: { slug: cardObj.slug } }" class="text-decoration-none">
        <div class="card">

            <!-- image -->
            <img class="card-img-top w-100" :src="`${baseSrc}/${cardObj.image}`" alt="Card image cap">
            <!-- /image -->

            <!-- card text -->
            <div class="card-body d-flex flex-column align-items-center p-0 mt-2">


                <!-- name -->
                <span class="card-title p-0 m-0 cutText d-flex justify-content-center font-size">
                    
                    <strong class="text-truncate">
                        {{ cardObj.name }}
                    </strong>
                    
                </span>

                <!-- address -->
                <span class="card-title p-0 m-0 cutText d-flex justify-content-center">{{ cardObj.address }}</span>

                <!-- old types -->
                <!-- <ul v-if="cardObj.types && cardObj.types.length > 0" class="list-unstyled mb-2">
                    <li v-for="(type, index) in cardObj.types" :key="index">
                        <strong>
                            Cucina:
                        </strong>
                        <span class="badge bg-primary ms-1">
                            {{ type.name }}
                        </span>
                    </li>
                </ul> -->
                <!-- old types -->

                <!-- new types -->
                <span v-if="typeNames" class="list-unstyled mb-2 text-types">
                    <strong class="center">Cucina: </strong>
                    <span class="badge bg-primary ms-1 margin">{{ typeNames }}</span>
                </span>
                <!-- / new types -->

            </div>
            <!-- /card text -->

        </div>
    </router-link>


</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

.main-content {
    padding: 20px 0;
}

.form-check-inline {
    margin: 10px;
}

/* card style */

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

.cutText {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.font-size {
    font-size: 1.1rem;
}

@media (max-width: 500px) {
    .text-types {
        display: flex;
        flex-direction: column;
    }

    .center {
        text-align: center;
    }

    .margin {
        margin-left: 0;
    }
}

/* /card style */

</style>