<template>
  <div class="wrapper">
    <Navbar/>
    <router-view/>
  </div>
  <Footer />
</template>

<script>
import Navbar from './components/NavbarComp.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar, Footer
  }
}

</script>

<style src="@/assets/css/styles.css">
</style>
