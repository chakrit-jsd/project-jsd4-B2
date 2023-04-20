import CardActivity from "./component/CardActivity"
import CreateActivity from "./component/CreateActivity"
import SwitchFeed from "./component/SwitchFeed"

const MainFeed = () => {
  return (
    <article className="container-main-feed col-6">
      <CreateActivity />
      <SwitchFeed />
      <CardActivity />
    </article>
  )
}

export default MainFeed
