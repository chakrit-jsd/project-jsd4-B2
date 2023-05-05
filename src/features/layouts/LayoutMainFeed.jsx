import Dashboard from "../dashboard/Dashboard"
import MainFeed from "../mainfeed/MainFeed"
import Profile from "../profile/Profile"
import { Footer } from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"

const LayoutMainFeed = ({ user, setUser, children, imgUrl ,setImgUrl }) => {
  // console.log(user)
  return (
    <div className="container-fulid">
      <nav className="container-navbar row">
        <Navbar />
      </nav>

      <main className="container-main row">
        <Profile user={user} setUser={setUser} imgUrl={imgUrl} setImgUrl={setImgUrl} />
        <MainFeed user={user} />
        <Dashboard />
      </main>

      {/* <footer className="row">
        <Footer />
      </footer> */}
    </div>
  )
}

export default LayoutMainFeed
