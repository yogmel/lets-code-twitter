import "./IconsBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faComment as faCommentRegular,
} from "@fortawesome/free-regular-svg-icons";

function IconsBar(props) {
  const { usersFavorited, comments } = props;

  const temFavoritos = usersFavorited.length > 0;
  const temComentarios = comments.length > 0;

  return (
    <div className="icon-container">
      <div className="icon-container__contents">
        <FontAwesomeIcon icon={temFavoritos ? faHeart : faHeartRegular} />
        {temFavoritos && (
          <p className="icon-container__number">{usersFavorited.length}</p>
        )}
      </div>

      <div className="icon-container__contents">
        <FontAwesomeIcon icon={temComentarios ? faComment : faCommentRegular} />
        {temComentarios && (
          <p className="icon-container__number">{comments.length}</p>
        )}
      </div>

      <div className="icon-container__contents">
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default IconsBar;
