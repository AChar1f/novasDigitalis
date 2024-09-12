<template>
    <div class="container-fluid">
        <h2>Account</h2>
        <h2>Welcome {{user.firstName}}</h2>
  <div class="row justify-content-center p-3">
<div class="card text-center" v-if="user">
  <div class="card-header">
    <img :src="user.userProfile" :alt="user.firstName" class="img-fluid" loading="lazy">
  </div>
  <div class="card-body">
    <h6>{{ user.firstName }}  {{ user.lastName }}</h6>
    <p>{{ user.emailAdd }}</p>
    <button class="btn mt-1 mb-1" @click="openUpdateUserModal(user)"><i class="bi bi-pencil-square"></i></button>
    <button class="btn mt-1 mb-1" @click="deleteUser(user.userID)"><i class="bi bi-trash"></i></button>
    <button class="btn mt-1 mb-1" @click="logOut"><i class="bi bi-box-arrow-right"></i></button>
  </div>
</div>
        </div>


<!-- Edit User -->
<div v-if="showUpdateUserModal" class="modal-overlay">
<form class="modal-content">
  <h3>Update User</h3>
  <input v-model="currentUser.userProfile" type="text" placeholder="Profile URL">
  <input v-model="currentUser.firstName" type="text" placeholder="First Name">
  <input v-model="currentUser.lastName" type="text" placeholder="Last Name">
  <input v-model="currentUser.userAge" type="text" placeholder="Age">
  <input v-model="currentUser.gender" type="text" placeholder="Gender">
  <input v-model="currentUser.emailAdd" type="email" placeholder="Email">
  <input v-model="currentUser.userPass" type="password" placeholder="Password">
  <button class="btn mt-1 mb-1" @click.prevent="updateUser(currentUser)">Save changes</button>
  <button class="btn mt-1 mb-1" @click="closeUpdateUserModal">Cancel</button>
</form>
</div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'   
import { useCookies } from 'vue3-cookies';
import router from '@/router';
const {cookies} = useCookies()


const vUser = cookies.get('VerifiedUser').result
console.log(vUser)
export default {

    data() {
        return{
            showUpdateUserModal: false,
            currentUser: {}
        }
    },

    computed: {
        ...mapState(['user']),

        user() {
            return vUser
        },

        userFilter() {
            const currUID = cookies.get('VerifiedUser').result.userID
            console.log(currUID)

            return this.users.filter(users => users.userID === currUID)
        }
    },
    methods: {
        ...mapActions(['fetchUsers', 'fetchUser', 'updateUser', 'deleteUser']),
    
        openUpdateUserModal(user) {
            this.currentUser = { ...user };
            this.showUpdateUserModal = true;
        },
    
        closeUpdateUserModal() {
          this.showUpdateUserModal = false;
        },

        updateUser() {
            this.$store.dispatch('updateUser', {...this.currentUser, userID: this.currentUser.userID }).then(() => {
                this.showUpdateUserModal = false;
            });
        },

        deleteUser(userID) {
            if (confirm('Are you sure you want to delete your account?')) {
                this.$store.dispatch('removeAccount', userID).then(() => {
                this.fetchUsers();
                });
            }
         },
         logOut(){          
             cookies.remove('VerifiedUser')
            router.push({ name: 'login'})
            setTimeout(() => {
                window.location.reload()
                }, 500
            )
        }
    },

    mounted() {
        this.fetchUsers()
    }

};


</script>

<style scoped>
.container-fluid {
    min-height: 100vh;
}

.card{
  width: 25rem; 
  background-image: linear-gradient(180deg, #2C3E50 65%,#2c2c2c);
  color: #d3d3d3;
}

table img {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 3rem;
}


.table th,
.table td {
  border: 1px solid white;
  padding: 8px;
  text-align: center;
  vertical-align: middle; 
}

.table th {
  background-color: #2C2C2C;
  color: #D3D3D3;
}

.table tr:hover {
  background-color: #2C2C2C;
  color: #D3D3D3;
}

 table td {
    background-color: #D3D3D3;
}


button:hover {
  background-color: #2c3e50c0;
  color:#FFA500;
  border: 1px solid #d3d3d3;
}

button {
    background-color: #FFA500;
    margin-inline: 5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #D3D3D3;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 30%;
  min-width: 18rem;
  color: #2C3E50;
}

.modal-content input {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding-inline: 0.3rem;
}

.headings {
    color: #d3d3d3;
}

@media (max-width: 992px) {
  
  .table {
    overflow-x: auto;
    white-space: nowrap; 
  }
  
  table button {
    width: 4.5rem;
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

  .table img {
    width: 2rem; 
  }

  .table th,
  .table td {
    padding: 4px; 
    font-size: 1rem; 
  }

  table button {
    width: 4.5rem;
    font-size: 1rem;
  }

}


@media (max-width: 575px) {
  .table th,
  .table td {
    font-size: 0.9rem; 
  }


  table button {
    width: 3.5rem;
    font-size: 0.7rem;
  }
}

@media (max-width: 330px) {
  .table {
    display: block;
  }

  table img {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 2rem;
  }

  table button {
    width: 3.5rem;
    font-size: 0.7rem;
  }
}
</style>