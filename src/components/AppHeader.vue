<script>
export default {
  name: "App",
};
</script>

<template>
  <header>
    <!-- Gestione NavBar -->
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <!-- logo -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img
            src="../assets/img/logo_esteso.png"
            alt="Logo"
            class="d-inline-block align-text-top"
          />
        </a>
        <!-- logo -->
         <!-- Hamburger menu -->
        <button
          class="navbar-toggler collapsed bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon "></span>
        </button>
         <!-- Hamburger menu -->
        <div
          class="navbar-collapse collapse"
          id="navbarSupportedContent"
          style=""
        >
          <!-- Lato sinistro Navbar -->
          <ul class="navbar-nav me-auto"></ul>

          <!-- Lato destro Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Link Di Registrazione  -->
            <li class="nav-item">
              <a class="nav-link text-light" href="http://127.0.0.1:8000/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="http://127.0.0.1:8000/register"
                >Register</a
              >
            </li>
            <!-- Link Di Registrazione  -->
          </ul>
        </div>
      </div>
    </nav>
     <!-- Gestione NavBar -->
  </header>
</template>

<style scoped>

 .navbar-expand-lg{
  background-color: #ff0000; /* Colore dell'header  */
  color: white;
}

.navbar-item{
  color: white;
}

.navbar-toggler-icon{
  color: white;
}

.navbar-brand img {
  height: 40px;      /* Gestione altezza logo */          
}
</style>
