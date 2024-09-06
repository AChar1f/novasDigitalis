<template>
  <div class="container-fluid">
    <h2>Welcome to Novas Digitalis</h2>

    <div v-if="recentProducts" class="row gap-2 justify-content-center">
      <h3>Latest Products</h3>
      <CardComp v-for="product in recentProducts" :key="product.prodID">
        <template #cardHeader>
          <img :src="product.prodURL" loading="lazy" :alt="product.prodName" class="img-fluid">
        </template>
        <template #cardBody>
          <h5>{{ product.prodName }}</h5>
          <p>R{{ product.amount }}</p>
          <router-link :to="`/item/${product.prodID}`">
            <button>View</button>
          </router-link>
        </template>
      </CardComp>
    </div>
    <Spinner v-else/>
  </div>
</template>

<script>
import CardComp from '../components/Card.vue'
import Spinner from '../components/Spinner.vue'

export default {

  name: 'HomeView',
  components: {
    CardComp, Spinner
  },
  computed: {
    recentProducts() {
      return this.$store.state.recentProducts
    }
  },
  mounted() {
    this.$store.dispatch('recentProducts')
  }
}
</script>


<style scoped>
.container-fluid {
  min-height: 85vh;
}
</style>