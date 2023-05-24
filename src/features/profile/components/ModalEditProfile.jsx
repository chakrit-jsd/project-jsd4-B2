import Modal from 'react-bootstrap/Modal';

const ModalEditProfile = ({ show, setShow, handleClose, user, setImgUrl, showLeave, setShowLeave, setImgFile, setImgPreview, children }) => {

  const handleCloseLeave = () => {
    setImgFile('')
    setImgPreview('')
    // resetData()
    setShowLeave(false)
    setImgUrl(user?.profileImgUrl)
  }

  const handleShowResume = () => {
    setShowLeave(false)
    setShow(true)
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} backdrop='static' className='modal-edit-profile'>
        <Modal.Header closeButton className='modal-edit-profile-header'>
          <Modal.Title>Profile <span>Edit</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-edit-profile-body'>
          {children}
        </Modal.Body>
      </Modal>

      <Modal show={showLeave} onHide={handleCloseLeave} animation={false} backdrop='static' keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Leave This Section ?</Modal.Title>
        </Modal.Header>
      <Modal.Body>
        You have unsaved content, and will be lost unless you save it.
      </Modal.Body>
        <Modal.Footer>
          <button className='btn-resume' onClick={handleShowResume} >
            Resume
          </button>
          <button className='btn-leave' onClick={handleCloseLeave} >
            Leave
          </button>
        </Modal.Footer>
      </Modal>

    </>
  )
}


export default ModalEditProfile
