import '../modal/modal.css'

const ModalContent = ({closeModal,messageTitle, messageTxt}) => {
  return (
    <div   className='overlay'>
        <div onClick={e => e.stopPropagation()} className="modal">
            <h4> {messageTitle} </h4>
           <p>{messageTxt}</p>
            <button onClick={closeModal} className="btn-message">OK</button>
            {/* <button onClick={closeModal} className="btn-message">Retour a la boutique</button> */}
           
        </div>
    </div>
  )
}

export default ModalContent