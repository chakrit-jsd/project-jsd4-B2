import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { postLikedCard } from "../../../services/API/cardsAPI"
import EditActivity from "./EditActivity"
import ModalQuestion from "../../../components/shared/ModalQuestion"
import '../../../assets/styles/feedCard.css'

const CardActivity = ({ post, user, updateSinglePost, deletePost }) => {

  const {
    _id,
    author,
    imgUrl,
    title,
    description,
    activity,
    duration,
    likedCount,
    isLiked,
    dateactivity,
    createAt
  } = post

  const navigate = useNavigate()

  const [ show, setShow ] = useState(false);
  const [ showDel, setShowDel ] = useState(false)

  const { years, days, hours, minutes } = createAt?.duration

  const postLiked = async () => {
    try {
      const res = await postLikedCard(_id)
      updateSinglePost(res.data.post)
    } catch (error) {
      console.log(error)
    }
  }

  const toPage = () => {
    if (location.pathname === `/another/${author._id}`) return
    if (author._id !== user._id) {
      navigate(`/another/${author._id}`)
      window.scrollTo(0, 0)
      return
    }
  }


  return (
    <>
      <figure key={_id} className="container-card-activity">
        <section className="container-head-card">
          <div className="head-card-top">
            <button onClick={toPage} ><img src={author.smallImgUrl || 'https://via.placeholder.com/40'} alt="profile-sm" /><span>{author.profilename}</span></button>
            <p>{ years && `${years} year` || days && `${days} day` || hours && `${hours} hour` || minutes && `${minutes.toFixed(0)} minute` } ago.</p>
          </div>

        </section>
        <section className="container-title-card">
          <figcaption>
              {title}
          </figcaption>
          { !user.thisme && author._id === user._id ?
          <div className="container-dropdown-menu">
            <button className="btn-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="flase">
              <i className="bi bi-gear-fill"></i>
            </button>
            <ul className="dropdown-menu">
              <li><button onClick={() => setShow(true)} className="dropdown-item">Edit</button></li>
              {/* <li><button className="dropdown-item" href="#">Hide</button></li> */}
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={() => setShowDel(true)}>Delete</button></li>
            </ul>
          </div> : null}
        </section>
        <section className="container-image-card">
          <img src={imgUrl} alt="img-activity" />
          <div className="container-text-activity">
            <div className="liked">
              <span>{likedCount}</span>
              <i onClick={postLiked} className={`bi bi-heart${isLiked ? '-fill' : ''}`}></i>
            </div>
            <p className="activity">{activity}</p>
            <p className="duration">{duration} min.</p>
            <p className="date">{dateactivity.dateFormat || null}</p>
          </div>
        </section>

        <section className="container-text-card">
          <p>
            {description}
          </p>
        </section>
      </figure>
      {<EditActivity show={show} setShow={setShow} post={post} updateSinglePost={updateSinglePost} />}
      {<ModalQuestion showDel={showDel} setShowDel={setShowDel} cardId={_id} deletePost={deletePost} />}
    </>
  )
}

export default CardActivity
