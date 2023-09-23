import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState, useContext } from "react"
import { SocketContext } from '../../../../pages/PageMain';
import { getUserById } from '../../../../services/API/usersAPI';

const BoxHistory = ({ room, user, handleClose }) => {
  const { noti, chat } = useContext(SocketContext)
  const [ text, setText ] = useState('')
  const [ member, setMember ] = useState('')
  const [ unread, setUnread ] = useState('')

  const getLastText = async () => {
    try {
      const res = await chat.emitWithAck('get_last_text', { room: room._id, limit: 1 })
      setText(res)

    } catch (error) {
      console.log(error)
    }
  }
  const getUnread = () => {
    noti.emit('get_unread', { room: room._id })
  }
  const getInfo = async (mem) => {
    const res = await getUserById(mem)
    setMember(res.data)
  }
  const notiUnreadHandle = (res) => {
    if (res.room !== room._id) return
    setUnread(res)
    getLastText()
  }

  const onClickOpenChat = () => {
    chat.emit('join_room', { member: member._id })
    setUnread(0)
    handleClose()
  }
  useEffect(() => {
    if (!member) {
      chat.emit('get_member', { room: room._id }, (res) => {
        const [ mem ] = res?.members?.filter((m) => m != user._id)
        getInfo(mem)
      })
    }

    noti.on('noti_unread', notiUnreadHandle)

    if (!unread.room) {
      getUnread()
    }
    return () => {
      noti.off('noti_unread', notiUnreadHandle)
    }
  }, [member])

  return (
    <div className='container-box-history' onClick={onClickOpenChat}>
      <div className='container-box-img'>
        {text ? <img src={member?.smallImgUrl || 'https://via.placeholder.com/150'} /> : <Skeleton variant="circular" width={50} height={50} />}
      </div>
      <div className='container-text'>
        {text ? <p className='f-b '>{member?.profilename}</p> : <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />}
        {text ? <p className={unread.count ? 'f-b' : null}>{text.author === user._id ? 'you: ' + text.text : text.text}</p> :<Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />}
      </div>
      {unread?.count ? <div className='unread-count'>{unread?.count}</div> : null}
    </div>
  )
}

export default BoxHistory
