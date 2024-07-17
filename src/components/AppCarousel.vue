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
        }
    }
}
</script>

<template>
    <div class="d-flex ms_div-img">
        <div class="ms_carousel-container">
            <h2>Prova</h2>
            <transition name="slide" mode="out-in">
                <div :key="currentFood" class="ms_carousel-slide">
                    <img :src="foods[currentFood].image" alt="" class="ms_food-img" />
                    <p class="ms_food-text">{{ foods[currentFood].text }}</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// @use "../style/partials/variables" as *;



.ms_div-img {
    // background-image: url();
    // background-size: cover;
    // background-position: center;
    height: 600px;

    .ms_carousel-container {
        width: 600px;
        margin: auto;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            font-size: 2.8rem;
        }

        p {
            font-size: 1.3rem;
        }
    }

    .ms_carousel-slide {
        width: 70%;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
            width: 150px;
            height: 150px;
            margin-bottom: 15px;
        }

        .ms_food-text {
            font-style: italic;
            margin-bottom: 10px;
        }

        .ms_food {
            font-weight: bold;
        }
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
}
</style>
