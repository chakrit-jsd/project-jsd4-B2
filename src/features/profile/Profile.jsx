import { useEffect, useState } from 'react';
import { postFollows, putProfileEdit } from '../../services/API/usersAPI';
import { Link } from 'react-router-dom';
import ModalEditProfile from './components/ModalEditProfile';
import FormEditProfile from './components/FormEditProfile';
import DropAndCrop from './components/DropAndCrop';
import '../../assets/styles/profile.css'

const Profile = ({ user, setUser, imgUrl, setImgUrl, getUserByUpdate, mobileShow }) => {
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
    isFollowing,
    profilename,
    aboutme,
    interest,
    weight,
    height,
    profileImgUrl,
    thisme
  } = user

  // console.log(follower)
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
        const data = {
          ...formData,
          file: imgFile
        }
        const res = await putProfileEdit(data)
        if (res.status === 201) {
          await getUserByUpdate()
          setSend(false)
          return setShow(false)
        }
      } catch (error) {
        setSend(false)
        console.log(error)
      }
    }
    sendData()

  }, [send])
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setImgFile(cropper.getCroppedCanvas({ maxWidth: 600, maxHeigth: 600}).toDataURL('image/jpeg'));
    }
  };

  const postFollow = async () => {
    try {
      const res = await postFollows({ userId: _id })
      getUserByUpdate()
      // console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  const [ classFollow, setClassFollow ] = useState('left')

  return (
    <aside className={`container-profile col-xl-2 col-lg-2 col-md-1 ${mobileShow !== 'profile' ? 'mobile-diplay-none' : null}`}>
      <section className='profile-head'>
        <div className='profile-img-btn'>
          <img src={imgUrl || 'https://via.placeholder.com/150'} alt="profiel-img" />
          { !thisme ?
          <>
            <i className="bi bi-pencil-square edit-profile-icon" onClick={handleShow}></i>
            <ModalEditProfile show={show} setShow={setShow} handleClose={handleClose} showLeave={showLeave} setShowLeave={setShowLeave} setImgFile={setImgFile} setImgPreview={setImgPreview} >
              <FormEditProfile user={user} setSend={setSend} setFormData={setFormData} handleClose={handleClose} imgFile={imgFile} imgPreview={imgPreview} getCropData={getCropData} setShow={setShow} >
                <DropAndCrop imgUrl={imgUrl} setImgUrl={setImgUrl} setImgFile={setImgFile} imgFile={imgFile} imgPreview={imgPreview} setImgPreview={setImgPreview} cropper={cropper} setCropper={setCropper} getCropData={getCropData} />
              </FormEditProfile>
            </ModalEditProfile>
          </> : null}
        </div>
        <div className='container-info'>
          <h4>{profilename || `${firstname}  ${lastname}`}</h4>
          {/* <hr/> */}
          { thisme ?
          (
            <div className='container-btn-follow'>
              {isFollowing ?
                <div className="following-show">
                  <button className="btn-dropdown-follow" type="button" data-bs-toggle="dropdown" aria-expanded="flase">
                    Following
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><button onClick={postFollow} className="dropdown-item">Unfollowing</button></li>
                  </ul>
                </div> : null}
              {!isFollowing ?
              (<button onClick={postFollow} className={!isFollowing ? 'button-follow': 'button-unfollow'} >
                Follow
              </button>) : null}
            </div>
          ): null}
          <div className='container-sub-info'>
            <p className='info-p'>About Me.</p>
            <p className='about-text'>{aboutme || 'This me ..........'}</p>
            {/* <p>{gender}</p> */}
            <div className='container-sub-info-sec'>
              <p className='info-p'>Interest :<span> {interest || 'KangFU'}</span></p>
              {/* <p>{weight}</p>
              <p>{height}</p> */}
              <p className='info-p'>City :<span>  {city}</span></p>
            </div>
          </div>
        </div>
      </section>
      <section className='container-follow'>
        <div className='container-btn-follow'>
          <button onClick={() => setClassFollow('left')} className={`list-follow follow-btn-left ${classFollow !== 'left' ? 'inactive' : ''}`}>following</button>
          <button onClick={() => setClassFollow('right')} className={`list-follow follow-btn-right ${classFollow !== 'right' ? 'inactive' : ''}`}>followers</button>
        </div>
        <div className={`following ${classFollow !== 'left' && 'follow-none'}`}>
          <ul>
            {following?.length !== 0 && following?.map((userFollowing) => (
              <li key={userFollowing.target._id}>
                <Link to={`/another/${userFollowing.target._id}`}>
                  <img src={userFollowing.target.smallImgUrl || 'https://via.placeholder.com/30'} alt="small-img" />
                  <span>{userFollowing.target.profilename || `${userFollowing.target.firstname} ${userFollowing.target.lastname}`}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`followers ${classFollow !== 'right' && 'follow-none'}`}>
          <ul>
          {follower?.length !== 0 && follower?.map((userFollower) => (
              <li key={userFollower.author._id}>
                <Link to={`/another/${userFollower.author._id}`}>
                  <img src={userFollower.author.smallImgUrl || 'https://via.placeholder.com/30'} alt="small-img" />
                  <span>{userFollower.author.profilename || `${userFollower.author.firstname} ${userFollower.author.lastname}`}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </aside>
  )
}

export default Profile
