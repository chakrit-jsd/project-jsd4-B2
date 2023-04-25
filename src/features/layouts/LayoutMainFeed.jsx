import Dashboard from "../dashboard/Dashboard"
import MainFeed from "../mainfeed/MainFeed"
import Profile from "../profile/Profile"
import { Footer } from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"

const LayoutMainFeed = ({ children }) => {
  return (
    <div className="container-fulid">
      <nav className="container-navbar row">
        <Navbar />
      </nav>

      <main className="container-main row">
        <Profile />
        <MainFeed />
        <Dashboard />
      </main>

      {/* <footer className="row">
        <Footer />
      </footer> */}
    </div>
  )
}

export default LayoutMainFeed
