# Analyze Vue source code

## Goal

Trying to implement basic concept of Vue:

1. vueInstance can access data directly.

`this.name === this.$options.data.name`

2. For each value of data, make connections with views to implement reactivity.
3. Add lifecycle (beforeCreate, created, beforeMounted, mounted) and $refs for `ref="xxx"` in template.
4. Implement directives (v-text, v-model, v-html) and event binding (@click).
5. Support watch (function or object), object option only support immediate for the time being.
6. Support Child components

## How to use

1. compile files on watch mode

`yarn compile`

2. start the project

`yarn start`

### If you're using npm, just use `npm run` instead of `yarn`.

## Reference

https://www.youtube.com/watch?v=gedB4Gt-sSQ&t=2062s&ab_channel=%E7%90%86%E7%A7%91%E7%94%9F%E7%9C%8B%E4%B8%96%E7%95%8C
