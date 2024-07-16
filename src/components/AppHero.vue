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
                    <img src="../assets/img/hamburger.jpg" alt="Cibo" class="img-fluid">
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
    color: #fff;
    padding: 40px 0;
}

.hero h1 {
    font-size: 3rem;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
}

.img-fluid {
    max-width: 100%;
    height: auto;
}
</style>