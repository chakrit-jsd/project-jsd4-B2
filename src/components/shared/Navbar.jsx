import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand" to="#">
            <img
              src="/docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="NestFit"
              width={30}
              height={24}
            />
          </NavLink>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          <img
            src="/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt="NestFit"
            aria-expanded="false"
            width={30}
            height={24}
          >
            <NavLink className="navbar-brand" to="#">
              <li className="nav-item dropdown">
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
            </NavLink>
          </img>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
