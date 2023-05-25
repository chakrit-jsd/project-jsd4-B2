import { Link } from 'react-router-dom'
import '../../../assets/styles/feedCard.css'


const NoneCardFeed = () => {
  return(
    <div className='mobile-display-none'>
    <figure className="container-card-activity">
        <section className="container-head-card">
          <div className="head-card-top">
            <Link><img src='https://via.placeholder.com/40' alt="profile-sm" /><span>Test John Doe</span></Link>
            <p>2 minute ago.</p>
          </div>

        </section>
        <section className="container-title-card">
          <figcaption>
              Example Title
          </figcaption>
          <div className="container-dropdown-menu">
            <button className="btn-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="flase">
              <i className="bi bi-gear-fill"></i>
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item">Edit</button></li>
              {/* <li><button className="dropdown-item" href="#">Hide</button></li> */}
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item">Delete</button></li>
            </ul>
          </div>
        </section>
        <section className="container-image-card">
          <img src='https://via.placeholder.com/600' alt="img-activity" />
          <div className="container-text-activity">
            <div className="liked">
              <span>999</span>
              <i className={`bi bi-heart-fill`}></i>
            </div>
            <p className="activity">yoga</p>
            <p className="duration">120 min.</p>
          </div>
        </section>

        <section className="container-text-card">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit perspiciatis dolor minima impedit atque, nesciunt explicabo. Dignissimos dolorem suscipit optio.
          </p>
        </section>
      </figure>
      <figure className="container-card-activity">
        <section className="container-head-card">
          <div className="head-card-top">
            <Link><img src='https://via.placeholder.com/40' alt="profile-sm" /><span>Test John Doe</span></Link>
            <p>2 minute ago.</p>
          </div>

        </section>
        <section className="container-title-card">
          <figcaption>
              Example Title
          </figcaption>
          <div className="container-dropdown-menu">
            <button className="btn-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="flase">
              <i className="bi bi-gear-fill"></i>
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item">Edit</button></li>
              {/* <li><button className="dropdown-item" href="#">Hide</button></li> */}
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item">Delete</button></li>
            </ul>
          </div>
        </section>
        <section className="container-image-card">
          <img src='https://via.placeholder.com/600' alt="img-activity" />
          <div className="container-text-activity">
            <div className="liked">
              <span>999</span>
              <i className={`bi bi-heart-fill`}></i>
            </div>
            <p className="activity">yoga</p>
            <p className="duration">120 min.</p>
          </div>
        </section>

        <section className="container-text-card">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit perspiciatis dolor minima impedit atque, nesciunt explicabo. Dignissimos dolorem suscipit optio.
          </p>
        </section>
      </figure>
      <figure className="container-card-activity">
        <section className="container-head-card">
          <div className="head-card-top">
            <Link><img src='https://via.placeholder.com/40' alt="profile-sm" /><span>Test John Doe</span></Link>
            <p>2 minute ago.</p>
          </div>

        </section>
        <section className="container-title-card">
          <figcaption>
              Example Title
          </figcaption>
          <div className="container-dropdown-menu">
            <button className="btn-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="flase">
              <i className="bi bi-gear-fill"></i>
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item">Edit</button></li>
              {/* <li><button className="dropdown-item" href="#">Hide</button></li> */}
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item">Delete</button></li>
            </ul>
          </div>
        </section>
        <section className="container-image-card">
          <img src='https://via.placeholder.com/600' alt="img-activity" />
          <div className="container-text-activity">
            <div className="liked">
              <span>999</span>
              <i className={`bi bi-heart-fill`}></i>
            </div>
            <p className="activity">yoga</p>
            <p className="duration">120 min.</p>
          </div>
        </section>

        <section className="container-text-card">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit perspiciatis dolor minima impedit atque, nesciunt explicabo. Dignissimos dolorem suscipit optio.
          </p>
        </section>
      </figure>
    </div>
  )
}

export default NoneCardFeed
