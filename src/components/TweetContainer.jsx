import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular, faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons'

const TweetContainer = (props) => {
  console.log('props', props);
  const { comments, message, usersFavorited, date, author: { name, username } } = props.tweet;

  return (
    <div className="tweet-card">
      <div className="tweet-card__meta">
        <p className="tweet-card__meta-author">{name} @{username}</p>
        <p className="tweet-card__meta-date">{date}</p>
      </div>

      <p className="tweet-card__message">
        {message}
      </p>

      <div className="icon-container">
        <div className="icon-container__contents">
          <FontAwesomeIcon icon={faHeart} />
          <p className="icon-container__number">{usersFavorited.length}</p>
        </div>

        <div className="icon-container__contents">
          <FontAwesomeIcon icon={faComment} />
          <p className="icon-container__number">{comments.length}</p>
        </div>
      </div>
    </div>
  )
}

export default TweetContainer;
