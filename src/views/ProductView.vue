<template>
    <div class="container-fluid col-10 pt-5">
        <h2>This is Product Page</h2>
        <div v-if="products?.length" class="row justify-content-center gap-4 mb-4">
            <CardComp v-for="product in products" :key="product.prodID">
                <template #cardHeader>
                    <img :src="product.prodURL" loading="lazy" class="img-fluid" :alt="product.prodName">
                </template>
                <template #cardBody>
                    <h5>{{ product.prodName }}</h5>
                    <p class="lead">R{{ product.amount }}</p>
                    <div class="buttons">
                        <router-link :to="`/item/${product.prodID}`">
                            <button class="icon"><i class="bi bi-info-square-fill"></i></button>
                        </router-link>
                        <button class="icon" @click.prevent="addProd(product)" ><i class="bi bi-cart4" ></i></button>
                    </div>
                </template>
            </CardComp>
        </div>
        <Spinner v-else class="mt-5"/>
    </div>
</template>

<script>
import store from '@/store';
import CardComp from '../components/Card.vue'
import Spinner from '../components/Spinner.vue'
import { useCookies } from 'vue3-cookies'
const {cookies} = useCookies()

export default {
    name: 'ProductView',
    components: {
        CardComp, Spinner
    },
    computed: {
        products() {
            return this.$store.state.products
        },
        currentUserID(){
            return cookies.get('VerifiedUser')?.result.userID
        },
    },
    methods : {
        addProd(product){
            const payload = {
                id : cookies.get('VerifiedUser')?.result.userID,
                cred : { prodID : product.prodID }
            }
            return store.dispatch('addToCart', payload )
        }
    },
    mounted() {
        console.log(cookies.get('VerifiedUser')?.result.userID);
        this.$store.dispatch('fetchProducts')
    }
}
</script>

<style scoped>
.container-fluid {
    min-height: 85vh;
}
.bi {
    color: #FFA500;
    font-size: x-large;
}

.icon{
    background: none;
    border: none;
}
.buttons {
    display: flex;
    justify-content: space-between;
}
</style>