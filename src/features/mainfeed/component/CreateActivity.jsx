import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../../components/shared/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "../../../utils/validateCreateActivity"
import Modal from 'react-bootstrap/Modal';
import Dropzone from 'react-dropzone';

const CreateActivity = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit', resolver: yupResolver(schema)})

  const resetData = () => {
    setClassDrop('classDropDefult')
    setDuration(30)
    reset({ title: '', description: '', activity: 'hiit', duration: 30 })
    setShow(false)
    setShowLeave(false)
    setImgPreview('')
    setImgFile('')
    setImgMessage('')
  }

  const [showLeave, setShowLeave] = useState(false);
  const handleCloseLeave = () => {
    resetData()
  }

  const handleShowResume = () => {
    setShowLeave(false)
    setShow(true)
  }

  const [ show, setShow ] = useState(false);
  const handleClose = () => {
    const values = getValues()
    if (values.title || values.description || imgPreview) {
      setShowLeave(true)
      setShow(false)
      return
    }
    resetData()
  }

  const handleShow = () => setShow(true);

  const [ duration, setDuration ] = useState(30)
  const handleDuration = ({target}) => {
    console.log(typeof target.value)
    setDuration(target.value)
  }

  const handleSelectImgAgain = () => {
    setImgFile('')
    setImgPreview('')
    setImgMessage('')
    setClassDrop('classDropDefult')
  }

  const handleOnDragEnter = () => {
    setImgMessage('')
    setImgFile('')
    setImgPreview('')
  }

  const [ classDrop, setClassDrop ] = useState('classDropDefult')
  const customValidation = (file) => {
    console.log(file)
    const maxSize = 10485760
    const accept = ['image/jpeg', 'image/png']
    if (!accept.includes(file.type) && classDrop !== 'classDropReject') {
      setClassDrop('classDropReject')

    }
    if (accept.includes(file.type) && classDrop !== 'classDropActive') {
      setClassDrop('classDropActive')
    }

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

  const [ imgFile, setImgFile ] =  useState('')
  const [ imgMessage, setImgMessage ] = useState('')
  const onSubmit = (dataForm) =>{
    if (!imgFile) return setImgMessage('Please Select Your Image')
    const data = {
      ...dataForm,
      file: imgFile
    }
    console.log(data)
    resetData()
    setShow(false)
  }

  const [ imgPreview, setImgPreview ] = useState()
  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 1) setClassDrop('classDropReject')
    if (fileRejections.length) return
    const url = URL.createObjectURL(acceptedFiles[0])
    setImgPreview(<img src={url} alt='preview profile image' />)
    setImgFile(acceptedFiles[0])
    setClassDrop('classDropNone')

  }

  return (
    <div className="container-create-activity">
      <button onClick={handleShow}>
        Create Activity
      </button>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Create Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='container'>
            <section className='row container-image-input'>
              <Dropzone
                onDrop={onDrop}
                accept={{'image/*': ['.jpeg', '.png']}}
                maxSize={10485760}
                multiple={false}
                validator={customValidation}
                onFileDialogOpen={() => setImgMessage('')}
                onDragEnter={handleOnDragEnter}
              >
                {({getRootProps, getInputProps, isDragActive, fileRejections, acceptedFiles}) => {
                  const errorMessage = {
                    name: fileRejections[0]?.file.name,
                    size: (fileRejections[0]?.file.size/1048576).toFixed(1),
                    message: fileRejections[0]?.errors[1]?.message || fileRejections[0]?.errors[0]?.message
                  }
                  const acceptMessage = {
                    name: acceptedFiles[0]?.name,
                    size: (acceptedFiles[0]?.size/1048576).toFixed(1)
                  }

                  return (
                    <>
                      {/* {imgPreview ?
                        <div onClick={handleSelectImgAgain} className='image-preview'>
                          {imgPreview}
                          <span>Click to browse Again</span>
                        </div> :
                        <div {...getRootProps()} className={`${classDrop} dropzone`}>
                          <div onClick={handleSelectImgAgain} className='image-preview'>
                            {imgPreview}
                            <span>Click to browse Again</span>
                          </div>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop your files here...</p>
                          ) : (
                            <p>Drag and drop files here or click to browse</p>
                          )}
                        </div>
                      } */}
                        <div {...getRootProps()} className={`${classDrop} dropzone`}>
                          {imgPreview &&
                          <div onClick={handleSelectImgAgain} className='image-preview'>
                            {imgPreview}
                            <span>Click to browse Again</span>
                          </div>}
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop your files here...</p>
                          ) : (
                            <p>Drag and drop files here or click to browse</p>
                          )}
                        </div>
                      <span>{fileRejections.length !== 0 && `${errorMessage?.name} Size: ${errorMessage?.size} MB. -- ${errorMessage?.message}`}</span>
                      <span>{acceptedFiles.length !== 0 && `${acceptMessage?.name} Size ${acceptMessage?.size} MB.`}</span>
                      <span>{imgMessage}</span>
                    </>
                  )
                }}

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
            Create
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
