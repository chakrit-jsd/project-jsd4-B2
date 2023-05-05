// import { posts } from "../../../assets/mockData/cardActivityMock";
import CardActivity from "./CardActivity";

const CardFeed = ({ posts }) => {
  return (
    <section>
      {posts.map((post) => !post?.hidden && <CardActivity post={post} key={post._id} />)}
    </section>
  );
};

export default CardFeed;
