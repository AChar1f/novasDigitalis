<template>
  <div class="container-fluid d-flex align-items-center justify-content-center">
      <form class="form" @submit.prevent="login">
        <h2>Login In</h2>
      <span class="input-span">
        <label for="email" class="label">Email</label>
        <input type="email" name="email" id="email" v-model="payload.emailAdd" required minlength="13"
      /></span>
      <span class="input-span">
        <label for="password" class="label">Password</label>
        <input type="password" name="password" id="password" v-model="payload.userPass"  minlength="4" required
      /></span>
      <input class="submit" type="submit" value="Log in" />
      <span class="span">Don't have an account? <router-link to="/register">Register</router-link></span>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { reactive } from 'vue'

const store = useStore()

const payload = reactive({ 
  emailAdd: '',
  userPass: ''
})

function login() {
  store.dispatch('login', payload)
}
</script>

<style scoped>
.container-fluid{
    min-height: 85vh;
}

.form {
  --bg-light: #d3d3d3;
  --bg-dark: #2c3e50;
  --clr: #FFA500;
  --clr-alpha: #2c3e50b7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.form .input-span {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form input[type="email"],
.form input[type="password"] {
  border-radius: 0.5rem;
  padding: 1rem 0.75rem;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--clr-alpha);
  outline: 2px solid var(--bg-dark);
}

.form input[type="email"]:focus,
.form input[type="password"]:focus {
  outline: 2px solid var(--clr);
}

.label {
  align-self: flex-start;
  color: var(--clr);
  font-weight: 600;
}

.form .submit {
  padding: 1rem 0.75rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3rem;
  background-color: var(--bg-dark);
  color: var(--bg-light);
  border: none;
  cursor: pointer;
  transition: all 300ms;
  font-weight: 600;
  font-size: 0.9rem;
}

.form .submit:hover {
  background-color: var(--clr);
  color: var(--bg-dark);
}

.span {
  text-decoration: none;
  color: var(--bg-dark);
}

.span a {
  color: var(--clr);
}

input{
    color: #d3d3d3;

}
</style>