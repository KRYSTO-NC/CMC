
import { useState } from 'react'
import { createPortal } from 'react-dom'
import MessageContent from './MessageContent'

const Message = ({ messageTitle , messageTxt}) => {
  const [showModal, setShowModal] = useState(true)

  return (
    <>
      {showModal &&
        createPortal( <MessageContent messageTitle={messageTitle} messageTxt={messageTxt} closeModal={() => setShowModal(false)} />,  document.body)}
    </>
  )
}

export default Message
