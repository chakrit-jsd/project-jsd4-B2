import LayoutMainFeed from "../features/layouts/LayoutMainFeed"
import { useContext, useEffect, useState } from "react"
import { getAnother } from "../services/API/usersAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"
import { useNavigate, useParams } from "react-router-dom"
import '../assets/styles/style.css'

const MainAnother = () => {
  const { userId } = useParams()

  const [ user, setUser ] = useState('')
  const [ imgUrl, setImgUrl ] = useState('')
  const navigate = useNavigate()
  // console.log(user)
  const getUserByUpdate = async () => {
    try {
      const res = await getAnother(userId)
      setUser(res.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // if (user) return
    window.scrollTo(0, 0)
    const getPage = async () => {
      try {
        const res = await getAnother(userId)

        if (res.status !== 200) throw res
        setUser(res.data.user)
        setImgUrl(res.data.user.profileImgUrl)
        // console.log(res.data.user._id)
      } catch (error) {
        const res = httpErrorCode(error)

        if (res.status === 307) {
          return navigate('/me')
        }
        if (res.status === 500) return
        if (res.status !== 200) {
          return navigate('/notfound')
        }
      }
    }
    getPage()
  }, [userId])
  return (
    <LayoutMainFeed title='Another Feed' getUserByUpdate={getUserByUpdate} user={user} setUser={setUser} imgUrl={imgUrl} setImgUrl={setImgUrl} >

    </LayoutMainFeed>
  )
}

export default MainAnother
