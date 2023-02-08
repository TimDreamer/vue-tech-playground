<template>
  <div>
    <h1>Page not found!</h1>
    <p>Redirecting to home page in 3 seconds...</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  mounted() {
    setTimeout(() => {
      this.$router.replace()
    }, 3000)
  },
}
</script>

<style>
</style>
