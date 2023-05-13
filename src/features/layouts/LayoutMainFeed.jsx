import Dashboard from "../dashboard/Dashboard"
import MainFeed from "../mainfeed/MainFeed"
import Profile from "../profile/Profile"
import { Footer } from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"
import MainFeedAnother from "../mainfeed/MainFeedAnother"
import DocumentTitle from 'react-document-title'

const LayoutMainFeed = ({ title, getUserByUpdate, user, setUser, children, imgUrl ,setImgUrl }) => {
  // console.log(user)
  const { pathname } = location
  return (
    <>
      <DocumentTitle title={title + ' | Nest-Fit by JSD#4 B2'} />
      <div className="container-fulid">
        <nav className="container-navbar row">
          <Navbar user={user} />
        </nav>

        <main className="container-main row">
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
