<script>
export default {
    data() {
        return {

            menu: [
                {
                    title: "Progetti",
                    routeName: "home",
                }  
            ]
        }
    }

}
</script>
<template>

    <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container">
            <a class="navbar-brand text-light" href="#">BoolFolio</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav gap-3">
                    <li class="nav-item" v-for="curLink in menu">
                        <router-link :to="{ name: curLink.routeName }">
                            {{ curLink.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>



</template>

<style scoped lang="scss">
.router-link-active {
    padding-bottom: 10px;
    border-bottom: 3px solid white;
}
</style>