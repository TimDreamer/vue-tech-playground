const express = require('express')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const absPath = (filename) => path.resolve(__dirname, filename)
const app = express()
const PORT = 1234

app.use(
  express.static(absPath('../dist/client'), {
    index: false,
  })
)

const renderer = createBundleRenderer(
  absPath('../dist/server/vue-ssr-server-bundle.json'),
  {
    runInNewContext: false,
    template: require('fs').readFileSync(
      absPath('../public/index.html'),
      'utf-8'
    ),
    clientManifest: require(absPath(
      '../dist/client/vue-ssr-client-manifest.json'
    )),
  }
)

app.get('*', async (req, res) => {
  try {
    const context = {
      url: req.url,
    }

    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (err) {
    console.log(err)
    res.status(404).send('Page not found.')
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
