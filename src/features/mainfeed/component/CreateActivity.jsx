import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { Input, Select } from '../../../components/shared/Input';

const CreateActivity = () => {

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm()

  const resetData = () => reset({ title: '', description: '', activity: 'hiit' })

  const [showLeave, setShowLeave] = useState(false);

  const handleCloseLeave = () => {
    resetData()
    setShowLeave(false)
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    const values = getValues()
    if (values?.title || values.description) {
      setShowLeave(true)
    }
    setShow(false)
  }
  const handleShow = () => setShow(true);

  const handleShowResume = () => {
    setShowLeave(false)
    setShow(true)
  }

  const onSubmit = (data) =>{
    console.log(data)
    resetData()
    setShow(false)
  }


  return (
    <div className="container-create-activity">
      <button onClick={handleShow}>
        Launch demo modal
      </button>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Creat Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='container'>
            <div className='row'>
              <Input label='Title' register={register} field='title' errors={errors} type='text' className='col-12' />
              <Input label='Description' register={register} field='description' errors={errors} type='text' className='col-12' />
            </div>
            <Select label='Activity' register={register} field='activity' errors={errors} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={handleSubmit(onSubmit)}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLeave} onHide={handleCloseLeave} animation={false} backdrop='static' keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Leave This Section ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have unsaved content, and will be lost unless you save it.
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleShowResume}>
            Resume
          </button>
          <button onClick={handleCloseLeave}>
            Leave
          </button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default CreateActivity
