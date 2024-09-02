<template>
  <div class="wrapper">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/NavbarComp.vue'
export default {
  components: {
    Navbar
  }
}

</script>

<style src="@/assets/css/styles.css">
</style>
