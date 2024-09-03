<!-- <template>
    <div>
        <h2>This is the Item View</h2>
        <div v-if="product">
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
            this.$store.dispatch('fetchProduct', this.productId)
        }
    

}
</script>

<style scoped>


</style> -->