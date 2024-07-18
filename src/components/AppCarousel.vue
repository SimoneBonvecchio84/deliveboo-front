<script>
import { store } from "../store.js";

export default {
    data() {
        return {
            foods: store.foods,
            currentFood: 0,
        }
    },


    mounted() {
        this.autoPlay();
    },

    beforeUnmount() {
        clearInterval(this.interval);
    },

    methods: {
        autoPlay() {
            this.interval = setInterval(() => {
                this.currentFood = (this.currentFood + 1) % this.foods.length;
            }, 3000);
        },
        getImage(name) {
            if (this.flag.includes(name)) {
                return new URL(`../assets/img/${name}.png`, import.meta.url).href;
            } else {
                return new URL(`../assets/img/int.png`, import.meta.url).href;
            }
        }
    }
}
</script>

<template>
    <div class="container d-flex align-items-center ms_container">
        <div class="row" name="slide" mode="out-in">
            <div class="col-12 col-md-6 d-flex justify-content-center">
                <div :key="currentFood" class="ms_carousel-slide">
                    <img :src="foods[currentFood].image" alt="" class="ms_food-img" />
                </div>
            </div>
            <div class="col-12 col-md-6 ms_text">
                <p class="ms_food-text py-4">{{ foods[currentFood].text }}</p>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
// @use "../style/partials/variables" as *;

    .ms_container {
        width: 50%;
    }

    .ms_carousel-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        transform: translateX(0);
        transition: transform 1s ease;
        position: relative;

        // .ms_foods {
        //     min-width: 100%;
        //     flex-shrink: 0;
        //     display: flex;
        //     flex-direction: column;
        //     align-items: center;
        //     padding: 20px;

        .ms_food-img {
            width: 100%;
        }
    }

        .ms_text {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .ms_food-text {
            font-style: italic;
            font-size: 1.5rem;
            text-align: center;
        }

    .slide-enter-active {
        transition: transform 0.5s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.5s ease, opacity 0.5s ease;
    }

    .slide-enter-active {
        transform: translateX(0);
        opacity: 1;
    }

    .slide-leave-active {
        transform: translateX(-100%);
        opacity: 0;
    }

</style>
