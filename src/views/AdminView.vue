<template>
<div class="container-fluid admin-section pb-5">      
<div class="row  pt-4">
  <h2 class="headings ">Users</h2>
</div>
<button @click="showAddUserForm = true" class="add-user-button btn mt-3 mb-3">Add User</button>

<!-- Add User Form -->
<div v-if="showAddUserForm" class="modal-overlay">
  <form class="modal-content">
    <h3>Add New User</h3>
    <input v-model="newUser.userProfile" type="text" placeholder="Profile URL">
    <input v-model="newUser.firstName" type="text" placeholder="First Name">
    <input v-model="newUser.lastName" type="text" placeholder="Last Name">
    <input v-model="newUser.userAge" type="text" placeholder="Age">
    <input v-model="newUser.gender" type="text" placeholder="Gender">
    <input v-model="newUser.emailAdd" type="email" placeholder="Email">
    <input v-model="newUser.userPass" type="password" placeholder="Password">
    <button class="btn mt-1 mb-1" @click.prevent="addUser">Submit</button>
    <button class="btn mt-1 mb-1" @click="showAddUserForm = false">Cancel</button>
  </form>
</div>

<table class="table table-responsive">
  <thead>
    <tr>
      <th>Profile</th>
      <th>ID</th>
      <th>First Name</th>
    <th>Last Name</th>
    <th>Age</th>
    <th>Gender</th>
    <th>Email</th>
    <th>Role</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  <tr v-for="(user, userID) in users" :key="userID">
    <td> <img :src="user.userProfile " alt="profile"></td>
    <td>{{ user.userID }}</td>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.userAge }}</td>
    <td>{{ user.gender }}</td>
    <td>{{ user.emailAdd }}</td>
    <td>{{ user.userRole }}</td>
    <td>
      <button class="btn mt-1 mb-1" @click="openUpdateUserModal(user)">Update</button>
      <button class="btn mt-1 mb-1" @click="deleteUser(user.userID)">Delete</button>
    </td>
  </tr>
</tbody>
</table>

<!-- Update User Modal -->
<div v-if="showUpdateUserModal" class="modal-overlay">
<form class="modal-content">
  <h3>Update User</h3>
  <input v-model="currentUser.userProfile" type="text" placeholder="Profile URL">
  <input v-model="currentUser.firstName" type="text" placeholder="First Name">
  <input v-model="currentUser.lastName" type="text" placeholder="Last Name">
  <input v-model="currentUser.userAge" type="number" placeholder="Age">
  <input v-model="currentUser.gender" type="text" placeholder="Gender">
  <input v-model="currentUser.emailAdd" type="email" placeholder="Email">
  <input v-model="currentUser.userPass" type="password" placeholder="Password">
  <button class="btn mt-1 mb-1" @click.prevent="updateUser(currentUser)">Save changes</button>
  <button class="btn mt-1 mb-1" @click="closeUpdateUserModal">Cancel</button>
</form>
</div>




<div class="row pt-4">
<h2 class="headings ">Products</h2>
</div>

<button @click="showAddProductForm = true" class="add-product-button btn mt-3 mb-3">Add Product</button>

<!-- Add Product Form -->
<div v-if="showAddProductForm" class="modal-overlay">
<form class="modal-content" >
  <h3>Add New Product</h3>
  <input v-model="newProduct.prodURL" type="text" placeholder="Product URL">
  <input v-model="newProduct.prodName" type="text" placeholder="Product Name">
  <input v-model="newProduct.prodDescription" type="text" placeholder="Description">
  <input v-model="newProduct.category" type="text" placeholder="Category">
  <input v-model="newProduct.amount" type="number" placeholder="Price">
  <input v-model="newProduct.quantity" type="number" placeholder="Quantity">
  <button class="btn mt-1 mb-1" @click.prevent="addProduct">Submit</button>
  <button class="btn mt-1 mb-1" @click="showAddProductForm = false">Cancel</button>
</form>
</div>

<table class="table products-table table-responsive mb-4">
<thead>
  <tr>
    <th>Product</th>
    <th>ID</th>
    <th>Product Name</th>
    <th>Description</th>
    <th>Category</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  <tr v-for="product in products" :key="product.id">
    <td> <img :src="product.prodURL" alt="product"></td>
    <td>{{ product.prodID }}</td>
    <td>{{ product.prodName }}</td>
    <td>{{ product.prodDescription }}</td>
    <td>{{ product.category }}</td>
    <td>R {{ product.amount }}</td>
    <td>{{ product.quantity }}</td>
    <td>
      <button class="btn mt-1 mb-1" @click="openUpdateProductModal(product)">Update</button>
      <button class="btn mt-1 mb-1" @click="deleteProduct(product.prodID)">Delete</button>
    </td>
  </tr>
