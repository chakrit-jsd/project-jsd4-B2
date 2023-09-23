import InfiniteScroll from "react-infinite-scroll-component";
import CardActivity from "./CardActivity";
import NoneCardFeed from "./NoneCardFeed";
import ProgressSwitcher from "./ProgressSwitcher";

const CardFeed = ({ mobileShow, updateSinglePost, deletePost, nextPosts, nextGet, posts, user, isProgress, switcher }) => {

  return (
    <>
    {mobileShow === 'feed' ? (<section className={`container-cards-feed ${mobileShow !== 'feed' ? 'mobile-display-none' : null}`}>
      {isProgress ? <ProgressSwitcher switcher={switcher} /> : null}
      <InfiniteScroll

        dataLength={posts.length} //This is important field to render the next data
        next={nextPosts}
        hasMore={nextGet}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className={isProgress ? 'onProgress' : null}
        scrollableTarget="main-scroll"
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

        {posts?.length !== 0 ? posts?.map((post) => <CardActivity post={post} key={post._id} user={user} updateSinglePost={updateSinglePost} deletePost={deletePost} />) : null}
      </InfiniteScroll>
    </section>) : null}
    </>
  );
};

export default CardFeed;
