import { useEffect, useState } from 'react';
import { get, useForm } from 'react-hook-form';
import { Input, Select } from '../../../components/shared/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "../../../utils/validators/validateCreateActivity"
import Modal from 'react-bootstrap/Modal';
import Dropzone from 'react-dropzone';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import '../../../assets/styles/createCard.css'

const CreateActivity = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange', resolver: yupResolver(schema)})

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
    setDuration(target.value)
  }

  const handleSelectImgAgain = (event) => {
    event.preventDefault()
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
  const [ formData, setFormData] = useState({})
  const onSubmit = (dataForm) =>{
    if (!imgFile && !imgPreview) {
      setImgMessage('Please Select Your Image')
      setClassDrop('classDropReject')
      return
    }
    const data = {
      ...dataForm,
      file: imgFile
    }
    setFormData((prev) => (
      {
        ...prev,
        ...data
      }
    ))
    if (typeof cropper !== "undefined" && !imgFile) {
      const imgBase64 = async () => await cropper.getCroppedCanvas().toDataURL()
      imgBase64().then((data) => {
        setFormData((prev) => (
          {
            ...prev,
            file: data
          }
        ))
      })
    }
    resetData()
    setShow(false)
  }

  const [ imgPreview, setImgPreview ] = useState(null)
  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 1) setClassDrop('classDropReject')
    if (fileRejections.length) return
    if (acceptedFiles[0] === undefined) return
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result);
      // console.log(reader.result)
    };
    reader.readAsDataURL(acceptedFiles[0]);
    // const url = URL.createObjectURL(acceptedFiles[0])
    // setImgPreview(<img src={url} alt='preview profile image' />)
    // setImgFile(acceptedFiles[0])
    setClassDrop('classDropNone')
  }

  const getCropData = (event) => {
    event.preventDefault()
    if (typeof cropper !== "undefined") {
      setImgFile(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const [cropper, setCropper] = useState(null);

  return (
    <div className="container-create-activity">
      <button onClick={handleShow}>
        Create Activity
      </button>

      <Modal show={show} onHide={handleClose} animation={false} backdrop={imgPreview ? 'static' : true }>
        <Modal.Header closeButton>
          <Modal.Title>Create<span>Activity</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='container-form-create-card'>
            <section className='container-image-input'>
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
                      <div className='container-image-position-btn'>
                        {!imgPreview &&
                          <div {...getRootProps()} className={`${classDrop} dropzone`}>
                            <div onClick={handleSelectImgAgain} className='image-preview'>
                              {/* <span>Click to browse Again</span> */}
                            </div>
                            <input {...getInputProps()} />
                            {isDragActive ?
                              (<p>Drop your file here...<br />Accept file .jpg / .png</p>) :
                              (<p>Drag and drop file here or click to browse<br />Accept file .jpg / .png</p>)
                            }
                          </div>}
                        {imgFile && <img className='image-croped' src={imgFile} /> }
                        {imgPreview && !imgFile &&
                          <>
                            <Cropper
                              className="cropper"
                              zoomTo={0}
                              initialAspectRatio={1}
                              aspectRatio={1}
                              src={imgPreview}
                              viewMode={1}
                              minCropBoxHeight={10}
                              minCropBoxWidth={10}
                              background={false}
                              responsive={true}
                              autoCropArea={1}
                              checkOrientation={false}
                              // cropBoxResizable={false}
                              onInitialized={(instance) => {
                                setCropper(instance);
                              }}
                              guides={true}
                            />
                            {!imgFile && <button className='position-btn-image-1' onClick={getCropData}>Crop & Preview</button>}
                          </>
                        }
                        {imgPreview || imgFile ? <button className='position-btn-image-2' onClick={(e) => handleSelectImgAgain(e)}>Cancel</button> : null}
                      </div>
                      <span className='input-img-message-err'>{fileRejections.length !== 0 && `${errorMessage?.name} Size: ${errorMessage?.size} MB. -- ${errorMessage?.message}`}</span>
                      <span className='input-img-message-succ'>{acceptedFiles.length !== 0 && `${acceptMessage?.name} Size ${acceptMessage?.size} MB.`}</span>
                      <span className='input-img-message-err'>{imgMessage}</span>
                    </>
                  )
                }}

              </Dropzone>
            </section>
            <section className='container-create-card-text'>
              <Input label='Title' register={register} field='title' errors={errors} type='text' className='col-12' autocomplete='off' />
              <Input label='Description' register={register} field='description' errors={errors} type='text' className='col-12 des' autocomplete='off' />
            </section>
            <section className='container-select-activity'>
              <Select label='Activity' register={register} field='activity' errors={errors} />
              <label className='container-range-out'>
                <p>Duration</p>
                <div className='container-range'>
                  <input type="range" {...register('duration')} min={10} max={180} step={10} onChange={handleDuration} value={duration}/>
                  <p>{duration} minute.</p>
                </div>
              </label>
            </section>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className='col-2 btn-card-close'>
            Close
          </button>
          <button onClick={handleSubmit(onSubmit)} disabled={!imgPreview && true} className='col-4 btn-card-create'>
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
          <button onClick={handleShowResume} >
            Resume
          </button>
          <button onClick={handleCloseLeave} >
            Leave
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateActivity
