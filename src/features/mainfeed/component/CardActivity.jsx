import { Link } from "react-router-dom"
import '../../../assets/styles/activityCard.css'

const CardActivity = ({ post }) => {

  const {
    id,
    authorID,
    authorName,
    authorImg,
    image,
    title,
    description,
    activity,
    duration,
    liked,
    createAt
  } = post

  const timePost = createAt
  const likedCount = liked.length

  return (
    <figure key={id} className="container-card-activity">
      <section className="container-head-card">
        <Link><img src={authorImg} alt="profile-sm" />{authorName}</Link>
        <p>{timePost}</p>
      </section>

      <section className="container-image-card">
        <div className="container-dropdown-menu">
          <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
            ...
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Edit</a></li>
            <li><a className="dropdown-item" href="#">Hide</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Delete</a></li>
          </ul>
        </div>

        <img src={image} alt="img-activity" />
        <div className="container-text-activity">
          <div className="liked">
            <span>Like {likedCount}</span>
          </div>
          <p className="activity">{activity}</p>
          <p className="duration">{duration} min.</p>
        </div>
      </section>

      <section className="container-text-card">
        <figcaption>
          {title}
        </figcaption>
        <p>
          {description}
        </p>
      </section>
    </figure>
  )
}

export default CardActivity
