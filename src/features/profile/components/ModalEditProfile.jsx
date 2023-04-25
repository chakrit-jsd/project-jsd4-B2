import Modal from 'react-bootstrap/Modal';

const ModalEditProfile = ({ show, handleClose, children }) => {


  return (
    <Modal show={show} onHide={handleClose} animation={false} backdrop='static' className='modal-edit-profile'>
        <Modal.Header closeButton className='modal-edit-profile-header'>
          <Modal.Title>Profile Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-edit-profile-body'>
          {children}
        </Modal.Body>
    </Modal>
  )
}


export default ModalEditProfile
