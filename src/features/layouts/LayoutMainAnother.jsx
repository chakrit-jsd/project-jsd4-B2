import Dashboard from "../dashboard/Dashboard"
import MainFeed from "../mainfeed/MainFeed"
import Profile from "../profile/Profile"
import { Footer } from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"
import MainFeedAnother from "../mainfeed/MainFeedAnother"

const LayoutMainAnother = ({ user, setUser, children, imgUrl ,setImgUrl }) => {
  // console.log(user)
  return (
    <div className="container-fulid">
      <nav className="container-navbar row">
        <Navbar />
      </nav>

      <main className="container-main row">
        <Profile user={user} setUser={setUser} imgUrl={imgUrl} setImgUrl={setImgUrl} />
        <MainFeedAnother user={user} />
        <Dashboard />
      </main>

      {/* <footer className="row">
        <Footer />
      </footer> */}
    </div>
  )
}

export default LayoutMainAnother
