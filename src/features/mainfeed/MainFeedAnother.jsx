import { useEffect, useState } from "react"
import { getFeedHome, getFeedAll, getAnotherFeed } from "../../services/API/usersAPI"
import CardFeed from "./components/CardFeed"
import CreateActivity from "./components/CreateActivity"
import SwitchFeed from "./components/SwitchFeed"
import { useParams } from "react-router-dom"


const MainFeedAnother = ({ user }) => {

  const { userId } = useParams()
  // const [ activeClass, setActiveClass ] = useState(true)
  const [ switcher, setSwitcher ] = useState('home')
  const [ posts, setPosts ] = useState([])
  const setPostsByCreateAndUpdate = async () => {
    if (switcher === 'home') {
      try {
        const res = await getAnotherFeed(userId)
        setPosts(res.data?.posts)
        // console.log(res.data.posts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const getFeeds = async () => {
      if(switcher === 'home') {
        try {
          const res = await getAnotherFeed(userId)
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
      {<CardFeed posts={posts} user={user} setPostsByCreateAndUpdate={setPostsByCreateAndUpdate} />}
    </article>
  )
}

export default MainFeedAnother
