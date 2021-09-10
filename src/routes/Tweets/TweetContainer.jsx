import "./TweetContainer.css";
import { LoggedUser, Navbar } from "./../../components";
import TweetCard from "./TweetCard";
import { useEffect, useState, useContext } from "react";
import AddTweetModal from "./AddTweetModal";
import { TweetsContext } from "../../context";
import { getAuthUser, getCurrentUser } from "./../../db/firebaseConfig";

const TweetContainer = (props) => {
  const [modal, setModal] = useState(false);
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const { visibility } = props;

  const toggle = () => setModal(!modal);

  const allTweets = useContext(TweetsContext);
  const authUser = getAuthUser();

  const fetchUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    let tweets = [];
    if (visibility === "all") {
      tweets = allTweets;
    }
    if (visibility === "currentUser") {
      tweets = allTweets.filter((tweet) => tweet.author.uid === authUser?.uid);
    }
    if (visibility === "currentUserFaves") {
      tweets = allTweets.filter((tweet) => {
        return (
          tweet.usersFavorited &&
          tweet.usersFavorited?.includes(currentUser?.username)
        );
      });
    }
    setFilteredTweets(tweets);
  }, [allTweets, authUser?.uid, currentUser?.username, visibility]);

  return (
    <>
      <aside className="aside-container">
        <LoggedUser />
        <button className="btn btn-primary" onClick={toggle}>
          Criar novo Tweet
        </button>
      </aside>
      <section className="tweets-container">
        <Navbar />
        {filteredTweets.map((tweet) => (
          <TweetCard key={tweet.time} tweet={tweet} />
        ))}
      </section>

      <AddTweetModal modal={modal} toggle={toggle} />
    </>
  );
};

export default TweetContainer;
