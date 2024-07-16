<script>
export default {
    name: 'MainContent',
    data() {
        return {
            categories: ['Americana', 'Giapponese', 'Cinese', 'Italiana', 'Messicana', 'Indiana', 'Francese', 'Tailandese', 'Vegetariana']
        }
    }
}
</script>

<template>
    <section class="main-content">
        <div class="container">
            <div class="row mb-3">
                <div class="col-12 d-flex flex-wrap justify-content-center">
                    <div v-for="category in categories" :key="category" class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" :id="category" :value="category">
                        <label class="form-check-label" :for="category">{{ category }}</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="n in 9" :key="n" class="col-12 col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="../assets/img/image.jpg" class="card-img-top" alt="Immagine">
                        <div class="card-body">
                            <h5 class="card-title">Da Mario</h5>
                            <p class="card-text">Descrizione del ristorante.</p>
                            <p class="card-text">
                                <small class="text-muted">Cinese • Giapponese</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center">
                    <button class="btn btn-primary">Mostra altri</button>
                </div>
            </div>
        </div>
    </section>
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
</style>