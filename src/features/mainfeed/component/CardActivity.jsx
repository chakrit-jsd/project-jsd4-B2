import { Link } from "react-router-dom"
import '../../../assets/styles/feedCard.css'

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
    <figure key={authorID} className="container-card-activity">
      <section className="container-head-card">
        <div className="head-card-top">
          <Link><img src={authorImg} alt="profile-sm" /><span>{authorName}</span></Link>
          <p>{timePost}</p>
        </div>

      </section>
      <section className="container-title-card">
        <figcaption>
            {title}
        </figcaption>
        <div className="container-dropdown-menu">
          <button className="btn-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-gear-fill"></i>
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Edit</a></li>
            <li><a className="dropdown-item" href="#">Hide</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Delete</a></li>
          </ul>
        </div>
      </section>
      <section className="container-image-card">
        <img src={image} alt="img-activity" />
        <div className="container-text-activity">
          <div className="liked">
            <span>{likedCount}</span>
            <i class={`bi bi-heart`}></i>
          </div>
          <p className="activity">{activity}</p>
          <p className="duration">{duration} min.</p>
        </div>
      </section>

      <section className="container-text-card">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta laboriosam eius error nisi? Quibusdam illum eos libero nostrum necessitatibus voluptas sed. Sit architecto explicabo enim quo ipsa provident totam.
        </p>
      </section>
    </figure>
  )
}

export default CardActivity
