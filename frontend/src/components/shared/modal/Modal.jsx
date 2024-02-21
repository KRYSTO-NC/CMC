import './modal.css'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'

const Modal = ({ modalBtn, children}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button onClick={() => setShowModal(true)} className="btn-reverse">{modalBtn}</button>
      {showModal &&
        createPortal( <ModalContent children={children} closeModal={() => setShowModal(false)} />,  document.body)}
    </>
  )
}

export default Modal
