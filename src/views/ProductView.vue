<template>
    <div class="container-fluid">
        <h2>This is Product Page</h2>
        <div v-if="products?.length" class="row justify-content-center gap-3">
            <CardComp v-for="product in products" :key="product.prodID">
                <template #cardHeader>
                    <img :src="product.prodURL" loading="lazy" class="img-fluid" :alt="product.prodName">
                </template>
                <template #cardBody>
                    <h5>{{ product.prodName }}</h5>
                    <p>{{ product.prodDescription }}</p>
                    <p class="lead">R{{ product.amount }}</p>
                    <div class="buttons">
                        <router-link :to="`/item/${product.prodID}`">
                            <button>View</button>
                        </router-link>
                    </div>
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
    name: 'ProductView',
    components: {
        CardComp, Spinner
    },
    computed: {
        products() {
            return this.$store.state.products
        }
    },
    mounted() {
        this.$store.dispatch('fetchProducts')
    }
}
</script>

<style scoped>
.container-fluid {
    min-height: 85vh;
}
</style>