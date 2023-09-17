import { Manager } from "socket.io-client"

const manager = new Manager(import.meta.env.VITE_SOCKET_URL, { autoConnect: false, transports: ['websocket'], multiplex: true,   })

const initSocket = (namespace = '/chat' || '/notification') => {
  return manager.socket(namespace, { auth: { ['access_token']: null }})
}

export {
  initSocket
}
