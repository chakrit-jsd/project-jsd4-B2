import Modal from 'react-bootstrap/Modal';
import { deleteCard } from '../../services/API/cardsAPI';
import { httpErrorCode } from '../../utils/errorsHandle/httpStatuscode';
import { useState } from 'react';


const ModalQuestion = ({ showDel, setShowDel, cardId, deletePost }) => {
  const [ resMess, setResMess ] = useState('')
  const onSubmit = async () => {
    try {
      const res = await deleteCard(cardId)
      // console.log(res)
      setShowDel(false)
      deletePost(res.data?.post)
    } catch (error) {
      const res = httpErrorCode(error)
      setResMess(res.message)
    }
  }

  return(
    <Modal show={showDel} onHide={() => setShowDel(false)} animation={false} backdrop='static' keyboard={false} >
      <Modal.Header closeButton>
        <Modal.Title>Delete Your Activity ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Confirm It.
        <p>{resMess}</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onSubmit} className='btn-del-yes'>
          Yes
        </button>
        <button onClick={() => setShowDel(false)} className='btn-del-no'>
          No
        </button>
      </Modal.Footer>
    </Modal>
  )
}


export default ModalQuestion
