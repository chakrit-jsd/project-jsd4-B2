import { useEffect, useState } from "react"
import { getFeedHome, getFeedAll } from "../../services/API/usersAPI"
import CardFeed from "./components/CardFeed"
import CreateActivity from "./components/CreateActivity"
import SwitchFeed from "./components/SwitchFeed"


const MainFeed = ({ user }) => {

  const [ activeClass, setActiveClass ] = useState(true)
  const [ switcher, setSwitcher ] = useState('feed')
  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    const getFeeds = async () => {
      if(switcher === 'home') {
        try {
          const res = await getFeedHome()
          setPosts(res.data?.posts)
          // console.log(res.data.posts)
        } catch (error) {
          console.log(error)
        }
      }
      if(switcher === 'feed') {
        try {
          const res = await getFeedAll()
          setPosts(res.data?.posts)
          // console.log(res.data.posts)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getFeeds()
    console.log(posts)
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
      {switcher === 'feed' ? <CardFeed posts={posts} user={user} /> : null}
      {switcher === 'home' ? <CardFeed posts={posts} user={user} /> : null}
    </article>
  )
}

export default MainFeed
