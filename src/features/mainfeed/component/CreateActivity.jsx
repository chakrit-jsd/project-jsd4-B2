import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { Input, Select } from '../../../components/shared/Input';
import Dropzone from 'react-dropzone';

const CreateActivity = () => {

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm()

  const resetData = () => reset({ title: '', description: '', activity: 'hiit', duration: 30 })

  const [showLeave, setShowLeave] = useState(false);

  const handleCloseLeave = () => {
    setClassDrop('')
    setDuration(30)
    resetData()
    setShowLeave(false)
  }

  const handleShowResume = () => {
    setShowLeave(false)
    setShow(true)
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    const values = getValues()
    if (values.title || values.description) {
      setShowLeave(true)
      setShow(false)
      return
    }
    setClassDrop('')
    setDuration(30)
    resetData()
    setShow(false)
  }
  const handleShow = () => setShow(true);

  const onSubmit = (data) =>{
    console.log(data)
    resetData()
    setShow(false)
  }

  const [duration, setDuration] = useState(30)

  const handleDuration = ({target}) => {
    setDuration(target.value)
  }

  const [ classDrop, setClassDrop ] = useState('')

  const customValidation = (file) => {
    const maxSize = 10485760
    const accept = ['image/jpeg', 'image/png']
    if (!accept.includes(file.type) && classDrop !== 'classDropReject') {
      setClassDrop('classDropReject')

    }
    if (accept.includes(file.type) && classDrop !== 'classDropActive') {
      setClassDrop('classDropActive')
    }

    console.log('validate', file)
    if (file.size > maxSize) {
      setClassDrop('classDropReject')
      return {
        code: 'size-too-large',
        message: 'File size Max 10 MB.'
      }
    }

    if (!accept.includes(file.type)) {
      return {
        code: 'file-type-not-match',
        message: 'File type accept .jpeg & .png'
      }
    }

  }

  const handleDrop = (acceptedFiles, rejectedFiles) => {
    // console.log(acceptedFiles)
    // console.log(rejectedFiles)
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
            <section className='row'>
              <Dropzone onDrop={handleDrop} accept={{'image/*': ['.jpeg', '.png']}} maxSize={10485760} multiple={false} validator={customValidation}>
                {({getRootProps, getInputProps, isDragActive, fileRejections, acceptedFiles}) => {
                  const errorMessage = {
                    name: fileRejections[0]?.file.name,
                    size: (fileRejections[0]?.file.size/1048576).toFixed(1),
                    message: fileRejections[0]?.errors[1]?.message
                  }
                  const acceptMessage = {
                    name: acceptedFiles[0]?.name,
                    size: (acceptedFiles[0]?.size/1048576).toFixed(1)
                  }
                  console.log('accept', fileRejections)
                  return (
                    <>
                    <div {...getRootProps()} className={`${classDrop} dropzone`}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop your files here...</p>
                      ) : (
                        <p>Drag and drop files here or click to browse</p>
                      )}
                    </div>
                    <span>{fileRejections.length !== 0 && `${errorMessage?.name} Size: ${errorMessage?.size} MB. -- ${errorMessage?.message}`}</span>
                    <span>{acceptedFiles.length !== 0 && `${acceptMessage?.name} Size ${acceptMessage?.size} MB.`}</span>
                    </>
                  )
                }
                }
              </Dropzone>
            </section>
            <section className='row'>
              <Input label='Title' register={register} field='title' errors={errors} type='text' className='col-12' />
              <Input label='Description' register={register} field='description' errors={errors} type='text' className='col-12' />
            </section>
            <section className='row'>
              <Select label='Activity' register={register} field='activity' errors={errors} />
              <label>
                <p>Duration</p>
                <span>{duration} minute</span>
                <div>
                  <input type="range" {...register('duration')} min={10} max={180} step={10} onChange={handleDuration} value={duration}/>
                </div>
              </label>
            </section>
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
