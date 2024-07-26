<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    toTop: function () {
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            this.show = window.scrollY > 500;
        }
  }
};
</script>


<template>
  <div class="ms-footer">
    <!-- Footer -->
    <footer class="footer">
      <div class="container text-center">
        <!-- <router-link :to="{ name: 'home' }" href="../assets/img/logo_top.png"> -->
            <img src="../assets/img/logo_bottom.png" alt="Logo" class="footer-logo" @click="toTop" />
      <!-- </router-link> -->
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