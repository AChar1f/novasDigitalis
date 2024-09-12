<template>
    <div class="container-fluid pt-5">
        <h2>Your Cart</h2>
        <div class="table-responsive-lg table-responsive-md table-responsive-sm">
              <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart" :key="item.orderID">
                        <td imgcont><img :src="item.prodURL" :alt="item.prodName" class="img-fluid"></td>
                        <td>{{ item.prodName }}</td>
                        <td>{{ item.UnitPrice }}</td>
                        <td>
                        <button class="btn btn-dark qval" @click.prevent="decrease(item)" type="button" ><i class="bi bi-dash-lg"></i></button> 
                        {{ item.quantity }} 
                        <button class="btn btn-dark qval" @click.prevent="increase(item)" type="button" ><i class="bi bi-plus-lg"></i> </button>
                        </td>
                        <td>{{ item.TotalPrice }}</td>
                        <td> <button class="btn btn-dark" @click="deleteItem(item.orderID)"><i class="bi bi-trash"></i></button></td>
                    </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4">
                    </td>
                    <td> 
                      Grand Total: R{{ grandtotal }}
                    </td>
                    <td><button class="btn">
                    <i class="bi bi-cart-x" @click.prevent="clearCart()"></i>
                </button>
                <button class="btn" @click.prevent="purchase()">
                    <i class="bi bi-cart-check"></i>
                </button></td>
                  </tr>
                </tfoot>
              </table>
        </div>
        <div v-if="!cart?.length">
            <h3>The Cart is empty, please add items.</h3>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()


    export default {
        name: "CheckoutView",
        computed : {
            cart() {
                return store.state.cart
            },

            grandtotal(){
                let num = 0
                for (const value in this.cart) {
                    num = num + (+this.cart[value].TotalPrice)
                    
                }
                return num
            }
        },
        methods: {
            deleteItem(oid) {
                const id = cookies.get('VerifiedUser')?.result.userID
                this.$store.dispatch('deleteItem', {id, oid}).then(() => {
                this.$store.dispatch('fetchCart')
            })
        },
        clearCart() {
            return this.$store.dispatch('clearCart').then(() => {
                this.$store.dispatch('fetchCart')
            })
        },

        increase(product) {
            const volume = product.quantity + 1
            const oid = product.orderID

            const payload = {
                userID : cookies.get('VerifiedUser')?.result.userID,
                cred: {quantity : volume},
                orderID : oid
            }
            console.log(payload);
            
            return this.$store.dispatch('updateCart', payload).then(()=> {
                this.$store.dispatch('fetchCart')
            })
        },

        decrease(product) {
            if(product.quantity > 1) {

            const volume = product.quantity - 1
            const oid = product.orderID
            const payload = {
                userID : cookies.get('VerifiedUser')?.result.userID,
                cred: {quantity : volume},
                orderID : oid
                }
                
                return this.$store.dispatch('updateCart', payload).then(()=> {
                    this.$store.dispatch('fetchCart')
                })

            }

        },
        purchase() {
            if(this.cart?.length > 0) {
                return this.$store.dispatch('checkout').then(() => {
                    this.$store.dispatch('fetchCart')
                })
            }
        }

    },

    mounted(){
        console.log('here');
        
        return store.dispatch('fetchCart')
    }


}
</script>

<style scoped>
.container-fluid {
min-height: 100vh;
}

[imgcont]{
aspect-ratio: 1/1;
  object-fit: contain;
  object-position: center;
  max-width: 4rem;

}
.qval{
font-size: 0.7rem;
}

.table th,
.table td {
  border: 1px solid #d3d3d3;
  padding: 8px;
  text-align: center;
  vertical-align: middle; 
}

.table th{
    background-color: #2c3e50;
    color:#d3d3d3
}

.table td {
    background-color: #2c3e50;;
    color: #d3d3d3;
    min-width: 5rem;
}

button:hover {
  background-color: #2c3e50;
  color:#FFA500;
  border: 1.5px solid #d3d3d3;
}

button {
    background-color: #FFA500;
    margin-inline: 5px;
}

@media (max-width: 992px) {
  
  .table {
    overflow-x: auto;
    white-space: nowrap; 
  }
  
  table button {
    font-size: 1rem;
  }
}

@media (max-width: 928px) {

  .table {
    display: block; 
    overflow-x: auto; 
    white-space: nowrap; 
  }
}

@media (max-width: 768px) {

  .table {
    display: block; 
    overflow-x: auto; 
    white-space: nowrap; 
  }



  .table th,
  .table td {
    padding: 4px; 
    font-size: 1rem; 
  }

  table button {
    font-size: 1rem;
  }

}


@media (max-width: 575px) {
  .table th,
  .table td {
    font-size: 0.9rem; 
  }


  table button {
    font-size: 0.7rem;
  }
}

@media (max-width: 330px) {
  .table {
    display: block;
  }


  table button {
    font-size: 0.5rem;
  }
}
</style>