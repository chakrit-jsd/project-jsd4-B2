import CardFeed from "./component/CardFeed"
import CreateActivity from "./component/CreateActivity"
import SwitchFeed from "./component/SwitchFeed"

const MainFeed = () => {
  return (
    <article className="container-main-feed">
      <CreateActivity />
      <SwitchFeed />
      <CardFeed />
    </article>
  )
}

export default MainFeed
