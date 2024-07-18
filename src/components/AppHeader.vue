<script>
export default {
  name: "App",
};
</script>

<template>
  <header>
    <!-- Gestione NavBar -->
    <nav class="navbar navbar-expand-lg ">
      <div class="container ps-5 pe-5 d-flex justify-content-between">
        <!-- logo -->
        <!-- d-flex justify-content-between -->
        <div class="navbar-brand">
          <img
            src="../assets/img/logo_top.png"
            alt="Logo"
            class="d-inline-block img-fluid align-text-top"
          />
          <!--  -->
        </div>
        <!-- /logo -->
         <!-- Hamburger menu -->
          <div>
            <button
              class="navbar-toggler collapsed bg-red"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <i class="fa-solid fa-bars text-white"></i>
              <!-- <span class="navbar-toggler-icon text-white"></span> -->
            </button>
             <!-- /Hamburger menu -->
            <div
              class="navbar-collapse collapse"
              id="navbarSupportedContent">
              <!-- Lato sinistro Navbar -->
              <!-- <ul class="navbar-nav me-auto"></ul> -->
              <!-- /Lato sinistro Navbar -->
    
              <!-- Lato destro Navbar -->
              <ul class="navbar-nav">
                 <!-- /Lato destro Navbar -->
    
                <!-- Link Di Registrazione  -->
                <li class="nav-item">
                  <router-link :to = "{ name: 'home'  }" class="nav-link text-light fs-5" href="http://127.0.0.1:8000/login">Home</router-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light fs-5" href="http://127.0.0.1:8000/login">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light fs-5" href="http://127.0.0.1:8000/register"
                    >Register</a
                  >
                </li>
                <!-- /Link Di Registrazione  -->
    
              </ul>
    
            </div>
            <!-- /hamburger menu -->
          </div>
      </div>
    </nav>
     <!-- /Gestione NavBar -->
  </header>
</template>

<style scoped lang="scss">


/* Gestione Navbar e Logo  */
.navbar-brand{
  height: 100px;
  img{
    width: 100%;
  }
}
/* /Gestione Navbar e Logo  */
/* Colore dell'header  */
.navbar-expand-lg{
  background-color: #ff0000; 
  color: white;
  height: 100px;
  width: 100%;
}
/* /Colore dell'header  */

.navbar-toggler{
  border: 2px solid white;
  outline-width: 0;
  --bs-navbar-toggler-focus-width: 0;
}

.navbar-nav.ml-auto {
    margin-left: auto !important;
}

.navbar-expand-lg img{
  width: 15vw;
}
</style>
