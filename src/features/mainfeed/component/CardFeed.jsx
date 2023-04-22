import { posts } from "../../../assets/mockData/cardActivityMock";
import CardActivity from "./CardActivity";

const CardFeed = () => {
  return (
    <section className="container-card-activity">
      {posts.map((post) => !post.hidden && <CardActivity post={post} key={post.id} />)}
    </section>
  );
};

export default CardFeed;
