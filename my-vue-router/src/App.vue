<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-view />
    <div class="btn-group">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <button @click="$router.push('/about/profile')">
        use router push to About page with profile
      </button>
      <button @click="$router.push({ path: '/about/preferences' })">
        use router push to About page with preferences
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
</style>
