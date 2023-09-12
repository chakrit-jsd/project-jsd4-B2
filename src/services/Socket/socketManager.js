import { Manager } from "socket.io-client"

const manager = new Manager('localhost:3006', { autoConnect: false, transports: ['websocket'], multiplex: true })

const initSocket = (namespace = '/chat' || '/notification') => {
  return manager.socket(namespace, { auth: { ['access_token']: null }})
}

export {
  initSocket
}
