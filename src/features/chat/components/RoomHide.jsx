import { useContext, useEffect, useState } from "react"
import CusTooltipHideRoom from "./CusTooltipHideRoom"
import { getUserById } from "../../../services/API/usersAPI"
import { SocketContext } from "../../../pages/PageMain"
import CusTooptipSimple from "./CusTooptipSimple"
import { Paper, Zoom } from '@mui/material';

const RoomHide = ({ room, user, deleteSelfRoomHide }) => {
  const { chat, noti } = useContext(SocketContext)
  const [ member, setMember ] = useState(null)
  const [ visible, setVisible ] = useState(true)
  const [ unread, setUnread ] = useState('')
  const notiUnreadHandle = (res) => {
    if (res.room !== room.room) return
    setUnread(res)
  }
  useEffect(() => {
    (async () => {
      try {
        const memberRes = await getUserById(room.member)
        setMember(memberRes.data)
      } catch (error) {
        console.log(error)
      }
    })();
    noti.emit('get_unread', { room: room.room })
    const visibleTime = setTimeout(() => {
      setVisible(false)
    }, 300)
    noti.on('noti_unread', notiUnreadHandle)
    return () => {
      clearTimeout(visibleTime)
      noti.off('noti_unread', notiUnreadHandle)
    }
  }, [])

  const onClickOpenChat = async () => {
    const res = await chat.emitWithAck('join_room', { member: member._id })
  }
  return (
    <Zoom id="hide-box" in={!visible} className={'room-hide'}>
      <Paper className='paper-hide-room' elevation={24} style={{ borderRadius: '50%' }}>
        {unread?.count ? <div className='unread-count-hide-room'>{unread?.count}</div> : null}
        <CusTooltipHideRoom member={member} user={user} room={room} unread={unread}>
          <img onClick={onClickOpenChat} src={member?.profileImgUrl} alt="profile" />
        </CusTooltipHideRoom>
        <CusTooptipSimple content={'Close'} positon={'top-start'}>
          <i onClick={() => deleteSelfRoomHide(room.member)} className="bi bi-x-circle-fill btn-close-hide-room"></i>
        </CusTooptipSimple>
      </Paper>
    </Zoom>
  )
}

export default RoomHide
