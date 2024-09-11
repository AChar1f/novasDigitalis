<template>
  <div class="container-fluid pt-5">
    <h2>Welcome to Novas Digitalis</h2>

    <div v-if="recentProducts" class="row rP gap-2 justify-content-center">
      <h3>Latest Products</h3>
      <CardComp v-for="product in recentProducts" :key="product.prodID">
        <template #cardHeader>
          <img :src="product.prodURL" loading="lazy" :alt="product.prodName" class="img-fluid">
        </template>
        <template #cardBody>
          <h5>{{ product.prodName }}</h5>
          <p>R{{ product.amount }}</p>
          <div class="buttons">
            <router-link :to="`/item/${product.prodID}`">
              <button class="icon"><i class="bi bi-info-square-fill"></i></button>
            </router-link>
            <button class="icon"><i class="bi bi-cart4" @click.prevent="addProd(product)"></i></button>
          </div>
        </template>
      </CardComp>
    </div>
    <Spinner v-else class="mt-5"/>
  </div>
</template>

<script>
import CardComp from '../components/Card.vue'
import Spinner from '../components/Spinner.vue'
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies()

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
  methods: {
    addProd(product){
            const payload = {
                id : cookies.get('VerifiedUser')?.result.userID,
                cred : { prodID : product.prodID }
            }
            return this.$store.dispatch('addToCart', payload )
        }
  },
  mounted() {
    this.$store.dispatch('recentProducts')
  }
}
</script>


<style scoped>
.container-fluid {
  min-height: 100vh;
}
.bi {
    color: #FFA500;
    font-size: x-large;
}

.icon{
    background: none;
    border: none;
}
.buttons{
  display: flex;
  justify-content: space-between;
}
</style>