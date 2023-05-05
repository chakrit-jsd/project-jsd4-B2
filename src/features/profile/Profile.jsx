import { useEffect, useState } from 'react';
import ModalEditProfile from './components/ModalEditProfile';
import FormEditProfile from './components/FormEditProfile';
import { putProfileEdit } from '../../services/API/usersAPI';
import DropAndCrop from './components/DropAndCrop';
import '../../assets/styles/profile.css'

const Profile = ({ user, setUser, imgUrl, setImgUrl }) => {
  const {
    _id,
    email,
    firstname,
    lastname,
    gender,
    birthdate,
    city,
    follower,
    following,
    profilename,
    aboutme,
    interest,
    weight,
    height,
    profileImgUrl
  } = user
  // console.log(profileImgUrl)
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
  const [ send, setSend ] = useState(false)

  useEffect(() => {
    const sendData = async () => {
      try {
        if (!send) return
        if (Object.keys(formData).length === 0) return
        console.log(
          {
            ...formData,
            file: imgFile
          }
        )
        const data = {
          ...formData,
          file: imgFile
        }
        const res = await putProfileEdit(data)
        if (res.status === 201) {
          setUser(res.data.user)
          setImgUrl(res.data.user.profileImgUrl)
          setSend(false)
          return setShow(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    sendData()
  }, [send])
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setImgFile(cropper.getCroppedCanvas().toDataURL());
    }
  };
  return (
    <aside className="container-profile col-xl-2 col-lg-2 col-md-1">
      <section className='profile-head'>
        <div className='profile-img-btn'>
          <img src={imgUrl || 'https://via.placeholder.com/150'} alt="profiel-img" />
          <i className="bi bi-pencil-square edit-profile-icon" onClick={handleShow}></i>
          <ModalEditProfile show={show} setShow={setShow} handleClose={handleClose} showLeave={showLeave} setShowLeave={setShowLeave} setImgFile={setImgFile} setImgPreview={setImgPreview} >
            <FormEditProfile user={user} setSend={setSend} setFormData={setFormData} handleClose={handleClose} imgFile={imgFile} imgPreview={imgPreview} getCropData={getCropData} setShow={setShow} >
              <DropAndCrop imgUrl={imgUrl} setImgUrl={setImgUrl} setImgFile={setImgFile} imgFile={imgFile} imgPreview={imgPreview} setImgPreview={setImgPreview} cropper={cropper} setCropper={setCropper} getCropData={getCropData} />
            </FormEditProfile>
          </ModalEditProfile>
        </div>
        <div>
          <p>{profilename || `${firstname}  ${lastname}`}</p>
          <p>{aboutme || 'About Me'}</p>
          <p>{gender}</p>
          <p>{interest}</p>
          <p>{weight}</p>
          <p>{height}</p>
          <p></p>
          <p>{city}</p>
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
