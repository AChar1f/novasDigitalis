<template>
    <div class="card">
        <div class="card-header">
            <slot name="cardHeader"></slot>
        </div>
        <div class="card-body">
            <slot name="cardBody"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardComp"
}
</script>

<style scoped>
.card {
  width: 18rem;
  padding-block: 9px;
  background-image: linear-gradient(180deg, #2C3E50 65%,#2c2c2c);
  color: white;
  border: 2px solid silver;
}    
</style>