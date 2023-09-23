import Features from './Features';
import Discover from './Discover';
import Stories from './Stories';
import Content from './Content';

const Home = () => {
    return ( 
        <>
        {/* <Navbar /> */}
                    <Content />
                    <Features />
                    <Discover />
                    <Stories />
                    {/* <ProfileCard />
                    <CommentCard />
                    <WritePost />
                    <PostCard /> */}
        </>
     );
}
 
export default Home;