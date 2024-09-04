<template>
    <div class="container-fluid">
        <h2>This is the Item View</h2>
        <div v-if="product" class="row justify-content-center">
            <CardComp>
                <template #cardHeader>
                    <img :src="product.prodURL" loading="lazy" class="img-fluid" :alt="product.prodName">
                </template>
                <template #cardBody>
                    <h5>{{ product.prodName }}</h5>
                    <p>{{ product.prodDescription }}</p>
                    <p class="lead">R{{ product.amount }}</p>
                </template>
            </CardComp>
        </div>
        <Spinner v-else/>
    </div>
</template>

<script>
import store from '@/store'
console.log(store.state.product);

import CardComp from '../components/Card.vue'
import Spinner from '../components/Spinner.vue'

    export default {
        name: 'ItemView',
        components: {
            CardComp, Spinner
         },
        computed: {
            product() {
                return this.$store.state.product
            },
            productId() {
                return this.$route.params.id
            }
        },
        mounted() {
            console.log(this.productId);
            
            this.$store.dispatch('fetchProduct', this.productId)
        }
    

}
</script>

<style scoped>
.container-fluid{
    min-height: 85vh;
}

</style>