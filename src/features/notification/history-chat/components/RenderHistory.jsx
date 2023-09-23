import BoxHistory from "./BoxHistory"
import InfiniteScroll from 'react-infinite-scroll-component'
import { SocketContext } from "../../../../pages/PageMain"
import { useEffect, useContext } from "react"
import { CircularProgress } from "@mui/material"
const RenderHistory = ({ history, setHistory, user, more, setMore, handleClose }) => {
  const { noti } = useContext(SocketContext)

  const nextLoad = async () => {
    // console.log(history[history.length -1])
    noti.emit('get_more_history', { lastTime: history[history.length -1].time})
  }
  useEffect(() => {
    return () => {
      noti.emit('current_history', { quantity: 10 })
      setMore(true)
      setHistory((prev) => {
        if (prev.length <= 10) return prev
        return prev.slice(0, 10)
      })
    }
  }, [])
  return (
    <div id="history-scroll" className="container-render-history">
      <h6>History</h6>
      <InfiniteScroll
        className="history-infinite"
        dataLength={history.length}
        hasMore={more}
        scrollableTarget='history-scroll'
        next={() => {
          setTimeout(() => {
            nextLoad()
          }, 2000)
        }}
        scrollThreshold={1}
        loader={
          <div style={{ width: '100%', display: "flex"}}>
            <CircularProgress
              className='circle-load-chat'
              color='inherit'
              size='1.4rem'
              sx={{
                m: 'auto',
              }}
            />
          </div>
        }
        endMessage={
          <div style={{ width: '100%', display: "flex", justifyContent: 'center'}}>
            <p className='end-history'>History no longer exists</p>
          </div>
        }
      >
        {history?.map((room) => <BoxHistory key={room._id} room={room} user={user} handleClose={handleClose} />)}

      </InfiniteScroll>
    </div>
  )
}

export default RenderHistory
