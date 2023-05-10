import { useEffect, useState } from "react"
import { getFeedHome, getFeedAll } from "../../services/API/usersAPI"
import CardFeed from "./components/CardFeed"
import CreateActivity from "./components/CreateActivity"
import SwitchFeed from "./components/SwitchFeed"


const MainFeed = ({ user }) => {

  const [ activeClass, setActiveClass ] = useState(true)
  const [ switcher, setSwitcher ] = useState('feed')
  const [ posts, setPosts ] = useState([])
  const [ nextGet, setNextGet ] = useState(true)

  const getHome =  async () => {
    try {
      const res = await getFeedHome()
      setPosts(res.data?.posts)
      // console.log('home')
    } catch (error) {
      console.log(error)
    }
  }

  const getAll = async () => {
    try {
      const res = await getFeedAll()
      setPosts(res.data?.posts)
      console.log(res.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  const calPages = () => {
    const postsPerPage = 3
    const cal = posts.length / postsPerPage
    return cal + 1
  }

  const nextPosts = async () => {
    if (location.pathname === '/me/home') {
      const page = calPages()
      console.log(page)
      try {
        const res = await getFeedHome(page)
        setNextGet(res.data?.next)
        setPosts((prevPosts) => {
          const newPosts = [
            ...prevPosts,
            ...res.data?.posts
          ]
          return newPosts
        })
      } catch (error) {
        console.log(error)
      }
    }
    if (location.pathname === '/me/feed' || location.pathname === '/me') {
      const page = calPages()
      console.log(page)
      try {
        const res = await getFeedAll(page)
        setNextGet(res.data?.next)
        setPosts((prevPosts) => {
          const newPosts = [
            ...prevPosts,
            ...res.data?.posts
          ]
          return newPosts
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  const setPostsByCreateAndUpdate = async () => {
    if (location.pathname === '/me/home') {
      await getHome()
    } else {
      await getAll()
    }
  }
  useEffect(() => {
    const getFeeds = async () => {
      if (location.pathname === '/me/home') {
        setNextGet(true)
        await getHome()
      }
      if (location.pathname === '/me/feed' || location.pathname === '/me') {
        setNextGet(true)
        await getAll()
      }
    }
    getFeeds()
    // console.log(posts)
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
      <CreateActivity user={user} activeClass={activeClass} setPostsByCreateAndUpdate={setPostsByCreateAndUpdate} />
      <SwitchFeed setSwitcher={setSwitcher} switcher={switcher} />
      {/* {switcher === 'feed' ? <CardFeed posts={posts} user={user} /> : null}
      {switcher === 'home' ? <CardFeed posts={posts} user={user} /> : null} */}
      {<CardFeed nextPosts={nextPosts} nextGet={nextGet} posts={posts} user={user} setPostsByCreateAndUpdate={setPostsByCreateAndUpdate} />}
    </article>
  )
}

export default MainFeed
