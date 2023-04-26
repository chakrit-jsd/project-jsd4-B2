import { useEffect, useState } from 'react';
import ModalEditProfile from './components/ModalEditProfile';
import FormEditProfile from './components/FormEditProfile';
import DropAndCrop from './components/DropAndCrop';
import '../../assets/styles/profile.css'

const Profile = () => {
  const [ show, setShow ] = useState(false);
  const [ showLeave, setShowLeave ] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShowLeave(true)
    setShow(false)
  }
  const [ imgPreview, setImgPreview ] = useState('')
  const [ cropper, setCropper ] = useState(null);
  const [ imgFile, setImgFile ] =  useState('')
  const [ formData, setFormData ] = useState({})
  // console.log(imgFile)
  useEffect(() => {
    if (Object.keys(formData).length === 0) return
    if (!imgFile) return
    console.log('ss')
    console.log(
      {
        ...formData,
        file: imgFile
      }
    )

    // API POST
  }, [imgFile])
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setImgFile(cropper.getCroppedCanvas().toDataURL());
    }
  };
  // console.log(formData)
  return (
    <aside className="container-profile col-xl-2 col-lg-2 col-md-1">
      <section className='profile-head'>
        <div className='profile-img-btn'>
          <img src="https://media.istockphoto.com/id/533048153/es/foto/yogi-chica-toca-asana-vrischikasana-postura-del-escorpi%C3%B3n.jpg?s=612x612&w=0&k=20&c=owbQV-Z_U9mqa0E5pPTQNaYAlVPUz3R_t5dgVGKhH3c=" alt="profiel-img" />
          <i className="bi bi-pencil-square edit-profile-icon" onClick={handleShow}></i>
          <ModalEditProfile show={show} setShow={setShow} handleClose={handleClose} showLeave={showLeave} setShowLeave={setShowLeave} setImgFile={setImgFile} setImgPreview={setImgPreview} >
            <FormEditProfile setFormData={setFormData} handleClose={handleClose} imgFile={imgFile} imgPreview={imgPreview} getCropData={getCropData} setShow={setShow} >
              <DropAndCrop setImgFile={setImgFile} imgFile={imgFile} imgPreview={imgPreview} setImgPreview={setImgPreview} cropper={cropper} setCropper={setCropper} getCropData={getCropData} />
            </FormEditProfile>
          </ModalEditProfile>
        </div>
        <div>
          <p>John Doe</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis quisquam ab quod nobis minima perspiciatis, alias rem quidem totam cumque?</p>
          <p>Bangkok, Thailnad</p>
        </div>
      </section>
      <section>
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </section>
    </aside>
  )
}

export default Profile
