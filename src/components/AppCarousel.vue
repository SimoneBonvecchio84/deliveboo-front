<script>
import { store } from "../store.js";
import { nextTick } from 'vue';

export default {
    data() {
        return {
            foods: store.foods,
            currentFood: 0,
        }
    },

    mounted() {
        nextTick(() => {
            this.autoPlay();
        });
    },

    beforeUnmount() {
        clearInterval(this.interval);
    },

    methods: {
        // carousel slide show
        autoPlay() {
            this.interval = setInterval(() => {
                this.currentFood = (this.currentFood + 1) % this.foods.length;
            }, 4000);
        },
        // for dynamic image
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

            <!-- dynamic image -->
            <div class="col-12 col-md-6 col-lg-5 d-flex justify-content-center p-0 m-0">
                <transition name="fade" mode="out-in">
                    <div :key="currentFood" :class="{ 'active-slide': true }"
                        class="container-img-food ms_carousel-img">
                        <img :src="foods[currentFood].image" alt="" class="ms_food-img img img-fluid" />
                    </div>
                </transition>
            </div>
            <!-- /dynamic image -->

            <!-- dynamic text -->
            <div class="col-12 col-md-6 col-lg-7 ms_text ms_carousel-text">
                <transition name="slide-fade" mode="out-in">
                    <!-- <p :key="currentFood" class="ms_food-text py-4">{{ foods[currentFood].text }}</p> -->
                    <img :src="foods[currentFood].text" alt="" :key="currentFood"
                        class="ms_food-img img img-fluid w-50" />
                </transition>
            </div>
            <!-- dynamic text -->

        </div>
    </div>
</template>

<style lang="scss" scoped>

.ms_container {
    width: 80%;

    // img container
    .container-img-food {
        padding: 0;
        margin: 0;

        img {
            width: 100%;
        }
    }

    .ms_carousel-text {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        /* Posizionamento relativo per permettere la transizione */
    }
}

.ms_carousel-img {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transform: translateX(0);
    transition: transform 1s ease;
    position: relative;
}

// /img container

// text container
.container-text-hero {
    padding: 0;
    margin: 0;
}
// /text container


// animation carousel

// animation img food
.fade-enter-active {
    transition: opacity 3s ease;
}

.fade-leave-active {
    transition: none;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

// /animation img food

// animation img text
.slide-fade-enter-active {
    transition: all 1.5s ease;
}

.slide-fade-leave-active {
    transition: all 6.5 ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.slide-fade-leave-to {
    opacity: 1;
    transform: translateX(0);
}

// /animation img text</style>