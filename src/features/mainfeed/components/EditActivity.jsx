import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../../components/shared/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import { putEditCard } from '../../../services/API/cardsAPI';
import { httpErrorCode } from '../../../utils/errorsHandle/httpStatuscode';
import { setFormat } from '../../../utils/setFormatDate/setFormatDate';
import schema from "../../../utils/validators/validateCreateActivity"
import Modal from 'react-bootstrap/Modal';
import Dropzone from 'react-dropzone';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import '../../../assets/styles/createCard.css'

const EditActivity = ({ show, setShow, post, updateSinglePost }) => {

  const {
    _id,
    imgUrl,
    title,
    description,
    activity,
    duration,
    dateactivity,
  } = post

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      title,
      description,
      activity,
      dateactivity: setFormat(dateactivity.date)
    }

  })
  const [ imgUrlS, setImgUrlS ] = useState(imgUrl)
  const resetData = () => {
    setClassDrop('classDropDefult')
    // setDuration(30)
    reset({ title, description, activity, duration, dateactivity: setFormat(dateactivity.date) })
    setShow(false)
    setShowLeave(false)
    setImgPreview('')
    setImgFile('')
    setImgMessage('')
    setImgUrlS(imgUrl)
  }

  const [showLeave, setShowLeave] = useState(false);
  const handleCloseLeave = () => {
    setDuration(duration)
    resetData()
  }

  const handleShowResume = () => {
    setShowLeave(false)
    setShow(true)
  }

  // const [ show, setShow ] = useState(false);
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

  const [ durationS, setDuration ] = useState(duration)
  const handleDuration = ({target}) => {
    setDuration(target.value)
  }

  const handleSelectImgAgain = (event) => {
    event.preventDefault()
    setImgUrlS('')
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
  const [ resMessage, setResMessage ] = useState('')
  const onSubmit = async (dataForm) =>{
    // if (!imgFile && !imgPreview) {
    //   setImgMessage('Please Select Your Image')
    //   setClassDrop('classDropReject')
    //   return
    // }
    let imgBase64 = ''
    if (typeof cropper !== "undefined" && !imgFile && imgPreview) {
      imgBase64 = cropper.getCroppedCanvas({ maxWidth: 600, maxHeigth: 600}).toDataURL('image/jpeg')
    }
    const data = {
      cardId: _id,
      ...dataForm,
      file: imgFile || imgBase64
    }

    try {
      const res = await putEditCard(data)
      // console.log(res)
      updateSinglePost(res.data?.post)
      resetData()
      setShow(false)
    } catch (error) {
      const res = httpErrorCode(error)
      return setResMessage(res?.message)
    }

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
      setImgFile(cropper.getCroppedCanvas({ maxWidth: 600, maxHeigth: 600}).toDataURL('image/jpeg'));
    }
  };

  const [cropper, setCropper] = useState(null);
  return (
    <div className="container-create-activity">
      {/* <section className={`container-btn-create-activity ${activeClass ? null : 'active-class'}`}>
        <img src="https://images.freeimages.com/images/previews/cdc/venus-1221361.jpg" alt="profile-img-sm" />
        <button onClick={handleShow}>
          Create Activity .....
        </button>
      </section> */}

      <Modal show={show} onHide={handleCloseLeave} animation={true} className='sss' backdrop={imgPreview ? 'static' : true } >
        <Modal.Header closeButton>
          <Modal.Title>Create<span>Activity</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='container-form-create-card'>
            <p>{resMessage}</p>
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
                        {!imgPreview && !imgUrlS ?
                          <div {...getRootProps()} className={`${classDrop} dropzone`}>
                            <div onClick={handleSelectImgAgain} className='image-preview'>
                              {/* <span>Click to browse Again</span> */}
                            </div>
                            <input {...getInputProps()} />
                            {isDragActive ?
                              (<p>Drop your file here...<br />Accept file .jpg / .png</p>) :
                              (<p>Drag and drop file here or click to browse<br />Accept file .jpg / .png</p>)
                            }
                          </div> : null}
                        {imgFile || imgUrlS ? <img className='image-croped' src={imgFile || imgUrlS} /> : null }
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
                        {imgPreview || imgFile || imgUrlS ? <button className='position-btn-image-2' onClick={(e) => handleSelectImgAgain(e)}>Cancel</button> : null}
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
              <Input label='Date Activity' field='dateactivity' register={register} errors={errors} placeholder='date' type='date' />
            </section>
              <label className='container-range-out'>
                <div className='parent-rage-out'>
                  <p>Duration</p>
                  <div className='container-range'>
                    {/* CSS INPUT TYPE RAGE CUSTOM COLOR */}
                    <input type="range" {...register('duration')} min={10} max={180} step={10} onChange={handleDuration} value={durationS}
                      style={{background: `linear-gradient(to right, #FF7B54 0%, #FF7B54 ${durationS/1.8}%, white ${durationS/1.80}%, white 100%)`}}
                    />
                    {/* CSS INPUT TYPE RAGE CUSTOM COLOR */}
                    <p>{durationS} minute.</p>
                  </div>
                </div>
              </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseLeave} className='col-2 btn-card-close'>
            Close
          </button>
          <button onClick={handleSubmit(onSubmit)} className='col-4 btn-card-create'>
            Save Change
          </button>
        </Modal.Footer>
      </Modal>

      {/* <Modal show={showLeave} onHide={handleCloseLeave} animation={false} backdrop='static' keyboard={false} >
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
      </Modal> */}
    </div>
  )
}

export default EditActivity
