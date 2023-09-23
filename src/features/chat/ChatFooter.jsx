import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../../pages/PageMain"
import Room from "./components/Room"
import '../../assets/styles/chat.css'
import RoomHide from "./components/RoomHide"
import CusTooptipSimple from "./components/CusTooptipSimple"

const ChatFooter = ({ user }) => {
  const { chat } = useContext(SocketContext)
  const [ rooms, setRooms ] = useState([])
  const [ roomsHide, setRoomsHide ] = useState(JSON.parse(localStorage.getItem('hide_room')) || [])
  // console.log(rooms)
  const deleteSelf = (room) => {
    setRooms((prev) => {
      return prev.filter((item) => {
        return item._id !== room._id
      })
    })
  }
  localStorage.setItem('hide_room', JSON.stringify(roomsHide))
  const findMember = (room, userId) => {
    return (room.members.filter((member) => member !== userId))[0]
  }

  const deleteSelfRoomHide = (memId) => {
    setRoomsHide((prev) => prev.filter((v) => v.member !== memId))
  }
  useEffect(() => {
    chat.on('open_room', (res) => {
      const memId = findMember(res, user._id)
      setRooms((prev) => {
        for (const i of prev) {
          if (i._id === res._id) {
            return prev
          }
        }

        if (prev.length >= 3) {
          const first = prev.shift()
          chat.emit('leave_room', { room: first._id })
          setRoomsHide((prev) => {
            const prevNew = prev.filter((v) => v.member !== memId)
            if (prevNew.length >= 5) {
              prevNew.shift()
            }
            return [ ...prevNew, {room: first._id, member: findMember(first, user._id)} ]
          })
          return [ ...prev, res ]
        }
        setRoomsHide((prev) => prev.filter((v) => v.member !== memId))

        return [ ...prev, res ]
      })
    })
    return () => {
      chat.off('open_room')
    }
  }, [])

  return (
    <>
      <div className="container-room-chat">
        {rooms?.map((room) => <Room key={room._id} deleteSelf={deleteSelf} setRoomsHide={setRoomsHide} room={room} user={user} />)}
      </div>
      {chat.connected && roomsHide.length !== 0 ? <div className="container-room-hide">
        <CusTooptipSimple content={'Close All'} positon={'left-start'}>
          <i onClick={() => setRoomsHide([])} className="bi bi-x-circle-fill close-hide-chat-all"></i>
        </CusTooptipSimple>
        {roomsHide?.map((room) => <RoomHide key={room.room} room={room} user={user} deleteSelfRoomHide={deleteSelfRoomHide}/>)}
      </div> : null}
    </>
  )
}

export default ChatFooter

