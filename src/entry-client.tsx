import { createStartHandler } from '@tanstack/start/client'
import { createRouter } from './router'

const router = createRouter()

export default createStartHandler({
  router,
})