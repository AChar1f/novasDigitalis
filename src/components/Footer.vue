<template>
    <footer class="fixed-bottom">
       Novas Digitalis &copy; {{ cYear }} 
    </footer>
</template>

<script>

    export default {
        name: "FooterComp",
        data() {
            return {
                cYear: new Date().getUTCFullYear()
            }
        }
    

}
</script>

<style scoped>
footer {
    background-color: #2C3E50;
    color: #D3D3D3;
    min-height: 2rem;
    max-width: 100vw;
    align-content: center;
}

</style>