import { useContext, useEffect, useState } from "react"
import CusTooltipHideRoom from "./CusTooltipHideRoom"
import { getUserById } from "../../../services/API/usersAPI"
import { SocketContext } from "../../../pages/PageMain"
import CusTooptipSimple from "./CusTooptipSimple"

const RoomHide = ({ memId, user, deleteSelfRoomHide }) => {
  const { chat } = useContext(SocketContext)
  const [ member, setMember ] = useState(null)
  const [ visible, setVisible ] = useState(true)


  useEffect(() => {
    (async () => {
      try {
        const memberRes = await getUserById(memId)
        setMember(memberRes.data)
      } catch (error) {
        console.log(error)
      }
    })();

    const visibleTime = setTimeout(() => {
      setVisible(false)
    }, 300)

    return () => {
      clearTimeout(visibleTime)
    }
  }, [])

  const onClickOpenChat = async () => {
    const res = await chat.emitWithAck('join_room', { member: member._id })
    // console.log(res)
  }

  return (
    <div  className={'room-hide' + (visible ? ' visible': '')}>
      <CusTooltipHideRoom member={member} user={user} >
        <img onClick={onClickOpenChat} src={member?.profileImgUrl} alt="profile" />
      </CusTooltipHideRoom>
      <CusTooptipSimple content={'Close'} positon={'top-start'}>
        <i onClick={() => deleteSelfRoomHide(memId)} className="bi bi-x-circle-fill btn-close-hide-room"></i>
      </CusTooptipSimple>
    </div>
  )
}

export default RoomHide
