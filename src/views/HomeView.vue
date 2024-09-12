<template>
  <div class="container-fluid pt-5">
    <div class="row align-content-center">
      <h2>Welcome to Novas Digitalis</h2>
    </div>
  </div>
</template>

<script>

export default {

  name: 'HomeView'
}
</script>


<style scoped>
.container-fluid {
  min-height: 100vh;
    background-image: url(https://achar1f.github.io/projectimages/Novas%20Digitalis/LandingBGjpg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.row {
  min-height: 70vh;
  backdrop-filter: brightness(50%);
}
.bi {
    color: #FFA500;
    font-size: x-large;
}

.icon{
    background: none;
    border: none;
}
.buttons{
  display: flex;
  justify-content: space-between;
}
</style>