import { createStore } from 'vuex'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import router from '@/router'
import { useCookies } from 'vue3-cookies'
const {cookies} = useCookies()
import { applyToken } from '@/service/VerfiedUser.js'

const apiURL = 'https://novasdigitalis.onrender.com/'

applyToken(cookies.get('VerifiedUser')?.token)

export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    recentProducts: null,
    product: null
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
        const { msg, err } = await(await axios.post(`${apiURL}users/register`, payload)).data
        if (msg) {
          context.dispatch('fetchUsers')
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: 'bottom-center'
          }) 
          // router.push({ name: 'login'})
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
          router.push({ name: 'profile' })
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
    }
  },
  modules: {
  }
})
