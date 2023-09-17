import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { SocketContext } from '../../../pages/PageMain';
import { useContext, useState } from 'react';

const CusTooltipHideRoom =({ children, member, user }) => {
  const { chat } = useContext(SocketContext)
  const [ text, setText ] = useState('')
  const getLastText = async () => {
    // console.log(text)
    const res = await chat.emitWithAck('get_last_text', { room: text?.room, member: member._id })
    setText(res)
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
