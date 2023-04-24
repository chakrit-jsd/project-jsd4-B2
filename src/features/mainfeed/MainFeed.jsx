import { useEffect, useState } from "react"
import CardFeed from "./component/CardFeed"
import CreateActivity from "./component/CreateActivity"
import SwitchFeed from "./component/SwitchFeed"


const MainFeed = () => {

  const [activeClass, setActiveClass] = useState(true)
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
      <CreateActivity activeClass={activeClass} />
      <SwitchFeed />
      <CardFeed />
    </article>
  )
}

export default MainFeed
