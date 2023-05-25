import Dashboard from "../dashboard/Dashboard"
import MainFeed from "../mainfeed/MainFeed"
import Profile from "../profile/Profile"
import Footer from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"
import MainFeedAnother from "../mainfeed/MainFeedAnother"
import HelmetTitle from "../../components/shared/Helmet"
import { useEffect, useState } from "react"

const LayoutMainFeed = ({ title, getUserByUpdate, user, setUser, children, imgUrl ,setImgUrl }) => {
  // console.log(user)
  const { pathname } = location
  const [ isReFresh, setIsReFres ] = useState(true)
  const [ mobileShow, setMobileShow ] = useState('feed')
  const [ activeClass, setActiveClass ] = useState(true)

  useEffect(() => {
    if(user.thisme) {
      setIsReFres(true)
    }
  }, [pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setIsReFres(false), 800)
  }, [mobileShow, pathname])

  window.onscroll = () => {
    const prev = window.pageYOffset
    const lg = (prev, curr) => {
      if (curr < 100) setActiveClass(true)
      if (curr > 80 && curr - prev < 0) {
        setActiveClass(true)
      }
      if (curr > 80 && curr - prev > 0) {
        setActiveClass(false)
      }
    }
    setTimeout(() => {
      const curr = window.pageYOffset
      lg(prev, curr)
    }, 100)
  }

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
        {!isReFresh ? <Footer user={user} isReFresh={isReFresh} activeClass={activeClass} mobileShow={mobileShow} setMobileShow={setMobileShow} /> : null}

      </div>
    </>
  )
}

export default LayoutMainFeed