</tbody>
</table>

<!-- Update Product Modal -->
<div v-if="showUpdateProductModal" class="modal-overlay">
<form class="modal-content">
  <h3>Update Product</h3>
  <input v-model="currentProduct.prodURL" type="text" placeholder="Product URL">
  <input v-model="currentProduct.prodName" type="text" placeholder="Product Name">
  <input v-model="currentProduct.prodDescription" type="text" placeholder="Description">
  <input v-model="currentProduct.category" type="text" placeholder="Category">
  <input v-model="currentProduct.amount" type="number" placeholder="Price">
  <input v-model="currentProduct.quantity" type="number" placeholder="Quantity">
  <button class="btn mt-1 mb-1" @click.prevent="updateProduct(currentProduct)">Save changes</button>
  <button class="btn mt-1 mb-1" @click="closeUpdateProductModal">Cancel</button>
</form>
</div>
</div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

    export default {
        name: 'AdminView',
        data() {
    return {
      showAddUserForm: false,
      showAddProductForm: false,
      showUpdateUserModal: false,
      showUpdateProductModal: false,
      newUser: {
      userProfile: 'https://achar1f.github.io/projectimages/Novas%20Digitalis/LogoNoBg.png',
      firstName: '',
      lastName: '',
      userAge: '',
      gender: '',
      emailAdd: '',
      userPass: ''
    },
    newProduct: {
      prodURL: '',
      prodName: '',
      prodDescription: '',
      category: '',
      amount: '',
      quantity: ''
    },
    currentUser: {},
    currentProduct: {}
  };
},
  computed: {
    ...mapState(['users', 'products'])
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchProducts', 'updateUser', 'deleteUser', 'updateProduct', 'deleteProduct']),
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
      if (confirm('Are you sure you want to delete this user?')) {
        this.$store.dispatch('deleteUser', userID).then(() => {
          this.fetchUsers();
        });
      }
    },
    openUpdateProductModal(product) {
      this.currentProduct = { ...product };
      this.showUpdateProductModal = true;
    },
    closeUpdateProductModal() {
      this.showUpdateProductModal = false;
    },
    updateProduct() {
      this.$store.dispatch('updateProduct', { ...this.currentProduct, prodID: this.currentProduct.prodID }).then(() => {
        this.showUpdateProductModal = false;
      })
      .catch(error => {
        console.error('Error updating user:', error)
        alert('Failed to update user')
      })
    },
    deleteProduct(prodID) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.$store.dispatch('deleteProduct', prodID).then(() => {
          this.fetchProducts();
        });
      }
    },
    addUser() {
      if (this.newUser.userProfile && this.newUser.firstName && this.newUser.lastName && this.newUser.userAge && this.newUser.emailAdd && this.newUser.userPass) {
        this.$store.dispatch('register', this.newUser).then(() => {
          this.showAddUserForm = false;
          this.newUser = { userProfile: 'https://achar1f.github.io/projectimages/Novas%20Digitalis/LogoNoBg.png', firstName: '', lastName: '', userAge: '', emailAdd: '', userPass: '' };
        }).catch(error => {
          console.error('Error adding user:', error)
          alert('Failed to add user')
        })
      } else {
        alert('Please fill in all fields.');
      }
    },
    addProduct() {

      if (this.newProduct.prodURL && this.newProduct.prodName && this.newProduct.prodDescription && this.newProduct.category && this.newProduct.amount  && this.newProduct.quantity ) {
        this.$store.dispatch('addProduct', this.newProduct).then(() => {
          this.showAddProductForm = false;
          this.newProduct = { prodURL: '', prodName: '', prodDescription: '', category: '', amount: '', quantity: '' };
        }) ;
      } else {
        alert('Please fill in all fields.');
      }
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchProducts();
  }
    }
</script>

<style scoped>
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
  background-color: #2C3E50;
  color:#FFA500;
  border: 1px solid #d3d3d3;
}

button {
    background-color: #FFA500;
    margin-inline: 5px;
}

.add-user-button, .add-product-button {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #FFA500;
  border: 1px solid black;
  border-radius: 5px;
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

.admin-section {
  position: relative;
  z-index: 2; 
  padding: 20px;
  width: 100vw;
  min-height: 100vh;
}

@media (max-width: 1350px) {

.table {
  overflow-x: auto;
  white-space: nowrap; 
}

.products-table {
  display: block; 
}
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