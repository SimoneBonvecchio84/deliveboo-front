<script>
import { store } from '../store';
import AppCart from './AppCart.vue';

export default {
  components: {
    AppCart
  },

  name: "App",
};
</script>

<template>
  <header>
    
    <!-- NavBar Management -->
    <nav class="navbar navbar-expand-lg fixed-top">

      <div class="container ps-5 pe-5 d-flex justify-content-between fixed-top red">
        <!-- logo -->
        <div class="navbar-brand">
          <img src="../assets/img/logo_top.png" alt="Logo" class="d-inline-block align-text-top" />
        </div>
        <!-- /logo -->


          <!-- Hamburger menu -->
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fa-solid fa-bars text-white"></i>
          </button>
          <!-- /Hamburger menu -->


        <!-- NAV Link -->
        <div class="navbar-collapse collapse justify-content-end" id="navbarSupportedContent">
          
          <!-- Left side of Navbar -->
            <!-- Empty at the moment -->
          <!-- /Left side of Navbar -->

          <!-- Right side of Navbar -->
            <ul class="navbar-nav d-flex align-items-center">
          <!-- /Right side of Navbar -->

            <!-- Home Link -->
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link text-light fs-4"
                href="http://127.0.0.1:8000/login">Home</router-link>
            </li>
            <!-- /Home Link -->

            <!-- Login Link -->
            <li class="nav-item">
              <a class="nav-link text-light fs-4" href="http://127.0.0.1:8000/login">Accedi</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light fs-4" href="http://127.0.0.1:8000/register">Registrati</a>
            </li>
            <!-- /Login Link -->

          </ul>

        </div>
        <!-- /NAV Link -->

      </div>

    </nav>
    <!-- /NavBar Management -->

  </header>
</template>

<style scoped lang="scss">

/* Navbar and Logo Management */

@use "../sass/colorpalette.scss" as *;

.container {
  max-width: 100%;
}

.navbar-brand {
  height: 100px;

  img {
    width: 100%;
  }
}

/* /Navbar and Logo Management */


/* Header color */

.navbar-expand-lg {
  background-color: $red;
  color: white;
  height: 100px;
  width: 100%;
}

/* /Colore dell'header  */

.navbar-toggler {
  border: 2px solid white;
  outline-width: 0;
  --bs-navbar-toggler-focus-width: 0;
}

.navbar-collapse, .red{
  background-color:$red;
}

/* /Header color */

.navbar-expand-lg img {
  width: 130px;
}

</style>
