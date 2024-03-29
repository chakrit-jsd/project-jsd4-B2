import { useEffect, useState } from "react"
import { getFeedHome, getFeedAll } from "../../services/API/usersAPI"
import CardFeed from "./components/CardFeed"
import CreateActivity from "./components/CreateActivity"
import SwitchFeed from "./components/SwitchFeed"


const MainFeed = ({ user, mobileShow, activeClass, setupdateChart }) => {

  const [ switcher, setSwitcher ] = useState('feed')
  const [ isProgress, setIsProgress ] = useState(true)
  const [ posts, setPosts ] = useState([])
  const [ nextGet, setNextGet ] = useState(true)

  const getHome =  async () => {
    setPosts([])
    try {
      const res = await getFeedHome()
      setPosts(res.data?.posts)
      setTimeout(() => {
        setIsProgress(false)
      }, 10)
      // console.log('home')
    } catch (error) {
      console.log(error)
    }
  }

  const getAll = async () => {
    setPosts([])
    try {
      const res = await getFeedAll()
      setPosts(res.data?.posts)
      setTimeout(() => {
        setIsProgress(false)
      }, 100)
      // consle.log(res.data.posts)
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
    if (switcher === 'home') {
      await getFeedInfinite(getFeedHome)
    }
    if (switcher=== 'feed') {
      await getFeedInfinite(getFeedAll)
    }
  }

  const updateNewPost = (newPost) => {
    setupdateChart((prev) => !prev)
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  const updateSinglePost = (newPost) => {
    setupdateChart((prev) => !prev)
    setPosts((prevPosts) => prevPosts.map((post) => {
    return post._id === newPost._id ? newPost : post
    }))
  }

  const deletePost = (delPost) => {
    setupdateChart((prev) => !prev)
    setPosts((prevPosts) => prevPosts.filter((post) => {
      return post._id !== delPost._id
    }))
  }

  useEffect(() => {
    setIsProgress(true)
    const getFeeds = async () => {
      window.scrollTo(0, 0)

      if (switcher === 'home') {
        setNextGet(true)
        await getHome()
      }
      if (switcher === 'feed') {
        setNextGet(true)
        await getAll()
      }
    }
    const getTime = setTimeout(() => {
      getFeeds()
    }, 800)
    return () => {
      clearTimeout(getTime)
    }
  }, [switcher, mobileShow])

  return (
    <>
      {mobileShow === 'feed' ?
      (<article className="container-main-feed ">
        <div className={`container-create-menu ${activeClass ? 'h-svh' : 'h-vh'}`}>
          <CreateActivity user={user} activeClass={activeClass} updateSinglePost={updateSinglePost} updateNewPost={updateNewPost} />
          <SwitchFeed activeClass={activeClass} setSwitcher={setSwitcher} switcher={switcher} />
        </div>
        <CardFeed mobileShow={mobileShow} nextPosts={nextPosts} nextGet={nextGet} posts={posts} user={user} isProgress={isProgress} switcher={switcher} updateSinglePost={updateSinglePost} deletePost={deletePost} />
      </article>) : null}

    </>
  )
}

export default MainFeed
