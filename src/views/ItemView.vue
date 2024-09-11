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
                    <button class="icon"><i class="bi bi-cart4" @click.prevent="addProd(product)"></i></button>
                </template>
            </CardComp>
        </div>
        <Spinner v-else/>
    </div>
</template>

<script>
import store from '@/store'
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies()
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
        methods: {
            addProd(product){
            const payload = {
                id : cookies.get('VerifiedUser')?.result.userID,
                cred : { prodID : product.prodID }
            }
            return store.dispatch('addToCart', payload )
        },
        },
        mounted() {
            console.log(this.productId);
            
            this.$store.dispatch('fetchProduct', this.productId)
        }
    

}
</script>

<style scoped>
.container-fluid{
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
</style>