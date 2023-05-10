import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { getSearchUsers } from "../../services/API/usersAPI";
import "../../assets/styles/navbar.css";

const Navbar = () => {
  const [ textSearch, setTextSearch ] = useState('');

  const [ resultSearch, setResultSearch ] = useState('')
  useEffect(() => {
    if (textSearch) return
    setResultSearch('')
  }, [textSearch])

  const searchUsers = async (event) => {
    event.preventDefault();
    try {
      if (textSearch.length < 1) return
      const res = await getSearchUsers(textSearch);
      // console.log(res);
      if (res.data.message) {

        return setResultSearch(res.data.message)
      }
      setResultSearch(res.data.users)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary outter-nav">
        <div className="container">
          <NavLink className="navbar-brand" to="/me">
            <img
              src="https://placehold.co/600x400/orange/white"
              alt="NestFit"
              width={30}
              height={24}
            />
          </NavLink>

          <form className="d-flex" role="search">
            <div className="search-">
              <input
                className="search-nav"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={textSearch}
                onChange={({ target }) => setTextSearch(target.value)}
              />
              <div className={`collapse ${resultSearch && textSearch ? 'show' : '' }`} id="collapseExample">
                <div className="card card-body">
                  <ul>
                    {Array.isArray(resultSearch) ? resultSearch?.map((user) => (
                      <li key={user._id}>
                        <Link to={`/another/${user._id}`}>
                          <img src={user.smallImgUrl} alt="profile-small" />
                          <span>{user.profilename || user.firstname +' '+ user.lastname}</span>
                        </Link>
                      </li>
                    )) : <li>{resultSearch}</li>}
                  </ul>
                </div>
              </div>
            </div>
            <button className="image-search-button" onClick={searchUsers}>
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
