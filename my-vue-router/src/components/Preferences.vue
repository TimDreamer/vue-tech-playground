<template>
  <div>
    <h1>Hobby</h1>
    <ol>
      <li v-for="(hobby, index) in hobbies" :key="index">
        {{ hobby }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'myPreferences',
  data() {
    return {
      hobbies: ['work out', 'live steam', 'anime', 'coding', '.etc'],
    }
  },
}
</script>

<style>
</style>
