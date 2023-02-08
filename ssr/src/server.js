const express = require('express')
const { createRenderer } = require('vue-server-renderer')
const Vue = require('vue')

const app = express()
const PORT = 1234
const renderer = createRenderer()

app.get('*', async (req, res) => {
  try {
    const app = new Vue({
      template: '<h1>{{title}}</h1>',
      data() {
        return {
          title: 'Hello',
        }
      },
    })

    const html = await renderer.renderToString(app)
    res.send(html)
  } catch (err) {
    res.status(404).send('Page not found.')
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
