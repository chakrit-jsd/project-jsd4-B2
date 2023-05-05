import { useEffect, useState } from "react"
import { getFeedHome } from "../../services/API/usersAPI"
import CardFeed from "./components/CardFeed"
import CreateActivity from "./components/CreateActivity"
import SwitchFeed from "./components/SwitchFeed"


const MainFeed = ({ user }) => {

  const [ activeClass, setActiveClass ] = useState(true)
  const [ switcher, setSwitcher ] = useState('home')
  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    const getFeeds = async () => {
      if(switcher === 'home') {
        try {
          const res = await getFeedHome()
          console.log(res.data.posts)
          setPosts(res.data.posts)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getFeeds()
  }, [switcher])


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
    }, 50)
  }

  return (
    <article className="container-main-feed">
      <CreateActivity user={user} activeClass={activeClass} />
      <SwitchFeed setSwitcher={setSwitcher} switcher={switcher} />
      <CardFeed posts={posts} />
    </article>
  )
}

export default MainFeed
