import { useState, useEffect, useContext, Fragment } from 'react'
import { SocketContext } from '../../../pages/PageMain'
import CusTooptip from './CusTooltip'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material'


const setTextsCallback = (prev, resArr) => {
  let firstIndex = {}
  if (prev.length) {
    firstIndex = prev[0]
  }

  const newArr = resArr?.map((v, i, a) => {
    const obj = { ...v }
    const currTime = new Date(v?.createdAt)
    let nextTime;
    if (i === a.length - 1) {
      nextTime = new Date(firstIndex?.createdAt)
    } else {
      nextTime = new Date(a[i + 1]?.createdAt)
    }
    const diffMin = nextTime.getTime() - currTime.getTime() >= 1000 * 60
    // console.log(i, nextTime.getDate(), currTime.getDate())
    const diffDay = nextTime.getDate() !== currTime.getDate()

    if (v.author === a[i + 1]?.author) {
      obj.hideTime = (diffMin || nextTime == 'Invalid Date') ? false : true
    } else {
      obj.hideTime = false
    }
    obj.showDay = (diffDay && nextTime != 'Invalid Date') ? true : false

    return obj
  })

  // console.log(newArr)

  return [...newArr, ...prev]
}

const RenderTexts = ({ room, member, user, setVisible }) => {
  const { chat } = useContext(SocketContext)
  const [ texts, setTexts ] = useState([])
  const [ more, setMore ] = useState(true)
  const [ typing, setTyping ] = useState(false)
  const [ typingText, setTypingText ] = useState('')
  const [ scrollDown, setScrollDown ] = useState(false)
  // console.log(member)
  const getTexts = async (room, lastTime = '') => {
    // console.log(lastTime || null)
    const res = await chat.emitWithAck('get_texts', { room: room._id, lastTime: lastTime || null })
    if (res.length < 20) {
      setMore(false)
    }
    setTexts((prev) => {
      return setTextsCallback(prev, res)
    })
  }
  useEffect(() => {
    // if (!room) return
    getTexts(room)
    const typingHandle = (res) => {
      // console.log(res.author, member?._id)
      if (room._id !== res.room) return
      if (res.author === member?._id) {
        setTyping(res.status)
      }
    }
    const receiveHandle = (res, cb) => {

      if (room._id !== res.room) return
      const obj = res
      obj.hideTime = false
      obj.showDay = false
      setTexts((prev) => {
        const lastIndex = prev.pop()
        if (!lastIndex) return [obj]
        if (lastIndex.author !== obj.author) {
          return [...prev, lastIndex, obj]
        }

        const prevTime = new Date(lastIndex?.createdAt)
        const currTime = new Date(res?.createdAt)
        const diffMin = currTime.getTime() - prevTime.getTime() >= 1000 * 60
        const diffDay = currTime.getDate() !== currTime.getDate()

        lastIndex.hideTime = diffMin ? false : true
        lastIndex.showDay = diffDay ? true: false

        // const prevArr = prev.slice(0, -1)
        return [...prev, lastIndex, obj]
      })

      cb(true)
    }
    setVisible(false)
    chat.on('text_receive', receiveHandle)
    chat.on('typing_receive', typingHandle)
    return () => {
      chat.off('text_receive', receiveHandle)
      chat.off('typing_receive', typingHandle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(() => {
    let intervalId;
    // const tpg = document.querySelector('.typing..')
    if (typing)  {
      // const text = 'typing'
      let count = 0
      intervalId = setInterval(() => {
        if (count > 4) {
          count = 0
        }
        if (!count) {
          count++
          return setTypingText('typing')
        }
        setTypingText((prev) => prev + '.')
        count++
      }, 200)
    } else {
      setTypingText('')
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [typing])

  const renderCb = (text) => {
    if (!text) return
    const time = new Date(text?.createdAt).toLocaleString('TH-th', { hour: '2-digit', minute: '2-digit' })
    const hide = (text?.author !== user._id && !text?.hideTime)

    return (
      <Fragment key={text._id}>
        {text.showDay ? <span className='show-day'>{new Date(text.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span> : null}
        <div className={'text-box' + ' ' + (text.author === user._id ? 'right': 'left')} >
          <div className='text'>
            {hide ? <img className='img-pro' src={member?.smallImgUrl || 'https://via.placeholder.com/40'} alt="profile-small" /> : null}
            <div className={'container-span' + ' ' + (hide ? 'have': 'not-have')}>
              <CusTooptip time={text.createdAt}>
                <span>{text.text}</span>
              </CusTooptip>
            </div>
          </div>
          {!text.hideTime ? <span className='time'>{time}</span> : null}
        </div>
      </Fragment>
    )
  }

  const nextLoad = () => {
    getTexts(room, texts[0].createdAt)
  }

  const onClickScrollDown = (event) => {
    const elementTarget = event.currentTarget.parentNode.querySelector('.render-text')
    elementTarget.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div id='render-chat-scroll' className='render-chat'>
      <InfiniteScroll
        className='render-text'
        // initialScrollY={100}
        dataLength={texts.length}
        next={() => {
          setTimeout(() => {
            nextLoad()
          }, 600)
        }}
        inverse={true}
        hasMore={more}
        height={340}
        // scrollThreshold={0}
        scrollableTarget='render-chat-scroll'
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        loader={
          <CircularProgress
            className='circle-load-chat'
            color='inherit'
            size='1.8rem'
            sx={{
              m: 'auto',
              my: 1
            }}
          />}
        endMessage={
          <div className='container-end-msg'>
            <img src={member?.profileImgUrl} alt="profile-img" />
            <p>{member?.profilename}</p>
            <Link to={`/another/${member?._id}`}>
              Profile
            </Link>
          </div>
        }

        onScroll={(e) => {
          if (e.target.scrollTop < -60) {
            setScrollDown(true)
          } else {
            setScrollDown(false)
          }
        }}

      >
        {texts.length !== 0 ? (texts?.map(renderCb)).reverse() : null}

      </InfiniteScroll>
      {!scrollDown || <i onClick={onClickScrollDown} className="bi bi-arrow-down-circle-fill btn-scroll-down"></i>}
      <span className='typing'>{typingText}</span>
    </div>
  )
}

export default RenderTexts
