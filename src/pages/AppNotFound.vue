<script>
</script>

<template>
    <div class="form-containert text-center md_container d-flex flex-column align-items-center justify-content-center ">
        <i class="fas fa-exclamation-triangle py-5"></i>
        <h1 class="border border-danger rounded p-5">Errore! Pagina non trovata</h1>
        <router-link :to="{ name: 'home' }" >
            <button class="btn btn-primary" >Torna Alla Home</button>
        </router-link>
    </div>
</template>


<style lang="scss" scoped>
@use "../sass/colorpalette.scss" as *;
    .md_container {
        
        .fas {
            font-size: 7rem;
            color: $red;
            margin-top: 100px;            
        }

        button {
            margin-top: 50px;
            margin-bottom: 100px;
        }
    }
</style>