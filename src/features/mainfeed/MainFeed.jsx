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

  const getFeedInfinite = async (getFeedAxios) => {
    const page = calPages()
    console.log(page)
    try {
      const res = await getFeedAxios(page)
      setNextGet(res.data?.next)
      setPosts((prevPosts) => {
        const newPostId = []
        for (const post of res.data?.posts) newPostId.push(post._id)
        const prev = prevPosts.filter((post) => {
          return !newPostId.includes(post._id)
        })
        return [ ...prev, ...res.data?.posts]
      })

    } catch (error) {
      console.log(error)
    }
  }

  const nextPosts = async () => {
    setNextGet(true)
    if (location.pathname === '/me/home') {
      await getFeedInfinite(getFeedHome)
    }
    if (location.pathname === '/me/feed' || location.pathname === '/me') {
      await getFeedInfinite(getFeedAll)
    }
  }

  const updateNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  const updateSinglePost = (newPost) => {
    setPosts((prevPosts) => prevPosts.map((post) => {
    return post._id === newPost._id ? newPost : post
    }))
  }

  const deletePost = (delPost) => {
    setPosts((prevPosts) => prevPosts.filter((post) => {
      return post._id !== delPost._id
    }))
  }

  useEffect(() => {
    const getFeeds = async () => {
      window.scrollTo(0, 0)
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
      <CreateActivity user={user} activeClass={activeClass} updateSinglePost={updateSinglePost} updateNewPost={updateNewPost} />
      <SwitchFeed setSwitcher={setSwitcher} switcher={switcher} />
      {/* {switcher === 'feed' ? <CardFeed posts={posts} user={user} /> : null}
      {switcher === 'home' ? <CardFeed posts={posts} user={user} /> : null} */}
      {<CardFeed nextPosts={nextPosts} nextGet={nextGet} posts={posts} user={user} updateSinglePost={updateSinglePost} deletePost={deletePost} />}
    </article>
  )
}

export default MainFeed
