<template>
  <div>
    <h1>{{ name }}</h1>
    <p>{{ age }}</p>
  </div>
</template>

<script>
export default {
  name: 'myProfile',
  data() {
    return {
      name: 'Tim',
      age: 28,
    }
  },
}
</script>

<style>
</style>
