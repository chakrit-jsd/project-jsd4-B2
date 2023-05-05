import LayoutMainFeed from "../features/layouts/LayoutMainFeed"
import '../assets/styles/style.css'
import { useEffect, useState } from "react"
import { getMe } from "../services/API/usersAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"
import { useNavigate } from "react-router-dom"


const Main = () => {
  const [ user, setUser ] = useState('')
  const [ imgUrl, setImgUrl ] =useState('')
  const navigate = useNavigate()
  useEffect(() => {
    if (user) return
    const getPage = async () => {
      try {
        const res = await getMe()
        setUser(res.data.user)
        setImgUrl(res.data.user.profileImgUrl)
        console.log(res.data.user._id)
      } catch (error) {
        const res = httpErrorCode(error)
        if(res.status !== 200) {
          navigate('/')
        }
      }
    }
    getPage()
  }, [])
  return (
    <LayoutMainFeed user={user} setUser={setUser} imgUrl={imgUrl} setImgUrl={setImgUrl} >

    </LayoutMainFeed>
  )
}

export default Main
