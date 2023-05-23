import { useEffect, useState } from "react"
import { getAnotherFeed } from "../../services/API/usersAPI"
import CardFeed from "./components/CardFeed"
import CreateActivity from "./components/CreateActivity"
import SwitchFeed from "./components/SwitchFeed"


const MainFeedAnother = ({ user }) => {

  // const [ activeClass, setActiveClass ] = useState(true)
  const [ switcher, setSwitcher ] = useState('home')
  const [ posts, setPosts ] = useState([])
  const [ nextGet, setNextGet ] = useState(true)

  const calPages = () => {
    const postsPerPage = 3
    const cal = posts.length / postsPerPage
    return cal + 1
  }

  const nextPosts = async () => {
      const page = calPages()
      // console.log(page)
      try {
        if(!user) return
        const res = await getAnotherFeed(user._id, page)
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
  const setPostsByCreateAndUpdate = async () => {
    if (switcher === 'home') {
      try {
        if (!user._id) return
        const res = await getAnotherFeed(user._id)
        setPosts(res.data?.posts)
        // console.log(res.data.posts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const updateSinglePost = (newPost) => {
    setPosts((prevPosts) => prevPosts.map((post) => {
    return post._id === newPost._id ? newPost : post
    }))
  }

  useEffect(() => {
    const getFeeds = async () => {
      window.scrollTo(0, 0)
      if(switcher === 'home') {
        try {
          if (!user) return
          const res = await getAnotherFeed(user._id)
          setPosts(res.data?.posts)
          // console.log(res.data.posts)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getFeeds()

  }, [switcher, user])


  // window.onscroll = () => {
  //   const prev = window.pageYOffset
  //   const lg = (prev, curr) => {
  //     if (curr < 100) setActiveClass(true)
  //     if (curr > 80 && curr - prev < 0) {
  //       setActiveClass(true)
  //     }
  //     if (curr > 80 && curr - prev > 0) {
  //       setActiveClass(false)
  //     }
  //   }
  //   setTimeout(() => {
  //     const curr = window.pageYOffset
  //     lg(prev, curr)
  //   }, 50)
  // }

  return (
    <article className="container-main-feed">
      {/* <CreateActivity user={user} activeClass={activeClass} setPostsByCreateAndUpdate={setPostsByCreateAndUpdate} />
      <SwitchFeed setSwitcher={setSwitcher} switcher={switcher} /> */}
      {/* {switcher === 'feed' ? <CardFeed posts={posts} user={user} /> : null}
      {switcher === 'home' ? <CardFeed posts={posts} user={user} /> : null} */}
      {<CardFeed updateSinglePost={updateSinglePost} nextPosts={nextPosts} nextGet={nextGet} posts={posts} user={user} setPostsByCreateAndUpdate={setPostsByCreateAndUpdate} />}
    </article>
  )
}

export default MainFeedAnother
