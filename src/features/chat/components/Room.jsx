import { useEffect, useState } from "react"
import InputText from "./InputText"
import RenderTexts from "./RenderTexts"
import { getUserById } from "../../../services/API/usersAPI"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { SocketContext } from "../../../pages/PageMain"
import CusTooptipSimple from "./CusTooptipSimple"

const Room = ({ deleteSelf, setRoomsHide, room, user }) => {
  const { chat } = useContext(SocketContext)
  const [ member, setMember ] = useState(null)
  const [ status, setStatus ] = useState('green')
  const [ visible, setVisible ] = useState(true)
  // console.log(member)
  const findMember = (room, userId) => {
    const mem = (room.members.filter((member) => member !== userId))[0]
    return mem
  }

  useEffect(() => {
    if (member) {
      setMember(null)
    }
    const mem = findMember(room, user._id);
    (async () => {
      try {
        const memberRes = await getUserById(mem)
        setMember(memberRes.data)
      } catch (error) {
        console.log(error)
      }
    })();
    // const visibleTime = setTimeout(() => {
      //   setVisible(false)
      // }, 400)
    const reJoinHandle = () => {
      chat.emit('re_join_room', { room: room._id })
    }
    chat.on('connect', reJoinHandle)

    return () => {
      chat.emit('leave_room', { room: room._id })
      chat.off('connect', reJoinHandle)
      // clearTimeout(visibleTime)
    }
  }, [])

  const onClickCloseChat = (event) => {
    event.preventDefault()
    deleteSelf(room)
  }

  const onClickHideChat = (event) => {
    event.preventDefault()
    const memId = findMember(room, user._id)
    setRoomsHide((prev) => {
      // for (const i of prev) {
      //   if (i === memId) {
      //     return prev
      //   }
      // }
      if (prev.length >= 5) {
        prev.shift()
      }
      return [...prev, { room: room._id, member: memId }]
    })
    deleteSelf(room)
  }

  return(
    <div className={`room-chat ${visible ? 'visible': null}`}>
        <div className="header-chat">
          <div className="header-chat-left">
            <Link to={`/another/${member?._id}`}>
              {/* <div className={`status ${status}`}></div> */}
              <img src={member?.smallImgUrl || 'https://via.placeholder.com/40'} alt="profile-small" />
              <span className="name">{member?.profilename}</span>
            </Link>
          </div>
          <div className="header-chat-right">
            <CusTooptipSimple content={'Hide Chat'} positon={'top-end'} >
              <button onClick={onClickHideChat}><i className="bi bi-dash-lg"></i></button>
            </CusTooptipSimple>
            <CusTooptipSimple content={'Close Chat'} positon={'top-start'} >
              <button onClick={onClickCloseChat}><i className="bi bi-x-lg"></i></button>
            </CusTooptipSimple>
          </div>
        </div>
        {member ? <RenderTexts room={room} member={member} user={user} setVisible={setVisible}/> : null}
        <InputText room={room} />
    </div>
  )
}

export default Room
