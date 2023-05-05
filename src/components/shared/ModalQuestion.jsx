import Modal from 'react-bootstrap/Modal';
import { deleteCard } from '../../services/API/cardsAPI';
import { httpErrorCode } from '../../utils/errorsHandle/httpStatuscode';
import { useState } from 'react';


const ModalQuestion = ({ showDel, setShowDel, id }) => {
  const [ resMess, setResMess ] = useState('')
  const onSubmit = async () => {
    try {
      const res = await deleteCard(id)
      console.log(res)
      setShowDel(false)
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
        <button onClick={onSubmit} >
          Yes
        </button>
        <button onClick={() => setShowDel(false)} >
          No
        </button>
      </Modal.Footer>
    </Modal>
  )
}


export default ModalQuestion
