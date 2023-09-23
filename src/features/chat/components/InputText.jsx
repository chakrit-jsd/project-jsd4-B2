import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../../../pages/PageMain"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import CusTooptipSimple from "./CusTooptipSimple"

const InputText = ({ room }) => {
  const { chat } = useContext(SocketContext)
  const [ text, setText ] = useState('')
  const [ typing, setTyping ] = useState(false)
  const [ emo, setEmo ] = useState(false)

  const sendChatText = async (event) => {
    event.preventDefault()
    // console.log(event.currentTarget.querySelector('input')?)
    if (!text) return
    // console.log('click', chat?.active, chat?.connected, room)
    try {
      const res = await chat?.emitWithAck('create_text', { room: room._id, text: text, members: room.members })
      // console.log()
      setText('')
      setTyping(false)
      emitTyping(false)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(room)
  // let typingStatus: boolean = false;
  const emitTyping = (status) => {
    chat.emit('send_typing', { room: room._id, status: status })
  }
  // let timeTyping: NodeJS.Timeout;
  const onChangeInput = (event) => {
    event.preventDefault()
    if (event.target.value.length > 200) {
      return
    }
    setText(event.target.value)
    if (!typing && event.target.value) {
      // console.log('emit typing', true)
      setTyping(true)
      emitTyping(true)
    }
    if (typing && !event.target.value) {
      setTyping(false)
      emitTyping(false)
    }
  }

  const onEmojiSelect = (context) => {
    // console.log(context)
    if (text.length > 200) return
    if (!typing) {
      setTyping(true)
      emitTyping(true)
    }
    setText((prev) => prev + context.native)
  }

  useEffect(() => {
    let timeTyping;
    if (text) {
      timeTyping = setTimeout(() => {
        // console.log('emit typing', false)
          setTyping(false)
          emitTyping(false)
        }, 2000)
    }
    return () => {
      clearTimeout(timeTyping)
    }
  }, [text])
  const onClickOpenEmojis = () => {
    // console.log('open emoji', emo)
    setEmo((prev) => !prev)
  }
  return (
    <>
      {emo &&
      <div id={`emoji-${room._id}`} className="container-emoji">
        <Picker
          data={data}
          onEmojiSelect={onEmojiSelect}
          onClickOutside={(e) => {
            // console.log(e.target.id)
            if (e.target.id !== 'icon-open-emoji') {
              setEmo(false)
            }
          }}
          // icons='outline'
          previewPosition='none'
          theme='light'
        />
      </div>}
      <div className="input-chat">
        <form onSubmit={sendChatText}>
          <input type="text" placeholder='Aa' value={text} onChange={onChangeInput} />
          <CusTooptipSimple content={'Emoji'} positon={'top-end'}>
            <i onClick={onClickOpenEmojis} id='icon-open-emoji' className="bi bi-emoji-sunglasses-fill btn-open-emoji"></i>
          </CusTooptipSimple>
          <CusTooptipSimple content={'Send Message'}>
            <button type="submit"><i className="bi bi-send-fill"></i></button>
          </CusTooptipSimple>
        </form>
      </div>
    </>
  )
}

export default InputText
