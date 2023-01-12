<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ $store.state.title }}</h1>
    <p>single count: {{ $store.state.count }}</p>
    <p>double count: {{ $store.getters.doubleCount }}</p>
    <button @click="$store.commit(ADD_COUNT, 1)">
      mutation count directly
    </button>
    <button @click="$store.dispatch(ADD_COUNT, 1)">dispatch count + 1</button>
  </div>
</template>

<script>
import { ADD_COUNT } from './store'

export default {
  name: 'App',
  data() {
    return {
      ADD_COUNT,
    }
  },
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
</style>
