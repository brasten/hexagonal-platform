import express from 'express'

import buildApiRoutes from './routes/api'

const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/status', (_req, res) => {
  res.send('ok')
})


const PORT = 3001

;(async function() {
  app.listen(PORT, async () => {
    console.log(`Example app listening on port ${PORT}`)

    app.use(await buildApiRoutes())
  })
})()