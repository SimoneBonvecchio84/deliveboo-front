<template>
    <div class="ms-footer">
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
  
  <style scoped lang="scss">
  // div.ms-footer{
  //   position:fixed;
  //   bottom: 0;
  //   left: 0;
  //   right: 0;
  // }
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
    height: 115px;
    padding: 15px;
  }
   /* gestione logo footer */
  </style>