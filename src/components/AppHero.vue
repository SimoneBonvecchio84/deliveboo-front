<script>
export default {
    name: 'Hero'
}
</script>

<template>
    <section class="hero">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12 col-md-7 bg-white">
                    <!-- <img src="/path/to/food-image.png" alt="Cibo" class="img-fluid"> -->
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi labore ullam voluptatum minima vitae? Aliquam molestiae quod tempora reiciendis, provident error sapiente adipisci asperiores, quibusdam impedit in, rerum nobis aperiam?
                </div>
                <div class="col-12 col-md-5 text-center text-md-start">
                    <h1>Ordina Comodamente da casa</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero {
    background-color: #ff0000;
    /* Colore di sfondo rosso */
    color: #fff;
    /* Colore del testo bianco */
    padding: 40px 0;
}

.hero h1 {
    font-size: 3rem;
    /* Dimensione del font per il titolo */
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
        /* Riduci la dimensione del font per schermi piccoli */
    }
}

.img-fluid {
    max-width: 100%;
    height: auto;
}
</style>