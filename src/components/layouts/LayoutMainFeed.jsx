import Dashboard from "../../features/dashboard/Dashboard"
import MainFeed from "../../features/mainfeed/MainFeed"
import Profile from "../../features/profile/Profile"
import { Footer } from "../shared/Footer"
import Navbar from "../shared/Navbar"

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
