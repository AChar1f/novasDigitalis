<template>
    <div class="container-fluid col-10 pt-5">
        <h2>This is Product Page</h2>
        <form>
            <input type="search" v-model="itemSearch">
            <select v-model="sCategory">
                <option value="">All</option>
                <option value="CPU">CPU</option>
                <option value="Ram">RAM</option>
                <option value="Monitor">Monitor</option>
                <option value="Chasis">Chasis</option>
                <option value="Motherboard">Motherboard</option>
                <option value="Mice">Mice</option>
                <option value="Keyboards">Keyboards</option>
                <option value="Power Supplies">Power Supplies</option>
                <option value="Storage">Storage</option>
            </select>
            <button @click.prevent="toggleSortOrder">Sort By Price: {{ sortPriceVal }}</button>
        </form>
        <div v-if="products?.length" class="row justify-content-center gap-4 mb-4">
            <div v-if="!sortedFilteredProd.length">
                <p>Product not Found</p>
            </div>
            <CardComp v-for="product in sortedFilteredProd" :key="product.prodID">
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
    data(){
        return{
            itemSearch: '',
            sCategory: '',
            sortOrder: 'asc'
        }
    },
    computed: {
        products() {
            return this.$store.state.products
        },
        currentUserID(){
            return cookies.get('VerifiedUser')?.result.userID
        },
        filteredProducts() {
            return this.products.filter(product => product.prodName.toLowerCase().includes(this.itemSearch.toLowerCase()) && (this.sCategory === '' || product.category === this.sCategory))
        },
        sortedFilteredProd() {
            return this.filteredProducts.slice().sort((a, b) => {
                if(this.sortOrder === 'asc'){
                    return a.amount - b.amount
                } else {
                    return b.amount - a.amount
                }
            })
        },
        sortPriceVal(){
            return this.sortOrder == 'asc' ? 'Lowest' : 'Highest'
        }
    },
    methods : {
        addProd(product){
            const payload = {
                id : cookies.get('VerifiedUser')?.result.userID,
                cred : { prodID : product.prodID }
            }
            return store.dispatch('addToCart', payload )
        },

        toggleSortOrder() {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
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