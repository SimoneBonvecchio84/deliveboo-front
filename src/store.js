import { reactive } from "vue";

export const store = reactive({
    apiMainUrl : "http://127.0.0.1:8000",

    foods: [
        {
            image: './src/assets/img/panino.png',
            text: 'Lasciati prendere dal gusto comodamente da casa tua con Deliveboo!',
        },
        {
            image: './src/assets/img/pizza-hero.png',
            text: 'I tuoi piatti preferiti arriveranno in un attimo grazie al nostro sistema di consegne.'
        },
        {
            image: './src/assets/img/pasta-hero.png',
            text: 'Tutti i tuoi ristoranti preferiti disponibili con un click!',
        },
    ],
});