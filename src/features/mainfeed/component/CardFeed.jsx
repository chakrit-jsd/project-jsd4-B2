import { posts } from "../../../assets/mockData/cardActivityMock";
import CardActivity from "./CardActivity";

const CardFeed = () => {
  return (
    <section>
      {posts.map((post) => !post.hidden && <CardActivity post={post} key={post.authorID} />)}
    </section>
  );
};

export default CardFeed;
