import { LoggedUser, Navbar } from "./../../components";
import TweetCard from "./TweetCard";
import "./TweetContainer.css";
import { useState, useEffect } from "react";
import { watchAllTweets } from "./../../db/firebaseConfig";
import AddTweetModal from "./AddTweetModal";

const TweetContainer = (props) => {
  const [modal, setModal] = useState(false);
  const [tweets, setTweets] = useState([]);

  const storeTweets = (tweetsObj) => {
    const tweets = [];
    for (const prop in tweetsObj) {
      tweets.unshift(tweetsObj[prop]);
    }
    setTweets(tweets);
  };

  const fetchTweets = async () => {
    watchAllTweets(storeTweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const toggle = () => setModal(!modal);

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
        {tweets.length > 0 &&
          tweets.map((tweet) => <TweetCard tweet={tweet} />)}
      </section>

      <AddTweetModal modal={modal} toggle={toggle} />
    </>
  );
};

export default TweetContainer;
