import { NavLink, Link } from "react-router-dom";
import "../../assets/styles/navbar.css";
const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary outter-nav">
        <div className="container">
          <NavLink className="navbar-brand" to="#">
            <img
              src="https://placehold.co/600x400/orange/white"
              alt="NestFit"
              width={30}
              height={24}
            />
          </NavLink>

          <form className="d-flex" role="search">
            <input
              className="search-nav"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="image-search-button"
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-256.png"
                alt=""
                width={30}
              />
            </button>
          </form>

          <div className="dropdown container-dropdown">
            <button
              className="image-button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
                alt=""
                width={30}
              />
            </button>
            <ul className="dropdown-menu drop-list">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
