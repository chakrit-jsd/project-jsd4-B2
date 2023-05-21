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
      // console.log(res)
      if (res.status === 200) return navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <nav className="navbar bg-body-tertiary outter-nav">
        <div className="container-main-nav">
          <Link className="navbar-brand" to="/me">
            <img
              src="/static/img/Nest-fit-logo.png"
              alt="NestFit"
            />
          </Link>

          <form className="d-flex nav-form-input" role="search">
            <div className="search-">
              <input
                className="search-nav"
                type="search"
                placeholder="Find Friends"
                aria-label="Search"
                value={textSearch}
                onChange={({ target }) => setTextSearch(target.value)}
              />
              <div className={`collapse ${resultSearch && textSearch ? 'show' : '' }`} id="collapseExample">
                <div className="card card-body search-result">
                  <ul>
                    {Array.isArray(resultSearch) ? resultSearch?.map((user) => (
                      <li key={user._id}>
                        <Link to={`/another/${user._id}`}>
                          <img src={user.smallImgUrl || 'https://via.placeholder.com/40'} alt="profile-small" />
                          <span>{user.profilename || `${user.firstname}  ${user.lastname}`}</span>
                        </Link>
                      </li>
                    )) : <li>{resultSearch}</li>}
                    <li className="cancel-ul" onClick={() => setTextSearch('')}><i className="bi bi-x-circle-fill"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            <button className="image-search-button" onClick={searchUsers}>
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="dropdown container-dropdown nav-profile-menu">
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
