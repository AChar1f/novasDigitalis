<template>
    <div class="container-fluid pb-5">
        <h2>This is User Profile page</h2>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

    export default {
        name: 'UserProfile',
        
        data() {
            return {
                showUpdateUserModal: false,
                currentUser: {}
            }
        },
        computed: {
            ...mapState(['users'])
        },
        methods: {
            ...mapActions(['updateUser', 'deleteUser']),
            updateUser() {
                this.$store.dispatch('updateUser', {...this.currentUser, userID: this.currentUser.userID}).then(() => {
                    this.showUpdateUserModal = false
                })
            },
            deleteUser(userID) {
      if (confirm('Are you sure you want to permanently delete your account?')) {
        this.$store.dispatch('deleteUser', userID).then(() => {
          this.fetchUsers();
        });
      }
    }
        },
    

}
</script>

<style scoped>
.container-fluid {
    min-height: 100vh;
}

</style>