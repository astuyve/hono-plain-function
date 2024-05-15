const staticInitTime = Date.now();
let isColdStart = true;
import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

const app = new Hono()

app.get('/', (c) => {
  let coldStartResult = false;
  if (isColdStart) {
    isColdStart = false;
    coldStartResult = true;
  }
  const handlerRunTime = Date.now();
  const resp = {
    handlerRunTime,
    staticInitTime,
    coldStartResult,
    processUptime: process.uptime(),
  }
  return c.json(resp)
})

export const handler = handle(app)
