<template>
  <div class="container-fluid d-flex justify-content-center pb-5">
    <div class="row">
      <form class="form">
        <h3>Become a Digitalist</h3>
        <input
          type="text"
          v-model="newUser.firstName"
          class="form-control"
          placeholder="First Name"
        />
        <input
          type="text"
          v-model="newUser.lastName"
          class="form-control"
          placeholder="Last Name"
        />
        <input
          type="text"
          v-model="newUser.gender"
          class="form-control"
          placeholder="Gender"
        />
        <input
          type="text"
          v-model="newUser.userAge"
          class="form-control"
          placeholder="Age"
        />
        <input
          type="email"
          v-model="newUser.emailAdd"
          class="form-control"
          placeholder="Email"
        />
        <input
          type="password"
          v-model="newUser.userPass"
          class="form-control"
          placeholder="Password"
        />
        <button @click.prevent="addUser" class="submit">Register</button>
        <span class="span">Already have an account? <router-link to="/login">Login</router-link></span>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RegisterView",
  data() {
    return {
      newUser: {
        firstName: "",
        lastName: "",
        userAge: "",
        emailAdd: "",
        userPass: "",
        gender: "",
        userProfile: "https://codjoelmayer.github.io/projectImages/images/profile-Image.png"

      },
    };
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    ...mapActions(['addUser']),
    addUser() {
      if (
        this.newUser.firstName &&
        this.newUser.lastName &&
        this.newUser.userAge &&
        this.newUser.emailAdd &&
        this.newUser.userPass
      ) {
        this.$store.dispatch("addUser", this.newUser).then(() => {
          this.showAddUserForm = false;
          this.newUser = {
            firstName: "",
            lastName: "",
            gender: "",
            userAge: "",
            emailAdd: "",
            userPass: "",
            userProfile: "https://codjoelmayer.github.io/projectImages/images/profile-Image.png"
          }
        });
      } else {
        alert("Please fill in all fields.");
      }
    },
  },
};
</script>

<style scoped>
.container-fluid {
  min-height: 100vh;
  align-items: center;
}

.form {
  --bg-light: #d3d3d3;
  --bg-dark: #2c3e50;
  --clr: #ffa500;
  --clr-alpha: #2c3e50b7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.form input[type="text"],
.form input[type="number"],
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

.form input[type="text"]:focus,
.form input[type="number"]:focus,
.form input[type="email"]:focus,
.form input[type="password"]:focus {
  outline: 2px solid var(--clr);
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

input {
  color: #d3d3d3;
}
</style>
