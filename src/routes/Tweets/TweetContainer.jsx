import { LoggedUser, Navbar } from "./../../components";
import TweetCard from "./TweetCard";
import "./TweetContainer.css";

const TweetContainer = (props) => {
  return (
    <>
      <LoggedUser />
      <div className="tweets-container">
        <Navbar />
        {props.tweets.map((tweet) => (
          <TweetCard tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default TweetContainer;
