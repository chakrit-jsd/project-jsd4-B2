import Dashboard from "../dashboard/Dashboard"
import MainFeed from "../mainfeed/MainFeed"
import Profile from "../profile/Profile"
import { Footer } from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"
import MainFeedAnother from "../mainfeed/MainFeedAnother"
import HelmetTitle from "../../components/shared/Helmet"
import { useEffect, useState } from "react"

const LayoutMainFeed = ({ title, getUserByUpdate, user, setUser, children, imgUrl ,setImgUrl }) => {
  // console.log(user)
  const { pathname } = location
  const [ isReFresh, setIsReFres] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsReFres(false), 800)
  }, [isReFresh])

  return (
    <>
      <HelmetTitle title={title + ' | Nest-Fit by JSD#4 B2'} />
      <div className="container-fulid">
        <nav className={`container-navbar row ${isReFresh ? 'refresh-hide' : null}`}>
          <Navbar user={user} />
        </nav>
        {isReFresh ? <div className="refresh">
          <img src="/static/img/Nest-fit-logo.png" alt="logo" />
        </div>: null}
        <main className={`container-main row ${isReFresh ? 'refresh-hide' : null}`}>
          <Profile getUserByUpdate={getUserByUpdate} user={user} setUser={setUser} imgUrl={imgUrl} setImgUrl={setImgUrl} />
          {pathname === '/me' || pathname === '/me/feed' || pathname === '/me/home'
          ? <MainFeed user={user} />
          : <MainFeedAnother user={user} /> }
          <Dashboard />
        </main>

        {/* <footer className="row">
          <Footer />
        </footer> */}
      </div>
    </>
  )
}

export default LayoutMainFeed
