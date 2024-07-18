<template>
    <div>
      <!-- Footer -->
      <footer class="footer">
        <div class="container text-center">
          <img src="../assets/img/logo_bottom.png" alt="Logo" class="footer-logo" />
        </div>
      </footer>
      <!-- /Footer -->
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
  };
  </script>
  
  <style scoped>
  /* gestione stile footer */
  .footer {
    background-color: rgb(0 74 147);
    position: relative;
    bottom: 0;
    width: 100%;
  }
   /* /gestione stile footer */
   /* gestione logo footer */
  .footer-logo {
    height: 300px;
  }
   /* gestione logo footer */
  </style>