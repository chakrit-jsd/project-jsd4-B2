import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { SocketContext } from '../../../pages/PageMain';
import { useContext, useRef, useState } from 'react';

const CusTooltipHideRoom =({ children, member, user, room, unread }) => {
  const { chat } = useContext(SocketContext)
  const [ text, setText ] = useState('')
  const countRef = useRef(+unread.count || 1)
  const getLastText = async () => {
    if (countRef.current !== (+unread.count || 0)) {
      const res = await chat.emitWithAck('get_last_text', { room: room?.room, member: member._id })
      setText(res)
      countRef.current = unread.count || 0
    }
  }
  return (
    <>
      <Tooltip
        title={
          <>
            <p>{member?.profilename}</p>
            <p>{(text?.author === user._id ? 'You : ': '') + (text?.text || 'no message')}</p>
          </>
        }
        placement="left-start"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        onOpen={getLastText}
        className='container-tooltip-chat-time'
        >
        { children }
      </Tooltip>
    </>
  )
}

export default CusTooltipHideRoom
