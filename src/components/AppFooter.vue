<script>
export default {
  name: "App",
};
</script>


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


<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

/* footer style management */

.footer {
  background-color: $blue;
  position: relative;
  bottom: 0;
  width: 100%;
}

/* /footer style management */

/* footer logo management */

.footer-logo {
  height: 115px;
  padding: 15px;
}

/* footer logo management */

</style>