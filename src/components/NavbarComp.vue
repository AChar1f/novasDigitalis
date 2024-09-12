<template>
<nav class="navbar navbar-expand-lg sticky-top">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/"><img src="https://achar1f.github.io/projectimages/Novas Digitalis/LogoNoBg.png" alt="logo"></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link"  to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/checkout">Checkout</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contactUs">Contact Us</router-link>
        </li>
        <li class="nav-item" v-show="!user?.result">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li class="nav-item" v-show="user?.result?.userRole == 'Admin'">
          <router-link class="nav-link" to="/admin">Admin</router-link>
        </li>
        <li class="nav-item" v-if="!user?.result">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link class="nav-link" to="/profile"><i class="bi bi-person-square"></i></router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script setup>
import { computed } from 'vue';
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies()

 const user = computed(()=>{
    return cookies.get('VerifiedUser')
  })
  


</script>

<style scoped>
.navbar{
    background-color: #2C3E50;
}

.nav-link {
    color: #D3D3D3;

    &:hover{
        color: #FFA500;
        text-decoration: underline;
    }
}
</style>