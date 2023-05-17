import InfiniteScroll from "react-infinite-scroll-component";
import CardActivity from "./CardActivity";
import NoneCardFeed from "./NoneCardFeed";

const CardFeed = ({ updateSinglePost, deletePost, nextPosts, nextGet, posts, user }) => {


  return (
    <section className="container-cards-feed">
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={nextPosts}
        hasMore={nextGet}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      >
        {posts?.length !== 0 ? posts?.map((post) => <CardActivity post={post} key={post._id} user={user} updateSinglePost={updateSinglePost} deletePost={deletePost} />) : <NoneCardFeed />}
      </InfiniteScroll>
    </section>
  );
};

export default CardFeed;
