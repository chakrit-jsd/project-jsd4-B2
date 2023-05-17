import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import '../../../assets/styles/dropzone.css'


const DropAndCrop = ({ imgUrl, setImgUrl, setImgFile, imgFile, imgPreview, setImgPreview, setCropper, getCropData }) => {
  const reset = () => {
    setImgFile('')
    setImgPreview('')
    setImgMessage('')
  }

  const handleSelectImgAgain = (event) => {
    event.preventDefault()
    reset()
    setImgUrl('')
    setClassDrop('classDropDefult')
  }

  const handleOnDragEnter = () => {
    reset()
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

  // const [ imgFile, setImgFile ] =  useState('')
  const [ imgMessage, setImgMessage ] = useState('')

  // const [ imgPreview, setImgPreview ] = useState(null)
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
  // const [cropper, setCropper] = useState(null);
  return (

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
              {!imgPreview && !imgUrl ?
                <div {...getRootProps()} className={`${classDrop} dropzone`}>

                  <input {...getInputProps()} />
                  {isDragActive ?
                    (<p>Drop your file here...<br />Accept file .jpg / .png</p>) :
                    (<p>Drag and drop file here or click to browse<br />Accept file .jpg / .png</p>)
                  }
                </div> : null}
              {imgFile || imgUrl ? <img className='image-croped' src={imgFile || imgUrl} /> : null }
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
              {imgPreview || imgFile || imgUrl ? <button className='position-btn-image-2' onClick={(e) => handleSelectImgAgain(e)}>Cancel</button> : null}
            </div>
            <span className='input-img-message-err'>{fileRejections.length !== 0 && `${errorMessage?.name} Size: ${errorMessage?.size} MB. -- ${errorMessage?.message}`}</span>
            <span className='input-img-message-succ'>{acceptedFiles.length !== 0 && `${acceptMessage?.name} Size ${acceptMessage?.size} MB.`}</span>
            <span className='input-img-message-err'>{imgMessage}</span>
          </>
        )
      }}
    </Dropzone>

  )
}


export default DropAndCrop
