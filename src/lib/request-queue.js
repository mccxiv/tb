import { respond } from './request-handlers'

let currentReqRes = null
const reqResQueue = []

setInterval(handleNextRequestMaybe, 50)

export function queueRequest (req, res) {
  reqResQueue.push({req, res})
}

async function handleNextRequestMaybe () {
  if (!currentReqRes && reqResQueue.length) {
    console.log(`Responding... There are ${reqResQueue.length} requests pending`)
    currentReqRes = reqResQueue.shift()
    try { respond(currentReqRes.req, currentReqRes.res) }
    finally { currentReqRes = null }
  }
}
