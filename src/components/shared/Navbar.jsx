import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getSearchUsers } from "../../services/API/usersAPI";
import { getLogout } from "../../services/API/authAPI";
import "../../assets/styles/navbar.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate()

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

  const logout = async () => {
    try {
      const res = await getLogout()
      console.log(res)
      if (res.status === 200) return navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
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
                          <span>{user.profilename || `${user.firstname}  ${user.lastname}`}</span>
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
                src={(user.thisme ? user.thisme?.smallImgUrl : user.smallImgUrl) || 'https://via.placeholder.com/40'}
                alt="profile-img-small"
                width={40}
              />
            </button>
            <ul className="dropdown-menu drop-list">
              <li>
                <Link to={'/me/home'} className="dropdown-item">
                  {user.thisme?.profilename || (user.profilename || `${user.firstname}  ${user.lastname}`)}
                </Link>
              </li>
              <li>
                <button onClick={logout} className="dropdown-item">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
