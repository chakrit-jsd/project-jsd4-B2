import { SocketContext } from "../../../pages/PageMain"
import { useEffect, useState, useContext } from "react"
import Popover from '@mui/material/Popover';
import RenderHistory from "./components/RenderHistory";
import CusTooptipSimple from "./components/CusTooptipSimple";
import '../../../assets/styles/chatHistory.css'

const HistoryChat = ({ user }) => {
  const { noti } = useContext(SocketContext)
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ history, setHistory ] = useState([])
  const [ more, setMore ] = useState(true)
  const [ count, setCount ] = useState('')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const format = (res) => {
    if (!res.length || res.length < 20) {
      setMore(false)
    }
    const arr = []
    for (let i = 0; i < res.length; i += 2) {
      const obj = {}
      obj._id = res[i]
      obj.time = res[i + 1]
      arr.push(obj)
    }
    return arr
  }

  useEffect(() => {
    noti.on('chat_history', (res) => {
      const arr = format(res)
      noti.emit('current_history', { quantity: arr.length })
      setHistory(arr)
    })

    noti.on('update_history', (res) => {
      const arr = format(res)
      setHistory((prev) => {
        console.log('set2')
        noti.emit('current_history', { quantity: arr.length + prev.length })
        return [...prev, ...arr]
      })
    })

    noti.on('noti_unread_all', (res) => {
      console.log(res.count)
      const c = res.count <= 0 ? 0 : +res.count
      setCount(c);
    })
    return () => {
      noti.off('chat_history')
      noti.off('update_history')
      noti.off('noti_unread_all')
    }
  }, [])
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const rederCount = +count > 999 ? '999+' : count
  return (
    <div className="container-chat-history">
      {rederCount !== '0' ? <div className={`noti-count-all ${!(count > 0) ? ' visible': null}`}>{rederCount}</div> : null}
      <CusTooptipSimple content={'History'} positon={'bottom-end'}>
        <button className="container-i-history" aria-describedby={id} variant="contained" onClick={handleClick}>
          <i className="bi bi-chat-dots"></i>
        </button>
      </CusTooptipSimple>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <RenderHistory history={history} setHistory={setHistory} user={user} more={more} setMore={setMore} handleClose={handleClose}/>
      </Popover>
    </div>
  )
}

export default HistoryChat
