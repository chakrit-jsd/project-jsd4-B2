// import { posts } from "../../../assets/mockData/cardActivityMock";
import CardActivity from "./CardActivity";
import NoneCardFeed from "./NoneCardFeed";

const CardFeed = ({ posts, user }) => {
  return (
    <section className="container-cards-feed">
      {posts.length !== 0 ? posts.map((post) => !post?.hidden && <CardActivity post={post} key={post._id} user={user} />) : <NoneCardFeed />}
    </section>
  );
};

export default CardFeed;
