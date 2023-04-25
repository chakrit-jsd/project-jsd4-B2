import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalEditProfile from './components/ModalEditProfile';
import '../../assets/styles/profile.css'
import FormEditProfile from './components/FormEditProfile';
import DropAndCrop from './components/DropAndCrop';

const Profile = () => {
  const [ show, setShow ] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false)
  }

  const [ imgFile, setImgFile ] =  useState('')
  const [ formData, setFormData ] = useState({})


  return (
    <aside className="container-profile col-xl-2 col-lg-2 col-md-1">
      <section className='profile-head'>
        <div className='profile-img-btn'>
          <img src="https://media.istockphoto.com/id/533048153/es/foto/yogi-chica-toca-asana-vrischikasana-postura-del-escorpi%C3%B3n.jpg?s=612x612&w=0&k=20&c=owbQV-Z_U9mqa0E5pPTQNaYAlVPUz3R_t5dgVGKhH3c=" alt="profiel-img" />
          <i className="bi bi-pencil-square edit-profile-icon" onClick={handleShow}></i>
          <ModalEditProfile show={show} handleClose={handleClose} >
            <FormEditProfile setFormData={setFormData} handleClose={handleClose}>
                <DropAndCrop setImgFile={setImgFile} imgFile={imgFile} />
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
