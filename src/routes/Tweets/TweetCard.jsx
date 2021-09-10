import { IconsBar } from "./../../components";

function TweetCard(props) {
  const {
    comments = [],
    message,
    usersFavorited = [],
    date: { day, month, year },
    author: { username },
  } = props.tweet;

  return (
    <div className="tweet-card">
      <div className="tweet-card__meta">
        <p className="tweet-card__meta-author">@{username}</p>
        <p className="tweet-card__meta-date">{`${day}/${month}/${year}`}</p>
      </div>

      <p className="tweet-card__message">{message}</p>

      <IconsBar comments={comments} usersFavorited={usersFavorited} />
    </div>
  );
}

export default TweetCard;
