import LayoutMainFeed from "../features/layouts/LayoutMainFeed"
import { useContext, useEffect, useState } from "react"
import { getMe } from "../services/API/usersAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"
import { useNavigate } from "react-router-dom"
import '../assets/styles/style.css'
import { SocketContext } from "./PageMain"


const Main = ({ user, setUser }) => {

  const [ imgUrl, setImgUrl ] =useState('')
  const socket = useContext(SocketContext)

  const getUserByUpdate =  async () => {
    try {
      const res = await getMe()
      setUser(res.data.user)
      setImgUrl(res.data.user.profileImgUrl)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    setImgUrl(user.profileImgUrl)

  }, [user])
  return (
    <LayoutMainFeed title='Me Feed' getUserByUpdate={getUserByUpdate} user={user} setUser={setUser} imgUrl={imgUrl} setImgUrl={setImgUrl} >
    </LayoutMainFeed>
  )
}

export default Main
