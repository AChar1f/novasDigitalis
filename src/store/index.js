import { createStore } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import router from '@/router'
import { useCookies } from 'vue3-cookies'
const {cookies} = useCookies()
import { applyToken } from '@/service/VerfiedUser.js'

const apiURL = 'http://localhost:3010/'

applyToken(cookies.get('VerifiedUser')?.token)

export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    recentProducts: null,
    product: null,
    cart: null
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value
    },

    setUser(state, value) {
      state.user = value
    },

    setProducts(state, value) {
      state.products = value
    },

    setRecentProducts(state, value) {
      state.recentProducts = value
    },

    setProduct(state, value) {
      state.product = value
    },

    setCart(state, value) {
      state.cart = value
    }
  },
  actions: {
    
    // Users

    async fetchUsers(context) {
      try {
        const { results, msg } = await(await axios.get(`${apiURL}users`)).data
        if (results) {
          context.commit('setUsers', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        } )
      }
    },

    async fetchUser(context, userID) {
      try {
        const { result, msg } = await(await axios.get(`${apiURL}users/${userID}`)).data
        if (result) {
          context.commit('setUser', result)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async register(context, payload) {
      try {
        const { token, msg, error } = await(await axios.post(`${apiURL}users/register`, payload)).data
        if (token) {
          context.dispatch('fetchUsers')
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          }) 
          // router.push({ name: 'login'})
        } else {
            toast.warning(`${error}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
      }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async updateUser(context, payload) {
      console.log(payload);
      try {
        const { msg, err} = await(await axios.patch(`${apiURL}users/update/${payload.userID}`, payload)).data
        if (msg) {
          context.dispatch('fetchUsers')
            toast.success(`${msg}`, {
              autoClose: 2000,
              position: 'bottom-center'
            })
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async deleteUser(context, userID) {
      try {
        const { msg, err } = await(await axios.delete(`${apiURL}users/delete/${userID}`)).data
        if (msg) {
          context.dispatch('fetchUsers')
          toast.success(`${msg}`, {
            autoClose: 2000, 
            position: 'bottom-center'
          })
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async login(context, payload) {
      try {
        const { msg, result, token } = await (await axios.post(`${apiURL}users/login`, payload)).data
        if (result) {
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
          context.commit('setUser', {
            msg,
            result
          })
          cookies.set('VerifiedUser', {token, msg, result})
          applyToken(token)
          router.push({ name: 'products' })
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },
    
    // Products

    async fetchProducts(context) {
      try {
        const { results, msg } = await(await axios.get(`${apiURL}items`)).data
        
        if (results) {
          context.commit('setProducts', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async recentProducts(context) {
      
      try {
        const { results, msg } = await(await axios.get(`${apiURL}items/recent`)).data
        if(results) {
          context.commit('setRecentProducts', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async fetchProduct(context, prodID) {
      try {
        const { result, msg } = await(await axios.get(`${apiURL}items/${prodID}`)).data
        if (result) {
          context.commit('setProduct', result)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },   

    async addProduct(context, payload) {
      try {
        const { msg } = await(await axios.post(`${apiURL}items/addProduct`, payload)).data
        if (msg) {
          context.dispatch('fetchProducts')
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        } 
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async updateProduct(context, payload) {
      try {
        const { msg } = await(await axios.patch(`${apiURL}items/update/${payload.prodID}`, payload)).data
        if (msg) {
          context.dispatch('fetchProducts')
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async deleteProduct(context, prodID) {
      try {
        const { msg } = await(await axios.delete(`${apiURL}items/delete/${prodID}`)).data
        if (msg) {
          context.dispatch('fetchProducts')
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async addToCart(context, payload){
      try {
        console.log(payload);
        const { results, msg } = await(await axios.post(`${apiURL}users/${payload.id}/cart`, payload.cred)).data
        if(results) {
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },
    async fetchCart(context){
      try {
        const { results, msg } = await(await axios.get(`${apiURL}users/${cookies.get('VerifiedUser')?.result.userID}/carts`)).data
        
        if(results) {
          context.commit('setCart', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },
    async checkout(context){
      try {
        const data = await (await axios.delete(`${apiURL}users/${cookies.get('VerifiedUser')?.result.userID}/cart`)).data

        if(data) {
          context.dispatch('fetchCart')
          Swal.fire({
            title: 'Thank You for your purchase!',
            text: 'Enjoy your purchase!',
            icon: 'success',
            confirmButtonText: 'Confirm'
        })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async clearCart(context){
      try {
        console.log(`${apiURL}`)
        const data = await (await axios.delete(`${apiURL}users/${cookies.get('VerifiedUser')?.result.userID}/cart`)).data

        if(data) {
          context.dispatch('fetchCart')
          toast.success(`${data.msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async deleteItem(context, payload){
      try {
        const { msg } = await(await axios.delete(`${apiURL}users/${payload.id}/cart/${payload.oid}`)).data
        if(msg) {
          context.dispatch('fetchCart')
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    },

    async updateCart(context, payload) {
      try {
        const { msg } = await (await axios.patch(`${apiURL}users/${payload.userID}/cart/${payload.orderID}`, payload.cred)).data
        if(msg) {

          
          context.dispatch('fetchCart')
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: 'bottom-center'
        })
      }
    }
  },
  modules: {
  }
})
