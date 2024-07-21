import { reactive } from "vue";

export const store = reactive({
    apiMainUrl : "http://127.0.0.1:8000",

    foods: [
        {
            image: './src/assets/img/panino.png',
            text: './src/assets/img/testo-hero-1.png',
        },
        {
            image: './src/assets/img/pizza-hero.png',
            text: './src/assets/img/testo-hero-1.png',
        },
        {
            image: './src/assets/img/sushi-hero.png',
            text: './src/assets/img/testo-hero-1.png',
        },
    ],
    slug:''
});