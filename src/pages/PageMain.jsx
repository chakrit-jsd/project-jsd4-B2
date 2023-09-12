import MainAnother from "./MainAnother"
import Main from "./Main"
import { createContext, useEffect, useState } from "react"
import { getUserToken } from "../services/API/authAPI"
import { initSocket } from "../services/Socket/socketManager"
import ChatFooter from "../features/chat/ChatFooter"
import { getMe } from "../services/API/usersAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"
import { useNavigate } from "react-router-dom"

export const SocketContext = createContext(null)
const PageMain = () => {
  const navigate = useNavigate()
  const [ user, setUser ] = useState('')
  const [ token, setToken ] = useState(null)
  const path = location.pathname.slice(0, 3)

  const chat = initSocket('/chat')
  const noti = initSocket('/notification')

  const getToken = async () => {
    try {
      const restoken = await getUserToken()
      setToken(restoken.data.token)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (user) return
    const getPage = async () => {
      try {
        const res = await getMe()
        setUser(res.data.user)
      } catch (error) {
        const res = httpErrorCode(error)
        if(res.status !== 200) {
          navigate('/')
        }
      }
    }
    getPage()
    getToken()
  }, [])

  useEffect(() => {
    if (!token) return

    chat.auth['access_token'] = token
    if (!chat.connected) {
      // console.log('chat cc')
      chat.connect()
    }

    chat.on('connect_error', (err) => {
      console.log(err)
      if (err.message === 'token expired') {
        getToken()
      }
    })

    noti.auth['access_token'] = token
    if (!noti.connected) {
      // console.log('noti cc')
      noti.connect()
    }

    noti.on('connect_error', (err) => {
      console.log(err)
    if (err.message === 'token expired') {
        getToken()
      }
    })
    return () => {
      chat.off('connect_error')
      chat.disconnect()
      noti.off('connect_error')
      noti.disconnect()
    }
  }, [token])

  return (
    <SocketContext.Provider value={{ chat, noti }}>
      {path === '/me' ? <Main user={user} setUser={setUser} /> : <MainAnother />}
      {user ? <ChatFooter user={user} /> : null}
    </SocketContext.Provider>
  )
}

export default PageMain
