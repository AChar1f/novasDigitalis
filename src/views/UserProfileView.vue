<template>
    <div class="container-fluid pb-5">
        <h2>This is User Profile page</h2>
    </div>
</template>

<script >
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const num = ref(0);

    onMounted(() => {
      const hasReloaded = localStorage.getItem('hasReloaded');

      if (!hasReloaded) {
        localStorage.setItem('hasReloaded', 'true');

        setImmediate(() => {
          if (num.value === 0) {
            num.value++;
            window.location.reload();
          }
        });
      } else {
        localStorage.removeItem('hasReloaded');
      }
    });

    return { num };
  }
};


</script>

<style scoped>
.container-fluid {
    min-height: 100vh;
}

</style>