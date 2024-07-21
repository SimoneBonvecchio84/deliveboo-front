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
                <transition name="fade" mode="out-in">
                    <div :key="currentFood" :class="{ 'active-slide': true }" class="ms_carousel-slide">
                        <img :src="foods[currentFood].image" alt="" class="ms_food-img" />
                    </div>
                </transition>
            </div>
            <div class="col-12 col-md-6 ms_text">
                <transition name="slide-fade" mode="out-in">
                    <p :key="currentFood" class="ms_food-text py-4">{{ foods[currentFood].text }}</p>
                </transition>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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

    .ms_food-img {
        width: 100%;
    }
}

.ms_text {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; /* Posizionamento relativo per permettere la transizione */
}

.ms_food-text {
    font-style: italic;
    font-size: 1.5rem;
    text-align: center;
}

.fade-enter-active {
    transition: opacity 3s ease;
}

.fade-leave-active {
    transition: none;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 3s ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.slide-fade-leave-to {
    opacity: 1; /* Mantieni opacità a 1 per testo uscente */
    transform: translateX(0); /* Mantieni posizione originale per testo uscente */
}
</style>