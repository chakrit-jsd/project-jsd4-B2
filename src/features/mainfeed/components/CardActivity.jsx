import { useState } from "react"
import { Link } from "react-router-dom"
import EditActivity from "./EditActivity"
import ModalQuestion from "../../../components/shared/ModalQuestion"
import '../../../assets/styles/feedCard.css'

const CardActivity = ({ post, user }) => {

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
    createAt
  } = post

  const [ show, setShow ] = useState(false);
  const [ showDel, setShowDel ] = useState(false)

  const { years, days, hours, minutes } = createAt?.duration

  return (
    <>
      <figure key={_id} className="container-card-activity">
        <section className="container-head-card">
          <div className="head-card-top">
            <Link><img src={author.smallImgUrl || 'https://via.placeholder.com/40'} alt="profile-sm" /><span>{author.profilename}</span></Link>
            <p>{ years && `${years} year` || days && `${days} day` || hours && `${hours} hour` || minutes && `${minutes.toFixed(0)} minute` } ago.</p>
          </div>

        </section>
        <section className="container-title-card">
          <figcaption>
              {title}
          </figcaption>
          { author._id === user._id &&
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
          </div> }
        </section>
        <section className="container-image-card">
          <img src={imgUrl} alt="img-activity" />
          <div className="container-text-activity">
            <div className="liked">
              <span>{likedCount}</span>
              <i className={`bi bi-heart${isLiked ? '-fill' : ''}`}></i>
            </div>
            <p className="activity">{activity}</p>
            <p className="duration">{duration} min.</p>
          </div>
        </section>

        <section className="container-text-card">
          <p>
            {description}
          </p>
        </section>
      </figure>
      {<EditActivity show={show} setShow={setShow} post={post} />}
      {<ModalQuestion showDel={showDel} setShowDel={setShowDel} id={_id} />}
    </>
  )
}

export default CardActivity
