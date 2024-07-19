<script>
export default {
    data () {
        return {
            name:'carrello',
        }
    },
    created() {
        console.log(this.$route.params);
    }
}
</script>

<template>
    <div class="container md_cont">
        <h1 class="py-5">carrello</h1>

    </div>
</template>
<style>
.md_cont{
    margin-top: 200px;
   
}
</style>